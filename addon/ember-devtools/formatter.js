import Ember from 'ember';

function header(text) {
  const style = `
    color: #E14E34;
    margin-bottom: 4px;
  `;

  return ['div', { style }, emberIcon(), ` ${text}`];
}

function emberIcon() {
  const style = `
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAuVJREFUOBE9U0tIlFEU/u7/mvfoNJqmlYmLnuJGYdwMEppB0YtISqhdEBREj1WLNkG7qF1IUFJt2khGEGEtEnORUCSYmGDMNIWpMzrv/3k79454mPnv45zvO8/LMpeOchIwDoBt/sUeCrg4qzoUhYF7dOk5dMGhqBqdHbilEjQBZIwMiEQwyFXcaQpQLoDnfhAuB67GwRr2QQ3Xk50Hz3bhmRVonBil400SWsgrecimYXQfQaDvLpRgCLxSQmXqA6xvk1AiRKaoZAiKQADFTkRAYC4U+X8IDV1D9OR5CRZqIcGubmQfqzC/fAT3hykQD0oNTFpBJMAby/D3n0X9mWEJdtZWUJycgJtdBQtHYfQk4cxOwbNEPUSlXBfcoQOxwTQp1ALCyUHAFwAcG/lXo8gmB2AtzkuATM+iLSd7cqp5xTwYgd3KBrjrwDjYC31nmzS2UksoPb0N4+oQ9F3t8s5ZnAMaCE/kQjTByHwK/F0JWPMzMA50QQlTfiT2nzT8x68jdvkWtOZWmPOzKL8eAduRIKUpbVhqYA8PX7iJ2MUrcHNZyaw1tUglN6tE7qf0XJSmPyH/7CGc34vggQhE6kI0pgfgFYvSmxbfDhYIUnykoY4wXYf5cw6FsReojN0HC0XgSwzD/puBu5yidhtgmXNJ7lULULc1Qu/oRPDwMQR7+2SBvPU1rN67ASe1AG1/D4L9J+Bra0fuySNUPr8BizRTEUWYGkVRqqA88Rz2wlf49h6CGm+EEo0hfueB7JJaVw9m+ODl1+Hmc+SdUhNjTV8yoFbaNtSWTrjkdf3lCPV9hZqsQI3FoTU2SbCoSf79OE3jW0onJmtDMyt46ENt5aUNKL4oyu9G4WZ+ITR4Gmprm/TqpJdgfp9BZXocLNpBRawNEkufStD78ahm4hEIoT0VlrvUpuoqGZbAKFwOnSaVViO0BRbWGqchEu9BxFH7EZUt6qIDdbupmCLLWq6ebYFbVYHbkv9aQEzuWmoUDAAAAABJRU5ErkJggg==)
      no-repeat
      left center;
    padding-right: 16px;
    border-radius: 2px;
  `;

  return ['span', { style }, ''];
}

function computedPropertyIcon() {
  const style = `
    background-color: #E14E34;
    color: white;
    padding: 0 4px;
    margin-right: 6px;
    border-radius: 2px;
  `;
  return ['span', { style }, 'get'];
}

function list(...children) {
  const style = `
    margin: 0;
    z-index: 0;
    position: relative;
    padding-left: 12px;
    display: flex;
    flex-direction: column;
  `;
  return ['ol', { style }, ...children];
}

function item(...children) {
  const style = `
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    display: flex;
    align-items: flex-start;
    min-height: 16px;
  `;
  return ['li', { style }, ...children];
}

function name(name, enumerable) {
  let style = `
    color: rgb(136, 19, 145);
    flex-shrink: 0;
  `;

  if (!enumerable) {
    style += `
      opacity: 0.6;
    `;
  }
  return ['span', { style }, name];
}

function separator() {
  const style = `
    flex-shrink: 0;
    padding-right: 5px;
  `;
  return ['span', { style }, ': '];
}

