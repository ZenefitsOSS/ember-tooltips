import Ember from 'ember';
import PopoverOnElementComponent from 'ember-tooltips/components/popover-on-element';

const { computed } = Ember;

export default PopoverOnElementComponent.extend({

	// TODO(Andrew) write note of a better way to do this
  target: computed(function() {
    const parentView = this.get('parentView');

    if (!parentView) {
      console.warn('No parentView found');

      return null;
    } else {
      return `#${parentView.get('elementId')}`;
    }
  }),

});
