import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | isShown', {
  integration: true
});

test('It toggles with isShown', function(assert) {

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-component isShown=showTooltip}}`);

  assertShow(assert, this);

  run(() => {
    this.set('showTooltip', false);
  });

  assertHide(assert, this);

});
