import Ember from 'ember';
import TooltipAndPopoverBaseComponent from 'ember-tooltips/components/tooltip-and-popover';

const { $, run } = Ember;

export default TooltipAndPopoverBaseComponent.extend({

  classNames: ['popover-on-element'],
  didInsertElement() {
    this._super(...arguments);

    // shared functionality
    this._assertTarget();
    this.sendAction('onTooltipRender', this);

    // popover functionality
    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $_tether = $(_tether.element);
    const delay = 250; // TODO(Andrew) add showDelay and a hideDelay params

    // BEGIN DIFFERENT

    // TODO(Andrew) make these target/tether.on events dynamic
    $target.on('click', () => {
      this.set('isMouseInTarget', true);
      this.show();
    });
    $target.on('mouseleave', () => {
      this.set('isMouseInTarget', false);
      run.later(() => {
        if (!this.get('isMouseInPopover') && !this.get('isMouseInTarget')) {
          this.hide();
        }
      }, delay);
    });

    $_tether.on('mouseenter', () => {
      this.set('isMouseInPopover', true);
    });

    $_tether.on('mouseleave', () => {
      this.set('isMouseInPopover', false);
      run.later(() => {
        if (!this.get('isMouseInPopover') && !this.get('isMouseInTarget')) {
          this.hide();
        }
      }, delay);
    });

    // more shared functionality
    this._assignAria($target);
    this._positionOffset($_tether);
  },
});
