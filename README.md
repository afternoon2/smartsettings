# smartsettings.js
## A JavaScript library for creating advanced, simply setting panels.
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
1. Basic methods:
    - ~~`show()`~~
    - ~~`hide()`~~
    - ~~`open()`~~
    - ~~`close()`~~
    - ~~`toggle()`~~
    - ~~`destroy()`~~ - removes specific settings panel from the DOM
    - **Note** - creation method remains private and is invoked each time the new `SmartSettings` instance is being constructed. To create new `SmartSettings` panel, use the constructor function.
2. Controls (for now)
    - Creating controls
        - `button(name, callback)`,
        - `progressbar(name, items, callback)`
        - `range(name, items, callback)`
        - `select(name, items, callback)`
        - `text(name, value, callback)`
        - `textarea(name, value, callback)`
    - Managing
        - Panel
            - `destroy()` - unmounts panel from the DOM
            - `setPosition(left, top)` - sets new position of the panel
            - `getPosition()` - returns current position
        - `remove(control | control[])` - removes one or more controls from the panel, regardless the section that they belong to.
        - `open()`
        - `close()`
        - `hide(control | control[])`
        - `show(control | control[])`
        - `enable(control | control[])`
        - `disable(control | control[])`
        - `getValue(control | control[])` - returns current (active) value of specific control(s)
        - `updateItems(items)` - updates items of `select`, `progressbar` or `range` control.

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
- callback?: function




## TBD list:
1. Provide internal rendering environment
