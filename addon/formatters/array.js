import Ember from 'ember';
import * as jml from './utils/jsonml';

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
    function * items() {
      for (const [ idx, value ] of obj.toArray().entries()) {
        yield jml.item(
          jml.name(idx),
          jml.separator(),
          jml.reference(value)
        );
      }
    }

    return jml.list(...items());
  }
}
