import Ember from 'ember';
import TooltipAndPopoverBaseComponent from 'ember-tooltips/components/tooltip-and-popover';

const { $, run } = Ember;

export default TooltipAndPopoverBaseComponent.extend({
  hideDelay: 250,

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
  },
});
