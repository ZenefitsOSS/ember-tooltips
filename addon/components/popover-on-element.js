import Ember from 'ember';
import TooltipAndPopoverBaseComponent from 'ember-tooltips/components/tooltip-and-popover';

const { $, run } = Ember;

export default TooltipAndPopoverBaseComponent.extend({
  hideDelay: 250,
  spacing: 0,

  classNames: ['ember-popover'],
  didInsertElement() {
    this._super(...arguments);

    /* Setup event handling to hide and show the popover */
    const event = this.get('event');
    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $popover = $(_tether.element);

    if (event !== 'none') {
      const _showOn = this.get('_showOn');
      const _hideOn = this.get('_hideOn');

      let hideIfOutsideElementsAfterDelay = (delay) => {
        run.later(() => {
          if (this.get('isMouseInPopover') || this.get('isMouseInTarget')) {
            return;
          }
          this.hide();
        }, delay);
      };


      if (_showOn === 'mouseenter') {
        // handle the popover hover
        $target.on(_showOn, () => {
          this.set('isMouseInTarget', true);
          this.show();
        });

        if (_hideOn !== 'none') {
          $target.on(_hideOn, () => {
            this.set('isMouseInTarget', false);
            hideIfOutsideElementsAfterDelay(this.get('hideDelay'));
          });
        }

        $popover.on('mouseenter', () => {
          this.set('isMouseInPopover', true);
        });

        $popover.on('mouseleave', () => {
          this.set('isMouseInPopover', false);
          hideIfOutsideElementsAfterDelay(this.get('hideDelay'));
        });
      } else if (_showOn === 'click') {
        // handle the popover click
        $target.on('click', () => {
          // this gets called when the $target and the $popover get clicked. weird right?
          if (this.get('isMouseInPopover')) {
            return;
          }

          this.set('isMouseInTarget', true);
          if (this.get('tooltipIsVisible')) {
            this.hide();
          } else {
            this.show();
          }
        });
        $target.on('mouseleave', () => {
          this.set('isMouseInTarget', false);
        });
        $target.on('mouseenter', () => {
          this.set('isMouseInTarget', true);
        });
        $target.on('focusout', () => {
          // if the click is outside of the $target and the $popover then hide
          if (!this.get('isMouseInTarget') && !this.get('isMouseInPopover')) {
            this.hide();
          }
        });

        $popover.on('mouseenter', () => {
          this.set('isMouseInPopover', true);
        });
        $popover.on('mouseleave', () => {
          this.set('isMouseInPopover', false);
        });
      } else {
        // TODO(Andrew) figure these out
        $target.on(_showOn, () => {
          this.show();
        });

        $target.on(_hideOn, () => {
          this.hide();
        });
      }
    }

    // TODO(Andrew) ask why this tweak was necessary (top and bottom reversed -)
    /* We then use the side the popover was *actually*
    rendered on to set the correct offset from
    the target element */

    const spacing = this.get('spacing');

    let offset;

    switch(this.get('_renderedSide')) {
      case 'top':
        offset = `${spacing}px 0`;
        break;
      case 'right':
        offset = `0 ${spacing}px`;
        break;
      case 'bottom':
        offset = `-${spacing}px 0`;
        break;
      case 'left':
        offset = `0 -${spacing}px`;
        break;
    }

    this.set('offset', offset);
  },
});
