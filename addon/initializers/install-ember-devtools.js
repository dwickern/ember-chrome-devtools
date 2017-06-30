import { allFormatters } from '../ember-devtools/formatter';

export function initialize(/* application */) {
  const old = window.devtoolsFormatters || [];
  window.devtoolsFormatters = [ ...old, ...allFormatters ];
}

export default {
  name: 'install-ember-devtools',
  initialize
};
