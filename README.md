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


## Section spec

## Control spec (regardless the type)


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
