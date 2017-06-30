
/** Evaluate Ember computed properties and es5 getters when expanded */
export class Lazy {
  constructor(compute) {
    this.compute = compute;
  }
}

export class LazyFormatter {
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
