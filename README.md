# ember-chrome-devtools

This addon formats Ember objects so that you can see their type and internal state at a glance. No more typing `.get()` into your console!

<img width="1027" alt="x" src="https://user-images.githubusercontent.com/752885/27756654-3d8bce82-5dae-11e7-842a-b1a1700772d8.png">


## Installation

1. Install the addon:

    ```
    ember install ember-chrome-devtools
    ```
    
    (it will not affect your production build)

2. Enable custom formatters in DevTools Settings:

<a href="https://user-images.githubusercontent.com/752885/27756509-07f57922-5dad-11e7-9361-ba2c15abba37.png" target="_blank">
 <img src="https://user-images.githubusercontent.com/752885/27756509-07f57922-5dad-11e7-9361-ba2c15abba37.png" width="600" alt="Enable custom formatters">
</a>

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

## Debugging the debugger

It can be helpful to inspect the html created by the formatters. Fortunately you can debug DevTools using a second DevTools instance.

1. Start Chrome with remote debugging enabled:

    OSX:
    ```
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
    ```
    
    Windows:
    ```
    chrome.exe --remote-debugging-port=9222
    ```
    
2. Navigate to your ember application and open the debugger
3. It helps to split DevTools in its own window using the first "Dock side" option:

   <img width="241" alt="screen shot 2017-06-30 at 4 30 50 pm" src="https://user-images.githubusercontent.com/752885/27757014-916a373e-5db1-11e7-97a4-383a972743ce.png">

4. Attach your remote debugger using another Chrome instance or [standalone DevTools](https://github.com/auchenberg/chrome-devtools-app/releases)

See also: https://chromedevtools.github.io/devtools-protocol/#remote
