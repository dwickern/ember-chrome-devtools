import {ObjectFormatter} from './object';
import {ArrayFormatter} from './array';
import {LazyFormatter} from './lazy';

export default [
  new LazyFormatter,
  new ObjectFormatter,
  new ArrayFormatter
];
