import Ember from 'ember';
import { properties } from './object';
import * as jml from './utils/jsonml';

export function item(idx, value) {
  return jml.item(
    jml.name(idx),
    jml.separator(),
    jml.reference(value)
  );
}

export function * items(obj) {
  for (const [ idx, value ] of obj.toArray().entries()) {
    yield item(idx, value);
  }
}

export class ArrayFormatter {
  header(obj) {
    if (obj instanceof Ember.Object && Ember.Array.detect(obj)) {
      const length = Ember.cacheFor(obj, 'length');
      return jml.header(`${obj}(length = ${length || '?'})`);
    }
  }
  hasBody() {
    return true;
  }
  body(obj) {
    return jml.list(...items(obj), ...properties(obj));
  }
}
