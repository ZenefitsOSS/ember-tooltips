import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | actions', {
  integration: true
});

test('It animates with delay passed as a number', function(assert) {
  const actionsCalledHash = {
    'onTooltipDestroy': 0,
    'onTooltipHide': 0,
    'onTooltipRender': 0,
    'onTooltipShow': 0,
  };

  // assert.expect(10);

  /* Setup the actions and handlers... */

  Object.keys(actionsCalledHash).forEach((action) => {
    this.on(action, () => {
      assert.ok(true, `Should call ${action}`);

      /* Count the calls... */

      actionsCalledHash[action]++;
    });
  });

  /* Now, let's go through the component lifecycle */

  this.render(hbs`
    {{#unless destroyTooltip}}
      {{tooltip-on-component
        onTooltipDestroy='onTooltipDestroy'
        onTooltipHide='onTooltipHide'
        onTooltipRender='onTooltipRender'
        onTooltipShow='onTooltipShow'
      }}
    {{/unless}}
  `);

  /* Check render */

  assert.equal(actionsCalledHash.onTooltipRender, 1,
    'Should have called render');

  assert.equal(actionsCalledHash.onTooltipShow, 0,
    'Should not have called show');

  /* Check show */

  run(() => {
    this.$().trigger('mouseover');
  });

  assert.equal(actionsCalledHash.onTooltipShow, 1,
    'Should have called show');

  assert.equal(actionsCalledHash.onTooltipHide, 0,
    'Should not have called hide');

  run(() => {
    this.$().trigger('mouseleave');
  });

  assert.equal(actionsCalledHash.onTooltipHide, 1,
    'Should have called hide');

  /* Check destroy */

  this.set('destroyTooltip', true);

  assert.equal(actionsCalledHash.onTooltipDestroy, 1,
    'Should have called destroy');

});
