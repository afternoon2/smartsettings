# smartsettings.js
Yet another JavaScript library for creating (smart) setting panels.

<img src="https://github.com/afternoon2/smartsettings/blob/master/2docs/usage-gif.gif" alt="usage gif" style="width: 300px; height: auto;">

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
    - `button(name, callback)` ✅
    - `range(name, items, callback)` ✅
    - `select(name, items, callback)` ✅
    - `checkbox(name, value, callback)` ✅
    - `color(name, value, callback)` ✅
    - `text(name, value, callback)` ✅
    - `textarea(name, value, callback)` ✅
    - `number()` ✅
    - `file()` ❌ 
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
    - `watch(callback, name)` - watch panel for changes and fire callback on each change
    - `loadConfig(config)` - load controls in the settings panel from the given object/JSON string/array of objects.

### Config template for `loadConfig` method

Basically, each entry in the config object should contain values specific for the control you want to load + type of the control. So in the `color` example it should be the `name` and `value` strings, 'color' `type` and (optionally) a `callback` function, etc. All types are written with small letters.

```js
const config = {
    button: {
        name: 'Button',
        type: 'button',
        callback: () => { /* some function */ }
    },
    color: {
        name: 'Color',
        type: 'color',
        value: '#fcffc4'
    },
    range: {
        name: 'Range',
        type: 'range',
        items: [0, 100, 50, 1],
        callback: () => { /* some function */ }
    }
    // etc.
}
```

But you can go with the JSON string or array of objects like the entries described above!

## TBD:
- `file()` method
- Drag & drop panel
- Sections
- set & get position - update panel's position on each this._top and this._left change
- styling enhancements
- prepare npm publish script
- more tests