function reference(object) {
  if (object === undefined) {
    // Special case for `undefined`, otherwise an error will occur:
    // > Custom Formatter Failed: Illegal format: obligatory attribute "object" isn't specified
    const style = `
      color: rgb(128, 128, 128);
    `;
    return ['span', { style }, 'undefined'];
  }

  if (object !== null && typeof object === 'object' && !(object instanceof Ember.Object)) {
    // fix alignment
    const style = `
      margin-top: -4px;
    `;

    return ['span', { style },
      ['object', { object }]
    ];
  }

  return ['object', { object }];
}

function lazy(compute) {
  return ['object', { object: new Lazy(compute) }];
}

/** Evaluate Ember computed properties and es5 getters when expanded */
class Lazy {
  constructor(compute) {
    this.compute = compute;
  }
}

class LazyFormatter {
  header(obj) {
    if (obj instanceof Lazy) {
      const style = `
        opacity: 0.8;
        font-style: italic;
      `;
      return ['span', { style }, '(...)']
    }
  }
  hasBody() {
    return true;
  }
  body(obj) {
    return obj.compute();
  }
}

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

/** Whether the value is an Ember ComputedProperty, AliasedProperty, etc. */
function isComputedProperty(value) {
  return value !== null && typeof value === 'object' && value.isDescriptor;
}

/**
 * Compute JsonML for an object property
 * @param obj the object
 * @param key the property name
 * @param descriptor the property descriptor
 * @returns {*} JsonML
 */
function property(obj, key, descriptor) {
  const enumerable = descriptor.enumerable;

  if (typeof descriptor.get === 'function') {
    if (descriptor.get.name === 'GETTER_FUNCTION' || descriptor.get.isInheritingGetter) {
      // Ember getter that's probably safe to evaluate
      const value = descriptor.get.call(obj);
      return item(
        name(key, enumerable),
        separator(),
        reference(value)
      );
    }

    // ES5 getter: forcing the property to compute might have a side effect
    return item(
      name(key, enumerable),
      separator(),
      lazy(() => reference(Ember.get(obj, key)))
    );
  }

  const value = descriptor.value;
  if (typeof value === 'function') {
    // ignore
    return;
  }

  if (isComputedProperty(descriptor.value)) {
    // Ember computed property
    const cached = Ember.cacheFor(obj, key);
    if (cached === undefined) {
      // Lazy getter: forcing the property to compute might have a side effect
      return item(
        name(key, enumerable),
        separator(),
        computedPropertyIcon(),
        lazy(() => reference(Ember.get(obj, key)))
      );
    } else {
      return item(
        name(key, enumerable),
        separator(),
        computedPropertyIcon(),
        reference(cached)
      );
    }
  }

  return item(
    name(key, enumerable),
    separator(),
    reference(value)
  );
}

export class ObjectFormatter {
  header(obj) {
    if (obj instanceof Ember.Object && !Ember.Array.detect(obj)) {
      return header(obj.toString());
    }
  }
  hasBody() {
    return true;
  }

  body(obj) {
    function * properties() {
      for (const [ key, descriptor ] of getProperties(obj)) {
        const element = property(obj, key, descriptor);
        if (element) {
          yield element;
        }
      }
    }

    return list(...properties());
  }
}

export class ArrayFormatter {
  header(obj) {
    if (obj instanceof Ember.Object && Ember.Array.detect(obj)) {
      const length = Ember.cacheFor(obj, 'length');
      return header(`${obj}(length = ${length || '?'})`);
    }
  }
  hasBody() {
    return true;
  }
  body(obj) {
    function * items() {
      for (const [ idx, value ] of obj.toArray().entries()) {
        yield item(
          name(idx),
          separator(),
          reference(value)
        );
      }
    }

    return list(...items());
  }
}

export const allFormatters = [
  new LazyFormatter,
  new ObjectFormatter,
  new ArrayFormatter
];
