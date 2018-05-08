# smartsettings.js
Yet another JS library for creating setting panels.

## Installation

```
npm install --save-dev smartsettings
```

## Usage

For ES modules:
```js
import SmartSettings from 'smartsettings'
```

For UMD modules
```js
const SmartSettings = require('smartsettings')
```

And then just:

```js
const settings = new SmartSettings('Settings', 10 /* left */, 10 /* top */)
```

Or in the browser:
```html
<script src="https://unpkg.com/smartsettings@1.0.3/dist/smartsettings.umd.js"></script>
```

[Documentation](https://afternoon2.github.io/smartsettings/)

## API overview
- Controls:
    - `button(name, callback)`
    - `range(name, items, callback)` - items are min, max, default and step
    - `select(name, items, callback)` - items are strings or numbers with option values
    - `checkbox(name, value, callback)`
    - `color(name, value, callback)`
    - `text(name, value, callback)`
    - `textarea(name, value, callback)`
    - `number(name, items, callback)` - items are default and step value
    - `file(name, callback)`
    - **In all cases the `callback` parameter (function executed on each change in the control) is optional**
- Methods:
    - `show(name)` - show settings panel or control (if the name is provided) 
    - `hide(name)` - hide settings panel or control (if the name is provided)
    - `enable(name)` - enable specific control
    - `disable(name)` - disable specific control
    - `open()` - open settings panel
    - `close()` - close settings panel
    - `toggle()` - open/close settings panel
    - `destroy()` - remove current panel from the DOM
    - `remove(name)` - removes specific control from the panel
    - `getValue(name)` - returns active value of the specific control
    - `setValue()` - sets new active value of the specific control
    - `getActiveValues()` - returns object with active values of all controls (except buttons)
    - `setItems(name, items)` - set new dropdown, range or progressbar control items
    - `getItems(name)` - get items of the specific dropdown, range or progressbar control
    - `watch(callback)` - watch panel for changes and fire callback on each change (real or artificial - from `setItems` or `setValue`).
    - `loadConfig(config)` - load controls in the settings panel from the given object/JSON string/array of objects (config description below).

## Demo

<p data-height="527" data-theme-id="0" data-slug-hash="08a144fdad89d6a44e956ce96c783873" data-default-tab="js,result" data-user="jakub_antolak" data-embed-version="2" data-pen-title="SmartSettings demo" class="codepen"><a href="https://codepen.io/jakub_antolak/pen/08a144fdad89d6a44e956ce96c783873/">SmartSettings demo</a> by Kuba (<a href="https://codepen.io/jakub_antolak">@jakub_antolak</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### Config template for `loadConfig` method

Each entry in the config object should contain values specific for the control you want to load + type of the control. So in the `color` example it should be the `name` and `value` strings, 'color' `type` and (optionally) a `callback` function, etc. All types are written with small letters.

```js
const config = {
    button: {
        name: 'Button',
        type: 'button',
        callback: () => { /* some function */ }
    }
}
// or
const configArray = [{
    name: 'Buton',
    type: 'button',
    callback: () => { /* some function */ }
}]
// or
const configJSON = "{ "Btn": { "name": "Button", "type": "button" } }" // etc.
```