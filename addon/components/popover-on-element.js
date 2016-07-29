import Ember from 'ember';
import EmberTooltipComponent from 'ember-tooltips/components/ember-tooltip';

const { $, run } = Ember;

export default EmberTooltipComponent.extend({

  classNames: ['ember-tooltip', 'ember-popover'],
  didInsertElement() {
    this._super(...arguments);

    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $_tether = $(_tether.element);
    // NEW
    const delay = 250;

    // TODO(Andrew) make these target-on dynamic
    $target.on('click', () => {
      this.set('isMouseInTarget', true);
      this.show();
    });
    $target.on('mouseleave', () => {
      this.set('isMouseInTarget', false);
      Ember.run.later(() => {
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
  },
});
