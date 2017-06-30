import formatters from '../formatters';

export function initialize(/* application */) {
  const old = window.devtoolsFormatters || [];
  window.devtoolsFormatters = [ ...old, ...formatters ];
}

export default {
  name: 'install-devtools',
  initialize
};
