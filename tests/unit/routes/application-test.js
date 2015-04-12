import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:application', {
  needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();

  assert.ok(route);
});
