import Ember from 'ember';
import { module, test } from 'qunit';
import { ObjectFormatter, property } from 'ember-chrome-devtools/formatters/object';
import { Lazy } from 'ember-chrome-devtools/formatters/lazy';
import * as jml from 'ember-chrome-devtools/formatters/utils/jsonml';

module('Unit | Formatters | object formatter');

function lazyReference(property) {
  const ref = property[property.length - 1];
  if (ref.length === 2 && ref[0] === 'object') {
    const lazy = ref[1].object;
    if (lazy instanceof Lazy) {
      return lazy;
    }
  }
}

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
  assert.ok(lazyReference(actual));
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

  // Ember.Object#isDestroyed is enumerable on some ember versions but not others
  // we don't really care either way but it will cause the deep equality check to fail
  const descriptor = Object.getOwnPropertyDescriptor(Ember.Object.prototype, 'isDestroyed');

  const actual = property(obj, 'isDestroyed');
  const expected = jml.item(
    jml.name('isDestroyed', descriptor.enumerable),
    jml.separator(),
    jml.reference(false)
  );

  assert.deepEqual(actual, expected);
});

test('AliasedProperty', function(assert) {
  const MyClass = Ember.Object.extend({
    foo: Ember.computed(() => 'bar'),
    bar: Ember.computed.readOnly('foo')
  });
  const obj = MyClass.create();

  const notCached = lazyReference(property(obj, 'bar'));
  assert.ok(notCached);

  obj.get('bar'); // now cached

  const cached = lazyReference(property(obj, 'bar'));
  assert.ok(cached);

  const expected = jml.reference('bar');
  assert.deepEqual(notCached.compute(), expected);
  assert.deepEqual(cached.compute(), expected);
});
