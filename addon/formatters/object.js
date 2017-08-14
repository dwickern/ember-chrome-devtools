import Ember from 'ember';
import * as jml from './utils/jsonml';

/** All properties from the object and its prototype chain, including non-enumerables */
function * getProperties(obj) {
  const seen = Object.create(null);

  do {
    for (const name of Object.getOwnPropertyNames(obj)) {
      if (!(name in seen)) {
        seen[name] = true;
        yield [ name, Object.getOwnPropertyDescriptor(obj, name) ];
      }
    }
  } while ((obj = Object.getPrototypeOf(obj)));
}

/** Used in tests */
function lookupDescriptor(obj, key) {
  do {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor) {
      return descriptor;
    }
  } while ((obj = Object.getPrototypeOf(obj)));
}

/**
 * Compute JsonML for an object property
 * @param obj the object
 * @param key the property name
 * @param descriptor the property descriptor
 * @returns {*} JsonML
 */
export function property(obj, key, descriptor = lookupDescriptor(obj, key)) {
  Ember.assert('missing descriptor', !!descriptor);

  const enumerable = descriptor.enumerable;

  if (typeof descriptor.get === 'function') {
    if (descriptor.get.name === 'GETTER_FUNCTION' ||
        descriptor.get.isInheritingGetter ||
        key === 'isDestroyed' ||
        key === 'isDestroying') {
      // Ember getter that's probably safe to evaluate
      const value = descriptor.get.call(obj);
      return jml.item(
        jml.name(key, enumerable),
        jml.separator(),
        jml.reference(value)
      );
    }

    // ES5 getter: forcing the property to compute might have a side effect
    return jml.item(
      jml.name(key, enumerable),
      jml.separator(),
      jml.lazy(() => jml.reference(Ember.get(obj, key)))
    );
  }

  const value = descriptor.value;
  if (typeof value === 'function') {
    // ignore
    return;
  }

  if (value instanceof Ember.ComputedProperty) {
    // For convenience, show cached ComputedProperty without needing to expand it
    // Don't check the cache for AliasedProperty https://github.com/emberjs/ember.js/issues/15545
    const cached = Ember.cacheFor(obj, key);
    if (cached !== undefined) {
      // use the cached value
      return jml.item(
        jml.name(key, enumerable),
        jml.separator(),
        jml.computedPropertyIcon(),
        jml.reference(cached)
      );
    }
  }

  if (value !== null && typeof value === 'object' && value.isDescriptor) {
    // ComputedProperty (not cached) or AliasedProperty
    // Create a lazy getter, because forcing the property to compute might have a side effect
    return jml.item(
      jml.name(key, enumerable),
      jml.separator(),
      jml.computedPropertyIcon(),
      jml.lazy(() => jml.reference(Ember.get(obj, key)))
    );
  }

  return jml.item(
    jml.name(key, enumerable),
    jml.separator(),
    jml.reference(value)
  );
}

export function * properties(obj) {
  for (const [ key, descriptor ] of getProperties(obj)) {
    const element = property(obj, key, descriptor);
    if (element) {
      yield element;
    }
  }
}

export class ObjectFormatter {
  header(obj) {
    if (obj instanceof Ember.Object && !Ember.Array.detect(obj)) {
      return jml.header(obj.toString());
    }
  }
  hasBody() {
    return true;
  }

  body(obj) {
    return jml.list(...properties(obj));
  }
}
