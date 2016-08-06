import PopoverOnElementComponent from 'ember-tooltips/components/popover-on-element';
import { targetComputed } from 'ember-tooltips/components/tooltip-on-component';

export default PopoverOnElementComponent.extend({

  target: targetComputed,

});
