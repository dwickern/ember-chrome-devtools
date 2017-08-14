import Ember from 'ember';
import DS from 'ember-data';
import QUnit, { module, test } from 'qunit';
import { property } from 'ember-chrome-devtools/formatters/object';
import { ArrayFormatter, item } from 'ember-chrome-devtools/formatters/array';

module('Unit | Formatters | array formatter');

const formatter = new ArrayFormatter();

test('used for Ember.ArrayProxy only', function(assert) {
  assert.ok(formatter.header(Ember.ArrayProxy.create()));
  assert.notOk(formatter.header(Ember.Object.create()));
  assert.notOk(formatter.header({}));
  assert.notOk(formatter.header([]));
});

test('display object properties of promise arrays', function(assert) {
  const array = DS.PromiseManyArray.create({
    content: [ 'first', 'second', 'third' ]
  });
  const formatted = formatter.body(array);

  let firstItem = item(0, 'first');
  assert.ok(formatted.find(prop => QUnit.equiv(prop, firstItem)));

  let isFulfilled = property(array, 'isFulfilled');
  assert.ok(formatted.find(prop => QUnit.equiv(prop, isFulfilled)));
});
