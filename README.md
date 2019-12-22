# smartsettings.js

JS library for creating setting panels.

<div style="text-align: center">

*Version 2.x.x*

![SmartSettings Preview](https://raw.githubusercontent.com/afternoon2/smartsettings/assets/smartsettings_shot.png)

</div>

## Installation

### Yarn
```
yarn add smartsettings
```

### Npm

```
npm install --save smartsettings
```

## Usage

### Default creation
```javascript
import SmartSettings from 'smartsettings';

const panel = new SmartSettings();
```

### Creation with parameters
```javascript
import SmartSettings from 'smartsettings';

const panel = new SmartSettings({
    name: 'My panel',
    top: 40,
    left: 300,
    disabled: true,
    listener: (update) => console.log(update),
});
```

### Nodes

<details>
    <summary>Section</summary>

```js
const section = panel.section({
    name: 'Section',
    collapsed: true,
    disabled: false,
    invisible: false,
    listener: (update) => console.log(update.value),
});
```
</details>

<details>
    <summary>Slot</summary>

```js
const section = panel.slot({
    name: 'Slot',
    collapsed: true,
    disabled: false,
    invisible: false,
    listener: (update) => console.log(update.value),
});
```
</details>

### Controls

<details>
    <summary>Button</summary>

```javascript
const button = panel.control('button', {
    name: 'Click me!',
    listener: (update) => yourCallback()
});
```
</details>

<details>
    <summary>Checkbox</summary>

```javascript
const checkbox = panel.control('checkbox', {
    name: 'Is Awesome',
    checked: true,
    listener: (update) => yourCallback(update.value)
});
```
</details>

<details>
    <summary>File</summary>

```javascript
const file = panel.control('file', {
    name: 'Data',
    listener: (update) => yourCallback(update.value)
});
```
</details>

<details>
    <summary>Number</summary>

```javascript
const number = panel.control('number', {
    name: 'Humidity [%]',
    min: 0,
    max: 100,
    step: 1,
    value: 30,
    listener: (update) => yourCallback(update.value)
});
```
</details>

<details>
    <summary>Range</summary>

```javascript
const range = panel.control('range', {
    name: 'Gravity',
    min: 0,
    max: 100,
    step: 1,
    value: 10,
    listener: (update) => yourCallback(update.value)
});
```
</details>

<details>
    <summary>Text</summary>

```javascript
const text = panel.control('text', {
    name: 'Text input',
    placeholder: 'Your value',
    listener: (update) => yourCallback(update.value)
});
```
</details>

<details>
    <summary>TextArea</summary>

```javascript
const textarea = panel.control('textarea', {
    name: 'Textarea input',
    value: JSON.stringify(yourData),
    readOnly: true,
    listener: (update) => yourCallback(update.value)
});
```
</details>

<details>
    <summary>DropDown</summary>

```javascript
const dropdown = section.control('dropdown', {
  name: 'Dropdown',
  selected: 'first',
  items: [
    {
      id: 'first',
      text: 'First',
      value: 'first',
    },
    {
      id: 'second',
      text: 'Second',
      value: 'second',
    },
    {
      id: 'third',
      text: 'Third',
      value: 'third',
    },
  ]
});
```
</details>

<details>
    <summary>Color</summary>

```javascript
const color = section.control('color', {
  name: 'Color',
  value: 'rgba(19, 29, 135, 1)',
});
```
</details>

### API overview

#### Panel

- `get position` returns `PanelPosition` object
- `setPosition(position)` sets new panel position
- `setListener(listener)` sets global change listener on the panel
- `destroy` - clears panel's registry and listeners list, removes its `element` from the `parentElement` (usually `document.body`) and performs `Object.freeze` on its state and on the panel instance itself
- `remove(name)` - removes first node with given name from the panel (this method works on the section's scope too)
- `removeById(id)` - removes node with given id from the panel (this method works in the section's scope too)
- `removeAll` removes all controls and nodes from the panel
- `control(control, options)` creates new control
- `section(options)` creates new section node
- `set config` - loads panel's children using provided config object (setter)
- `get config` - returns panel's current config object. Returned config object will always consist of controls'/nodes' identifiers as the keys

#### Section and Slot

- `control(control, options)` creates new control
- `set config` - loads section's children using provided config object (setter)
- `get config` - returns section's current config object. Returned config object will always consist of controls' identifiers as the keys
- `remove(name)` - removes first node with given name from the section
- `removeById(id)` - removes node with given id from the section
- `removeAll` removes all controls and nodes from the section
- `setListener(listener)` sets local change listener
