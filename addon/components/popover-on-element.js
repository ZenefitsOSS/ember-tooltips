import Ember from 'ember';
import TooltipAndPopoverBaseComponent from 'ember-tooltips/components/tooltip-and-popover';

const { $, run } = Ember;

export default TooltipAndPopoverBaseComponent.extend({
  hideDelay: 250,
  spacing: 0,

  classNames: ['popover-on-element'],
  didInsertElement() {
    this._super(...arguments);

    /* Setup event handling to hide and show the popover */
    const event = this.get('event');
    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $_tether = $(_tether.element);

    if (event !== 'none') {
      const _showOn = this.get('_showOn');
      const _hideOn = this.get('_hideOn');

      /* add the show and hide events individually */
      if (_showOn !== 'none') {
        $target.on(_showOn, () => {
          this.set('isMouseInTarget', true);
          this.show();
        });
      }

      if (_hideOn !== 'none') {
        $target.on(_hideOn, () => {
          this.set('isMouseInTarget', false);
          run.later(() => {
            if (this.get('isMouseInPopover') || this.get('isMouseInTarget')) {
              return;
            }
            this.hide();
          }, this.get('hideDelay'));
        });
      }

      $_tether.on('mouseenter', () => {
        this.set('isMouseInPopover', true);
      });

      $_tether.on('mouseleave', () => {
        this.set('isMouseInPopover', false);
        run.later(() => {
          if (this.get('isMouseInPopover') || this.get('isMouseInTarget')) {
            return;
          }
          this.hide();
        }, this.get('hideDelay'));
      });
    }

    /* We then use the side the popover was *actually*
    rendered on to set the correct offset from
    the target element */

    const spacing = this.get('spacing');

    let offset;

    // TODO(Andrew) write explanatory note of why this duplication is necessary
    switch(this.get('_renderedSide')) {
      case 'top':
        offset = `-${spacing}px 0`;
        break;
      case 'right':
        offset = `0 ${spacing}px`;
        break;
      case 'bottom':
        offset = `${spacing}px 0`;
        break;
      case 'left':
        offset = `0 -${spacing}px`;
        break;
    }

    this.set('offset', offset);
  },
});
