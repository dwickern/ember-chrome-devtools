/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-chrome-devtools',

  findHost() {
    // `ember-cli` >= 2.7.0 has _findHost
    if (typeof this._findHost === 'function') {
      return this._findHost();
    }

    // Otherwise we polyfill
    let app;
    let current = this;
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));
    return app;
  },

  treeFor(name) {
    let app = this.findHost();
    if (app.env === 'production') {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  },
};
