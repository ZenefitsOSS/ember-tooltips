import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';
import { POPOVER_HIDE_DELAY } from '../../helpers/constants';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover toggles with hover', function(assert) {

  const done = assert.async();

  assert.expect(3);

  this.render(hbs`{{popover-on-element}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  run.later(() => {
    assertHide(assert, this);

    done();
  }, POPOVER_HIDE_DELAY + 50);

});

test('Popover is visible for the delay period', function(assert) {

  const done = assert.async();

  assert.expect(4);

  this.render(hbs`{{popover-on-element}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  run.later(() => {
    assertShow(assert, this);
  }, POPOVER_HIDE_DELAY - 50);

  run.later(() => {
    assertHide(assert, this);

    done();
  }, POPOVER_HIDE_DELAY + 50);

});

test('Popover is visible after hovering in tooltip within delay time limit', function(assert) {

  const done = assert.async();

  assert.expect(4);

  this.render(hbs`{{popover-on-element}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  run.later(() => {
    this.$().find('.tooltip-and-popover').trigger('mouseover');

    assertShow(assert, this);
  }, POPOVER_HIDE_DELAY - 50);

  run.later(() => {
    assertShow(assert, this);

    done();
  }, POPOVER_HIDE_DELAY + 50);

});

test('Popover hides after the given duration', function(assert) {

  const done = assert.async();

  assert.expect(4);

  this.render(hbs`{{popover-on-element}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  run.later(() => {
    assertShow(assert, this);
  }, POPOVER_HIDE_DELAY - 50);

  run.later(() => {
    assertHide(assert, this);

    done();
  }, POPOVER_HIDE_DELAY + 50);

});

test('Popover is interactive', function(assert) {

  const done = assert.async();

  assert.expect(2);

  this.render(hbs`
    {{#popover-on-element}}
      <a href id="link">click me</a>
    {{/popover-on-element}}
  `);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  run(() => {
    let $popoverLink = this.$().find('.tooltip-and-popover a');

    $popoverLink.trigger('click');
  });

  run.later(() => {
    assertShow(assert, this);

    done();
  }, POPOVER_HIDE_DELAY + 50);

});
