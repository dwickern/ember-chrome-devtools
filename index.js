/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-chrome-devtools',

  treeFor(name) {
    if (this.app.env === 'production') {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  },
};
