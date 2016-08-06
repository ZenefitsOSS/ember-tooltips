import Ember from 'ember';
import TooltipOnElementComponent from 'ember-tooltips/components/tooltip-on-element';

const { computed } = Ember;

export const targetComputedFunction = computed(function() {
  const parentView = this.get('parentView');

  if (!parentView) {
    console.warn('No parentView found');

    return null;
  } else {
    return `#${parentView.get('elementId')}`;
  }
});

export default TooltipOnElementComponent.extend({

  target: targetComputedFunction,

});
