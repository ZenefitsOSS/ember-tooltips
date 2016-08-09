import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | isVisible', {
  integration: true
});

test('It toggles with isVisible', function(assert) {

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-component isVisible=showTooltip}}`);

  assertShow(assert, this);

  run(() => {
    this.set('showTooltip', false);
  });

  assertHide(assert, this);

});
