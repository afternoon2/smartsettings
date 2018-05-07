# smartsettings.js
Yet another JS library for creating setting panels.

## Installation

```html
<script src="./smartsettings.umd.js"></script>
```

or (in ES modules):

```
npm install --save-dev smartsettings
```
and then
```js
import SmartSettings from 'smartsettings'
```
and then just:

```js
const settings = new SmartSettings('Settings', 10, 10)
```

## API overview
- Controls:
    - `button(name, callback)`
    - `range(name, items, callback)`
    - `select(name, items, callback)`
    - `checkbox(name, value, callback)`
    - `color(name, value, callback)`
    - `text(name, value, callback)`
    - `textarea(name, value, callback)`
    - `number()`
    - `file()`
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
    - `watch(callback, name)` - watch panel for changes and fire callback on each change (real or artificial - from `setItems` or `setValue`).
    - `loadConfig(config)` - load controls in the settings panel from the given object/JSON string/array of objects.

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