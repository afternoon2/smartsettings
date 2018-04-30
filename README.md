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
    - `show()`
    - `hide()`
    - `open()`
    - `close()`
    - `toggle()`
    - `destroy()` - removes specific settings panel from the DOM
    - **Note** - creation method remains private and is invoked each time the new `SmartSettings` instance is being constructed. To create new `SmartSettings` panel, use the constructor function.
2. Structuring
    - Section 
        - `section(name, isOpen)` - creates new section, `isOpen` set by default to `false`
        - `add(controlName)` - adds control to the section
        - `remove(controlName)` - removes control from the section
3. Controls (for now)
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

## Section spec
- name: string
- visible: boolean | true
- open: boolean | true
- controls: array<Control>

## Control spec (regardless the type)
- name: string
- type: string | ['button', 'select', 'range', 'boolean', 'text', 'textarea']
- element: HTMLElement
- value?: number|string|boolean
- values?: Array<string|number>
- callback?: function

## User stories
- Create empty panel
    - create `SmartSettings` instance
    - => this._create(name, x, y)

## Notes
So, maybe:

```js
const settings = new Settings('Settings', 10, 10)
/*
which runs:
*/

_create: (name, left, top) => {
    // default values
    if (!left) {
        left = 0
    }
    if (!top) {
        top = 0
    }
    if (!name) {
        name = 'SmartSettings'
    }
    let panelAttributes = {
        class: 'sms-panel',
        id: `sms_panel_${name}`,
        style: `top: ${top}px; left: ${left}px; z-index: 2`
    }
    let panel = this._createElement('div', panelAttributes)
    let header = this._createElement('div', { class: 'sms-panel-header' })
    let body = this._createElement('div', { class: 'sms-panel-body' })
    let paragraph = this._createElement('p', { class: 'sms-panel-header-name' })
    
    paragraph.innerText = name
    header.appendChild(paragraph)
    panel.appendChild(header)
    panel.appendChild(body)

    document.body.appendChild(panel)
}

```

## TBD list:
1. Project 
    - structure
        - ~~Having flow-striped source files causes problems with excluding flow containing files from esdoc documentation process. Move flow-striped sources to the `./docs` or separate directory, like `./no-flow` or `./flow-striped`.~~
        - ~~Provide testing structure and environment for unit tests.~~
    - build process
        - ~~Remove esdoc annotations and comments from the build files~~
        - ~~Add minified files~~
        - ~~Provide es6 module versions~~
2. Core functionality
    - Provide stylesheets support for `SmartSettings`:
        - ~~suggested preprocessor: `sass` (bracket or indentation-driven notation)~~
        - ~~add autoprefixer~~
    - ~~Create sass style structure~~
