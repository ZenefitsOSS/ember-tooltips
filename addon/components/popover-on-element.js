import Ember from 'ember';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tooltip-and-popover';

const { $, run } = Ember;

export default TooltipAndPopoverComponent.extend({

  hideDelay: '250',

  classNames: ['ember-popover'],
  isMouseInside: false,
  isMouseOutside: Ember.computed.not('isMouseInside'),
  didInsertElement() {
    this._super(...arguments);

    const event = this.get('event');
    const $target = $(this.get('target'));
    const $popover = $(this.get('_tether.element'));

    if (event === 'none') {
      return;
    }

    let hideAfterDelayIfMouseIsOutside = () => {
      run.later(() => {
        if (this.get('isMouseOutside')) {
          this.hide();
        }
      }, +this.get('hideDelay'));
    };

    // record isMouseInside events
    $target.on('mouseenter', () => {
      this.set('isMouseInside', true);
    });
    $popover.on('mouseenter', () => {
      this.set('isMouseInsidePopover', true);
      this.set('isMouseInside', true);
    });

    // record !isMouseInside events
    $target.on('mouseleave', () => {
      this.set('isMouseInside', false);
    });
    $popover.on('mouseleave', () => {
      this.set('isMouseInsidePopover', false);
      this.set('isMouseInside', false);
    });

    const _showOn = this.get('_showOn');
    const _hideOn = this.get('_hideOn');

    if (_showOn === 'mouseenter') {
      /* handle the popover hover */

      $target.on(_showOn, () => this.show());

      $target.on(_hideOn, () => hideAfterDelayIfMouseIsOutside());

      $popover.on(_hideOn, () => hideAfterDelayIfMouseIsOutside());

    } else if (_showOn === 'click') {
      /* handle the popover click */

      $target.on(_showOn, () => {
        // $target.on('click'... ) gets called when the $popover is clicked
        // we need isMouseInsidePopover to reject this event
        if (this.get('isMouseInsidePopover')) {
          return;
        }

        if (this.get('tooltipIsVisible')) {
          this.hide();
        } else {
          this.show();
        }
      });

      $target.on('focusout', () => {
        if (this.get('isMouseOutside')) {
          this.hide();
        }
      });

    }
  },

});
