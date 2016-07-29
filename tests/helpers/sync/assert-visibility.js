export function assertShow(assert, context) {

  assert.equal(context.$().find('.tooltip-on-element').attr('aria-hidden'), 'false',
    'Should show tooltip');

}

export function assertHide(assert, context) {

  assert.equal(context.$().find('.tooltip-on-element').attr('aria-hidden'), 'true',
    'Should hide tooltip');

}
