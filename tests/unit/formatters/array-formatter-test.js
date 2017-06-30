import Ember from 'ember';
import { module, test } from 'qunit';
import { ArrayFormatter } from 'ember-chrome-devtools/formatters/array';

module('Unit | Formatters | array formatter');

const formatter = new ArrayFormatter();

test('used for Ember.ArrayProxy only', function(assert) {
  assert.ok(formatter.header(Ember.ArrayProxy.create()));
  assert.notOk(formatter.header(Ember.Object.create()));
  assert.notOk(formatter.header({}));
  assert.notOk(formatter.header([]));
});
