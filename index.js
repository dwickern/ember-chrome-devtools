/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-chrome-devtools',

  included(parent) {
    this.isProductionBuild = parent.env === 'production';
  },

  treeFor(name) {
    if (this.isProductionBuild) {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  },
};
