import Ember from 'ember';
import {Lazy} from '../lazy';

export function header(text) {
  const style = `
    color: #E14E34;
    margin-bottom: 4px;
  `;

  return ['div', { style }, emberIcon(), ` ${text}`];
}

export function emberIcon() {
  const style = `
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAuVJREFUOBE9U0tIlFEU/u7/mvfoNJqmlYmLnuJGYdwMEppB0YtISqhdEBREj1WLNkG7qF1IUFJt2khGEGEtEnORUCSYmGDMNIWpMzrv/3k79454mPnv45zvO8/LMpeOchIwDoBt/sUeCrg4qzoUhYF7dOk5dMGhqBqdHbilEjQBZIwMiEQwyFXcaQpQLoDnfhAuB67GwRr2QQ3Xk50Hz3bhmRVonBil400SWsgrecimYXQfQaDvLpRgCLxSQmXqA6xvk1AiRKaoZAiKQADFTkRAYC4U+X8IDV1D9OR5CRZqIcGubmQfqzC/fAT3hykQD0oNTFpBJMAby/D3n0X9mWEJdtZWUJycgJtdBQtHYfQk4cxOwbNEPUSlXBfcoQOxwTQp1ALCyUHAFwAcG/lXo8gmB2AtzkuATM+iLSd7cqp5xTwYgd3KBrjrwDjYC31nmzS2UksoPb0N4+oQ9F3t8s5ZnAMaCE/kQjTByHwK/F0JWPMzMA50QQlTfiT2nzT8x68jdvkWtOZWmPOzKL8eAduRIKUpbVhqYA8PX7iJ2MUrcHNZyaw1tUglN6tE7qf0XJSmPyH/7CGc34vggQhE6kI0pgfgFYvSmxbfDhYIUnykoY4wXYf5cw6FsReojN0HC0XgSwzD/puBu5yidhtgmXNJ7lULULc1Qu/oRPDwMQR7+2SBvPU1rN67ASe1AG1/D4L9J+Bra0fuySNUPr8BizRTEUWYGkVRqqA88Rz2wlf49h6CGm+EEo0hfueB7JJaVw9m+ODl1+Hmc+SdUhNjTV8yoFbaNtSWTrjkdf3lCPV9hZqsQI3FoTU2SbCoSf79OE3jW0onJmtDMyt46ENt5aUNKL4oyu9G4WZ+ITR4Gmprm/TqpJdgfp9BZXocLNpBRawNEkufStD78ahm4hEIoT0VlrvUpuoqGZbAKFwOnSaVViO0BRbWGqchEu9BxFH7EZUt6qIDdbupmCLLWq6ebYFbVYHbkv9aQEzuWmoUDAAAAABJRU5ErkJggg==)
      no-repeat
      left center;
    padding-right: 16px;
    border-radius: 2px;
  `;

  return ['span', { style }, ''];
}

export function computedPropertyIcon() {
  const style = `
    background-color: #E14E34;
    color: white;
    padding: 0 4px;
    margin-right: 6px;
    border-radius: 2px;
  `;
  return ['span', { style }, 'get'];
}

export function list(...children) {
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

export function item(...children) {
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

export function name(name, enumerable = true) {
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

export function separator() {
  const style = `
    flex-shrink: 0;
    padding-right: 5px;
  `;
  return ['span', { style }, ': '];
}

export function reference(object) {
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

export function lazy(compute) {
  return ['object', { object: new Lazy(compute) }];
}
