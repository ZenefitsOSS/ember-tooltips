export function assertShow(assert, context) {

  const $tooltip = context.$().find('.ember-tooltip');
  assert.equal($tooltip.attr('aria-hidden'), 'false', 'Should show tooltip');
  assert.equal($tooltip.attr('is-tether-enabled'), 'true',
    'tether should be enabled if tooltip is visible');

}

export function assertHide(assert, context) {

  const $tooltip = context.$().find('.ember-tooltip');
  assert.equal($tooltip.attr('aria-hidden'), 'true', 'Should hide tooltip');
  assert.equal($tooltip.attr('is-tether-enabled'), 'false',
    'tether should NOT be enabled if tooltip is hidden');

}


export function assertPopoverShow(assert, context) {

  const $popover = context.$().find('.ember-popover');
  assert.equal($popover.attr('aria-hidden'), 'false',
    'Should show popover');
  assert.equal($popover.attr('is-tether-enabled'), 'true',
    'tether should be enabled if popover is visible');

}

export function assertPopoverHide(assert, context) {

  const $popover = context.$().find('.ember-popover');
  assert.equal($popover.attr('aria-hidden'), 'true',
    'Should hide popover');
  assert.equal($popover.attr('is-tether-enabled'), 'false',
    'tether should NOT be enabled if popover is hidden');

}
