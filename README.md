# smartsettings.js
## A JavaScript library for creating simply and advanced setting panels.
---
## Installation

```
npm install --save-dev smartsettings
```

## Usage

Import in ES Modules
```js
import SmartSettings from 'smartsettings'

const settings = new Settings('Settings', 10, 10)
```
In the browser:
```js
const settings = new SmartSettings('Settings', 10, 10)
```

## API overview
1. Panel methods:
    - ~~`show()`~~
    - ~~`hide()`~~
    - ~~`open()`~~
    - ~~`close()`~~
    - ~~`toggle()`~~
    - ~~`destroy()`~~ - removes specific settings panel from the DOM
    - ~~`getValue()` - returns current value of the specific control~~
    - ~~`setValue()` - sets new active value of the specific control~~
    - ~~`getValues()` - returns object active values of all controls~~
    - ~~`setName()` - sets new name of the control~~
    - ~~`remove(name)` - removes specific control from the panel~~
    - **Note** - creation method remains private and is invoked each time the new `SmartSettings` instance is being constructed. To create new `SmartSettings` panel, use the constructor function.
2. Control methods:
    - ~~`enable()`~~
    - ~~`disable()`~~
    - ~~`show()`~~
    - ~~`hide()`~~
    - ~~`getValue()` - returns active value~~
    - ~~`setValue()` - sets new active value~~
    - `getItems()` - for `select`, `progressbar` and `range`
    - `updateItems()` - for `select`, `progressbar` and `range`

3. Controls:
    - ~~`button(name, callback)`~~
    - `progressbar(name, items, callback)`
    - ~~`range(name, items, callback)`~~
    - `select(name, items, callback)`
    - ~~`text(name, value, callback)`~~
    - ~~`textarea(name, value, callback)`~~

## Panel spec
- name: string => constructor
- left: number => constructor
- top: number => constructor
- _visible: boolean | true
- _open: boolean | true
- _draggable: boolean | false | <Future>
- _panel: HTMLElement
- _controls: array<Control>
- _sections: array<Section>

## Control spec (regardless the type)
- name: string
- type: string | ['button', 'select', 'range', 'boolean', 'text', 'textarea']
- element: HTMLElement
- value?: number|string|boolean
- values?: Array<string|number>