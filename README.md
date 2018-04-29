# smartsettings

## API sketch

- SmartSettings.js
    - Public methods
        - @public `destroy()` - unmounts panel from the DOM
        - @public `addSection('name')` - adds new section in the panel
        - @public `removeSection(x'name')` - removes section from the panel
        - @public `button(name: string, callback?: function)` - adds button to the panel/section
        - @public `dropdown(name: string, items: array, callback?: function)` - adds dropdown to the panel/section
        - @public `range(name: string, items: array, callback?: function)` - adds range to the panel/section
        - @public `boolean(name: string, value: boolean, callback? function)` - adds checkbox to the panel/section
        - @public `progressbar(name: string, items: number[currentValue, maxValue, displayValue?])` - adds progress bar to the panel/section
        - @public `text(name: string, value: string, callback?: function)` - adds text input to the panel/section
        - @public `textarea()`
        - @public `html()`
    - Private methods
        - @private `_create()` - mounts panel in the DOM
        - @private `_createElement()`

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
