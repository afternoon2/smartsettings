# smartsettings.js
Yet another JavaScript library for creating (smart) setting panels.

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
    - `checkbox(name, value)` ✅
    - `color(name, value)` ✅
    - `text(name, value, callback)` ✅
    - `textarea(name, value, callback)` ✅
    - `progressbar(name, items, callback)` ❌
    - `file()` ❌
    - `number()` ❌
    - `time()` ❌
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

## TBD:
- `progressbar(name, items, callback)` ❌
- `file()` ❌
- `number()` ❌
- `time()` ❌
- Drag & drop panel
- set & get position - update panel's position on each this._top and this._left change
- styling enhancements
- prepare npm publish script
- more tests