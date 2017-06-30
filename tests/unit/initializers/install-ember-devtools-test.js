import Ember from 'ember';
import { initialize } from 'dummy/initializers/install-ember-devtools';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Initializer | install ember devtools', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.application.deferReadiness();
    });
  },
  afterEach() {
    destroyApp(this.application);
  }
});

test('adds ember formatters', function(assert) {
  window.devtoolsFormatters = null;

  initialize(this.application);

  assert.ok(window.devtoolsFormatters instanceof Array && window.devtoolsFormatters.length > 0, 'add ember formatters');
});

test('keeps existing formatters', function(assert) {
  const formatter = {};
  window.devtoolsFormatters = [ formatter ];

  initialize(this.application);

  assert.ok(window.devtoolsFormatters instanceof Array && window.devtoolsFormatters.length > 0, 'add ember formatters');
  assert.ok(window.devtoolsFormatters.indexOf(formatter) !== -1, 'keep the existing formatter');
});
