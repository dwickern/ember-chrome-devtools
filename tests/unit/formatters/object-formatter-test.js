import Ember from 'ember';
import { module, test } from 'qunit';
import { ObjectFormatter, property } from 'ember-chrome-devtools/formatters/object';
import { Lazy } from 'ember-chrome-devtools/formatters/lazy';
import * as jml from 'ember-chrome-devtools/formatters/utils/jsonml';

module('Unit | Formatters | object formatter');

test('used for Ember.Object only', function(assert) {
  const formatter = new ObjectFormatter();

  assert.ok(formatter.header(Ember.Object.create()));
  assert.notOk(formatter.header({}));
  assert.notOk(formatter.header(Ember.ArrayProxy.create()));
});

test('regular property', function(assert) {
  const obj = Ember.Object.create({
    foo: 'bar'
  });

  const actual = property(obj, 'foo');
  const expected = jml.item(
    jml.name('foo'),
    jml.separator(),
    jml.reference('bar')
  );

  assert.deepEqual(actual, expected);
});

test('lazy evaluate computed property', function(assert) {
  let hadSideEffect = false;

  const MyClass = Ember.Object.extend({
    foo: Ember.computed(function() {
      hadSideEffect = true;
      return 'bar';
    })
  });
  const obj = MyClass.create();

  const actual = property(obj, 'foo');

  const ref = actual.pop();
  assert.ok(ref.length === 2);
  assert.equal(ref[0], 'object');
  assert.ok(ref[1].object instanceof Lazy);

  assert.notOk(hadSideEffect);

  obj.get('foo');
  assert.ok(hadSideEffect);
});

test('show computed property after .get', function(assert) {
  const MyClass = Ember.Object.extend({
    foo: Ember.computed(() => 'bar')
  });
  const obj = MyClass.create();
  obj.get('foo'); // force evaluation

  const actual = property(obj, 'foo');
  const expected = jml.item(
    jml.name('foo'),
    jml.separator(),
    jml.computedPropertyIcon(),
    jml.reference('bar')
  );

  assert.deepEqual(actual, expected);
});

test('show cached property after .set', function(assert) {
  const obj = Ember.Object.create();
  obj.set('foo', 'bar');

  const actual = property(obj, 'foo');
  const expected = jml.item(
    jml.name('foo'),
    jml.separator(),
    jml.reference('bar')
  );

  assert.deepEqual(actual, expected);
});

test('show isDestroyed', function(assert) {
  const obj = Ember.Object.create();

  const actual = property(obj, 'isDestroyed');
  const expected = jml.item(
    jml.name('isDestroyed', false),
    jml.separator(),
    jml.reference(false)
  );

  assert.deepEqual(actual, expected);
});
