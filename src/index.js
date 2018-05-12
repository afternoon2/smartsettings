import style from './index.css'

/**
 * @class SmartSettings
 * @classdesc SmartSettings module, returns new SmartSettings instance
 * @param {string} name - name of the SmartSettings panel
 * @param {number} left - position of the SmartSettings panel on X axis
 * @param {number} top - position of the SmartSettings panel on Y axis
 * @example
 * const mySettings = new SmartSettings('My Settings', 10, 10)
*/
class SmartSettings {
    constructor(name = 'SmartSettings', left = 0, top = 0) {
        this.name = name
        this.initialLeft = left
        this.initialTop = top

        /**
         * @property {boolean} _hidden
         * @private
         */
        this._hidden = false

        /**
         * @property {boolean} _open
         * @private
         */
        this._open = true

        /**
         * @property {boolean} _draggable
         * @private
         */
        this._draggable = false

        /**
         * @property {Node} _panel
         * @private
         */
        this._panel = null

        /**
         * @property {object} _controls
         * @private
         */
        this._controls = {}

        /**
         * @property {string} _localString
         * It lets creating unique identifier for the panels
         * @private
         */
        this._localString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        /**
         * @property {?function} _globalWatcher
         * @private
         */
        this._globalWatcher = null

        this._createUniqueId()
        this._create(this.name, this.initialTop, this.initialLeft)

        /**
         * @property {?Node} _panelBody - body div
         * @private
         */
        this._body = this._panel ? this._panel.childNodes[1] : null
    }

    /* Utility methods */

    /**
     * Inits function that creates unique element identifier
     * @returns {string}
     * @private
     */
    _createUniqueId() {
        let counter = 0
        this.uniqueID = () => `${this._localString}-${counter++}`
    }
     
    /**
     * Creates any DOM element
     * @param {string} type - type of the DOM element
     * @param {Object} attributes - object with all attributes for the DOM element
     * @returns {Node}
     * @private 
     */
    _createElement(type, attributes) {
        let element = document.createElement(type)
        if (attributes) {
            for (let key in attributes) {
                if (key === 'class') {
                    element.setAttribute('class', attributes[key])
                } else {
                    element[key] = attributes[key]
                }
            }
        }
        return element
    }

    /**
     * Creates label element
     * @param {string} name - name in the label
     * @returns {Node}
     * @private
     */
    _createLabel(name) {
        return this._createElement('label', {
            class: 'sms-label',
            innerText: name,
            value: name
        })
    }
    /**
     * Calls the global watcher
     * @param {EventListenerObject} event - an event
     * @returns {void}
     * @private
     */
    _callGlobalWatcher(e) {
        if (this._globalWatcher) {
            this._globalWatcher(e)
        }
    }

    /**
     * Assigns config entry to the specific control creation method
     * @param {object} entry - entry of the config object|array
     * @private
     */
    _assignEntryToMethod(_entry) {
        let _isCallback = _entry.callback ? _entry.callback : null
        switch (_entry.type) {
        case 'button':
            this.button(_entry.name, _isCallback)
            break
        case 'range':
            this.range(_entry.name, _entry.items, _isCallback)
            break
        case 'select':
            this.select(_entry.name, _entry.items, _isCallback)
            break
        case 'text':
            this.text(_entry.name, _entry.value, _isCallback)
            break
        case 'textarea':
            this.textarea(_entry.name, _entry.value, _isCallback)
            break
        case 'checkbox':
            this.checkbox(_entry.name, _entry.value, _isCallback)
            break
        case 'number':
            this.number(_entry.name, _entry.items, _isCallback)
            break
        case 'color':
            this.color(_entry.name, _entry.value, _isCallback)
            break
        case 'file':
            this.file(_entry.name, _isCallback)
        }
    }

    /**
     * Dispatches an event after setting new items or new value to the control
     * @param {Node} element - DOM element dispatcher
     * @param {string} type - type of the control
     * @returns {void}
     * @private
     */
    _dispatchEvent(element, type) {
        let _eventType
        if (type === 'button') {
            _eventType = 'click'
        }
        if (
            type === 'text' || 
            type === 'textarea' || 
            type === 'range' ||
            type === 'color' ||
            type === 'number'
        ) {
            _eventType = 'input'
        }
        if (
            type === 'checkbox' ||
            type === 'select' ||
            type === 'file'
        ) {
            _eventType = 'change'
        }
        element.dispatchEvent(new Event(_eventType))
    }

    /* Helper methods */

    /**
     * Creates settings panel, invoked on class construction
     * @returns {void}
     * @private
     */
    _create() {
        let self = this
        let panelAttributes = {
            class: 'sms-panel',
            id: this.uniqueID(),
            style: `top: ${this.initialTop}px; left: ${this.initialLeft}px; z-index: 2`
        }
        let panel = this._createElement('div', panelAttributes)
        let header = this._createElement('div', { class: 'sms-panel-header' })
        let body = this._createElement('div', { class: 'sms-panel-body' })
        let paragraph = this._createElement('p', { class: 'sms-panel-header-name' })
        header.addEventListener('click', e => this.toggle())
        paragraph.innerText = this.name
        header.appendChild(paragraph)
        panel.appendChild(header)
        panel.appendChild(body)
        this._panel = panel
        document.body.appendChild(this._panel)
    }

    /**
     * Creates basic properties for the new control
     * @returns {object}
     * @private
     */
    _createControlBasics() {
        let id = this.uniqueID()
        let basics = {
            id: id,
            disabled: false,
            hidden: false,
            value: null,
            name: null,
            type: null,
            callback: null,
            element: function() {
                return document.getElementById(this.id)
            },
            enable: function() {
                this.element().removeAttribute('disabled')
                this.disabled = false
            },
            disable: function() {
                this.element().setAttribute('disabled', true)
                this.disabled = true
            },
            show: function() {
                if (this.element().parentNode.classList[1] === 'hide') {
                    this.element().parentNode.classList.remove('hide')
                    this.hidden = false
                }
            },
            hide: function() {
                if (this.element().parentNode.classList[1] !== 'hide') {
                    this.element().parentNode.classList.add('hide')
                    this.hidden = true
                }
            }
        }
        return basics
    }

    /**
     * Returns select option
     * @param {(string|number)} item - option value
     * @param {boolean} [selected] - is option selected
     * @returns {Node}
     * @private
     */
    _createSelectOption(item, selected) {
        let option = this._createElement('option', {
            class: 'sms-select-option',
            value: item,
            innerText: item,
            selected: selected ? selected : false
        })
        return option
    }

    /* Basic methods */

    /**
     * Removes settings panel from the DOM and removes all sections and controls
     * @returns {void}
     * @example
     * mySettings.destroy()
     */
    destroy() {
        if (this._panel && this._panel.parentElement) {
            this._panel.parentElement.removeChild(this._panel)
        }
        this._panel = null
        this._controls = {}
    }

    /**
     * Shows settings panel or specific control (if the name is provided)
     * @param {string} [name] - name of control to be shown
     * @returns {void}
     * @example
     * mySettings.show()
     */
    show(name) {
        if (name) {
            this._controls[name].show()
        } else {
            this._panel.classList.remove('hide')
            this._hidden = false
        }
    }

    /**
     * Hides settings panel or specific control (if the name is provided)
     * @param {string} [name] - name of control to be hidden
     * @returns {void}
     * @example
     * mySettings.hide()
     */
    hide(name) {
        if (name) {
            this._controls[name].hide()
        } else {
            this._panel.classList.add('hide')
            this._hidden = true
        }
    }

    /**
     * Enables specific control
     * @param {string} name
     * @returns {void}
     * @example
     * mySettings.enable('Checkbox control')
     */
    enable(name) {
        if (name && this._controls[name]) {
            return this._controls[name].enable()
        }
    }

    /**
     * Disables specific control
     * @param {string} name
     * @returns {void}
     * @example
     * mySettings.enable('Checkbox control')
     */
    disable(name) {
        if (name && this._controls[name]) {
            return this._controls[name].disable()
        }
    }

    /**
     * Open settings panel
     * @example
     * mySettings.open()
     */
    open() {
        if (this._body.classList[1] === 'hide') {
            this._body.classList.remove('hide')
        } 
        this._open = true
    }

    /**
     * Close settings panel
     * @example
     * mySettings.close()
     * 
     */
    close() {
        this._body.classList.add('hide')
        this._open = false
    }

    /**
     * Open or close settings panel depending on `_open` property
     * @returns {void}
     * @example
     * mySettings.toggle()
     */
    toggle() {
        this._body.classList[1] === 'hide' ?
            this._body.classList.remove('hide') :
            this._body.classList.add('hide')
        this._open = !this._open
    }

    /**
     * Returns panel position [left, top]
     * @return {array<string>}
     * @example
     * let position = mySettings.getPosition() // [0, 0]
     */
    getPosition() {
        return [
            this._panel.style.left,
            this._panel.style.top
        ]
    }

    /**
     * Sets panel position
     * @param {number} left - new position on the X axis
     * @param {number} top - new position on the Y axis
     * @example
     * mySettings.setPosition(400, 400)
     */
    setPosition(left, top) {
        this._panel.style.left = `${left}px`
        this._panel.style.top = `${top}px`
    }

    /**
     * Removes specific control
     * @param {string} name - name of the control to be deleted
     * @returns {void}
     * @example
     * mySettings.remove('Control name')
     */
    remove(name) {
        if (name) {
            let elem = this._controls[name].element()
            elem.parentElement.remove()
            elem.remove()
            delete this._controls[name]
        }
    }

    /**
     * Removes all controls from the panel
     * @param {boolean} [removeName] - set to true if you want to clean the panel's name. Default set to false
     * @returns {void}
     * @example
     * mySettings.removeAll()
     */
    removeAll(removeName = false) {
        for (let key in this._controls) {
            delete this._controls[key]
        }
    }

    /**
     * Get value of specific control
     * @param {string} name - name of the control
     * @returns {(number|string|boolean)}
     * @example
     * let value = mySettings.getValue('Control name')
     */
    getValue(name) {
        if (name && this._controls[name] && this._controls[name].getValue) {
            return this._controls[name].getValue()
        }
    }

    /**
     * Sets new active value of the specific control. (Changing button control value does not change its' id property)
     * @param {string} name - name of the control
     * @param {(number|string|boolean)} name - new value
     * @param {boolean} [syntheticEvent] - specify, if method should dispatch syntethic event after items update. Default value is false
     * @returns {void}
     * @example
     * mySettings.setValue('Control name', 'value')
     */
    setValue(name, value, syntheticEvent = false) {
        let _control = this._controls[name]
        if (name && _control && _control.setValue) {
            return _control.setValue(value, syntheticEvent)
        }
    }

    /**
     * Get all active values
     * @returns {object} - an object with values from all currently set controls
     * @example
     * let values = mySettings.getActiveValues()
     */
    getActiveValues() {
        let values = {}
        for (let i in this._controls) {
            if (this._controls[i].getValue) {
                values[i] = this._controls[i].getValue()
            }
        }
        return values
    }

    /**
     * Get selected index of the select control
     * @param {string} name - name of the control
     * @returns {number}
     * @example
     * let currentIndex = mySettings.getIndex('Select control')
     */
    getIndex(name) {
        if (name && this._controls[name].getIndex) {
            return this._controls[name].getIndex()
        }
    }

    /**
     * Set selected index of the select control
     * @param {string} name - name of the control
     * @param {number} index - new active index
     * @param {boolean} [syntheticEvent] - specify, if method should dispatch syntethic event after items update. Default value is false
     * @returns {void}
     * @example
     * mySettings.setIndex('Select', 4)
     */
    setIndex(name, index, syntheticEvent = false) {
        if (name && this._controls[name].setIndex) {
            return this._controls[name].setIndex(index, syntheticEvent)
        }
    }

    /**
     * Get select/range items
     * @param {string} name - name of the control
     * @returns {array}
     * @example
     * let selectValues = mySettings.
     */
    getItems(name) {
        let typeCondition = (
            this._controls[name].type === 'range' || 
            this._controls[name].type === 'select' || 
            this._controls[name].type === 'progressbar'
        )
        if (this._controls[name] && typeCondition) {
            return this._controls[name].getItems()
        } else {
            throw new Error('Chosen control is not a range, select or progressbar type')
        }
    }

    /**
     * Set (update) select/range items
     * @param {string} name - name of the control
     * @param {array} items - array of new items
     * @param {boolean} [syntheticEvent] - specify, if method should dispatch syntethic event after items update. Default value is false
     * @returns {void}
     * @example
     * mySettings.setItems('Select', [1, 2, 3, 4])
     */
    setItems(name, items, syntheticEvent = false) {
        let typeCondition = (
            this._controls[name].type === 'range' ||
            this._controls[name].type === 'select' ||
            this._controls[name].type === 'progressbar'
        )
        if (this._controls[name] && typeCondition) {
            return this._controls[name].setItems(items, syntheticEvent)
        } else {
            throw new Error('Chosen control is not a range, select or progressbar type')
        }
    }

    /**
     * Creates button control
     * @param {string} name - name of the control 
     * @param {function} callback - function executed on each change
     * @returns {object} button control object
     * @example
     * let button = mySettings.button('Button Name', () => console.log('This is the button'))
     */
    button(name, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', {
            class: 'sms-control'
        })
        let button = this._createElement('button', {
            class: 'sms-button',
            id: base.id,
            innerText: name,
            value: name
        })
        base.type = 'button'
        base.name = name
        base.callback = callback || null
        button.addEventListener('click', e => {
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        wrapper.appendChild(button)
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates text input control
     * @param {string} name - name of the control
     * @param {string} value - value of the control
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let textInput = mySettings.text('Text input', 'Hello world')
     */
    text(name, value, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let input = this._createElement('input', {
            class: 'sms-text',
            id: base.id,
            type: 'text',
            innerText: value,
            placeholder: value,
            value: value
        })
        base.name = name
        base.value = value
        base.type = 'text'
        base.callback = callback || null
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        input.addEventListener('input', e => {
            base.value = e.target.value
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        this._body.appendChild(wrapper)
        base.getValue = function() {
            return this.element().value
        }
        base.setValue = function (value, syntheticEvent) {
            base.value = value
            base.element().innerText = value
            base.element().value = value
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates textarea control
     * @param {string} name - name of the control
     * @param {string} value - value of the control
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let textarea = mySettings.textarea('Text input', 'Hello world')
     */
    textarea(name, value, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let textarea = this._createElement('textarea', {
            class: 'sms-textarea',
            id: base.id,
            innerText: value,
            value: value,
            placeholder: value
        })
        base.name = name
        base.value = value
        base.type = 'textarea'
        base.callback = callback || null
        wrapper.appendChild(label)
        wrapper.appendChild(textarea)
        textarea.addEventListener('input', e => {
            base.value = e.target.value
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        base.getValue = function () {
            return this.element().value
        }
        base.setValue = function (value, syntheticEvent) {
            base.value = value
            base.element().innerText = value
            base.element().value = value
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates range control
     * @param {string} name - name of the control
     * @param {array} items - array with min, max, default and step values
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let range = mySettings.range('Range', [1, 100, 40, 1], e => console.log(e.target.value))
     */
    range(name, items, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let span = this._createElement('span', { class: 'sms-label-span' })
        let input = this._createElement('input', {
            class: 'sms-range',
            id: base.id,
            type: 'range',
            min: items[0],
            max: items[1],
            value: items[2],
            step: items[3]
        })
        base.type = 'range'
        base.name = name
        base.value = items[2]
        base.callback = callback || null
        input.addEventListener('input', e => {
            base.value = parseFloat(e.target.value)
            span.innerText = base.value
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        span.innerText = base.value
        label.appendChild(span)
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        this._body.appendChild(wrapper)
        base.getValue = function() {
            return parseFloat(base.element().value)
        }
        base.setValue = function(v, syntheticEvent) {
            base.value = v
            base.element().value = v
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        base.getItems = function() {
            let e = base.element()
            return [
                parseFloat(e.min),
                parseFloat(e.max),
                parseFloat(e.value),
                parseFloat(e.step),
            ]
        }
        base.setItems = function(items, syntheticEvent) {
            let e = base.element()
            e.min = items[0]
            e.max = items[1]
            e.value = items[2]
            e.step = items[3]
            base.value = parseFloat(e.value)
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates checkbox control
     * @param {string} name - name of the control
     * @param {boolean} value - value of the control
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let checkbox = mySettings.checkbox('Check this out!', true, e => {
     *      console.log(e.target.value)
     * })
     */
    checkbox(name, value, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let checkbox = this._createElement('input', {
            class: 'sms-checkbox',
            id: base.id,
            type: 'checkbox'
        })
        base.name = name
        base.type = 'checkbox'
        base.value = value
        base.callback = callback || null
        if (value === true) {
            checkbox.setAttribute('checked', true)
        }
        checkbox.addEventListener('change', e => {
            base.value = e.target.checked
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        wrapper.appendChild(label)
        wrapper.appendChild(checkbox)
        base.getValue = function() {
            return base.element().checked
        }
        base.setValue = function(v, syntheticEvent) {
            base.element().checked = v
            base.value = v
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates color control
     * @param {string} name - name of the control
     * @param {string} value -hexadecimal string value of initial color
     * @param {function} [callback] - function executed afer each change
     * @returns {object}
     * @example
     * let color = mySettings.color('Color control', '#fcfcfc', e => someCallbackFunction())
     */
    color(name, value, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let span = this._createElement('span', { class: 'sms-label-span' })
        let input = this._createElement('input', {
            class: 'sms-color',
            id: base.id,
            type: 'color'
        })
        base.name = name
        base.type = 'color'
        base.value = value
        base.callback = callback || null
        input.setAttribute('value', value)
        input.addEventListener('input', e => {
            base.value = e.target.value
            span.innerText = e.target.value
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        span.innerText = value
        label.appendChild(span)
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        base.getValue = function() {
            return base.element().value
        }
        base.setValue = function(v, syntheticEvent) {
            base.element().value = v
            base.value = v
            span.innerText = v
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates select control
     * @param {string} name - name of the control
     * @param {array} items - array with option values
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let select = mySettings.select('Select', ['Option 1', 'Option 2', 'Option 3'])
     */
    select(name, items, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let select = this._createElement('select', {
            class: 'sms-select',
            id: base.id,
            name: name,
            value: items[0]
        })
        wrapper.appendChild(label)
        items.map(item => {
            let option = self._createSelectOption(item)
            select.options.add(option)
        })
        select.addEventListener('change', e => {
            base.value = e.target.value
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        wrapper.appendChild(select)
        base.value = items[0]
        base.name = name
        base.type = 'select'
        base.callback = callback || null
        base.getValue = function() {
            let _select = base.element()
            return _select.options[_select.selectedIndex].value
        }
        base.setValue = function(v, syntheticEvent) {
            base.value = v
            let _select = base.element()
            select.options[select.selectedIndex] = self._createSelectOption(v)
            _select.value = v
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        base.getItems = function() {
            return Array
                .from(base.element().options)
                .map(option => option.value)
        }
        base.setItems = function(items, syntheticEvent) {
            const _current = {
                selected: base.element().selectedIndex,
                length: base.getItems().length
            }
            const _new = {
                selected: -1,
                length: items.length
            }

            if (_new.length > _current.length) {
                if (_current.selected === -1 || _current.selected === '') {
                    _new.selected = 0
                }
                if (_current.selected > -1) {
                    _new.selected = _new.length - 1
                }
            }
            if (_new.length < _current.length) {
                if (_current.selected > - 1 && _current.selected < _new.length) {
                    _new.selected = _current.selected
                }
                if (_current.selected > _new.length - 1) {
                    _new.selected = _new.length - 1
                }
            }

            for (let i = 0; i < base.element().options.length; i++) {
                base.element().options[i].remove()
            }
            items.forEach(item => {
                let _index = items.indexOf(item)
                base.element().options[_index] = self._createSelectOption(
                    item,
                    _index = _new.selected ? true : false
                )
            })
            base.value = items[_new.selected]
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        base.getIndex = function() {
            return parseInt(base.element().selectedIndex)
        }
        base.setIndex = function(value, syntheticEvent) {
            base.element().selectedIndex = value
            base.value = base.element().options[value].value
            if (syntheticEvent === true) {
                self.dispatchEvent(base.element(), base.type)
            }
        }
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates number control
     * @param {string} name - name of the control
     * @param {array} items - array with initial and step value
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let number = mySettings.number('Number', [10, 1], e => {})
     */
    number(name, items, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let input = this._createElement('input', {
            class: 'sms-number',
            id: base.id,
            type: 'number',
            value: items[0],
            step: items[1]
        })
        input.addEventListener('input', e => {
            base.value = parseFloat(e.target.value)
            if (callback) {
                callback(parseFloat(e))
            }
            if (self._globalWatcher !== null) {
                self._callGlobalWatcher(e)
            }
        })
        base.type = 'number'
        base.name = name
        base.value = items[0]
        base.callback = callback || null
        base.getValue = function() {
            return parseFloat(base.element().value)
        }
        base.setValue = function(v, syntheticEvent) {
            base.element().value = v
            base.value = v
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name] = base
    }

    /**
     * Creates file input control
     * @param {string} name - name of the control
     * @param {function} [callback] - function executed on each change
     * @returns {object}
     * @example
     * let fileControl = mySettings.file('File control', someCallbackFunction)
     */
    file(name, callback) {
        let self = this
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createLabel(name)
        let upload = this._createElement('input', {
            class: 'sms-file',
            id: base.id,
            type: 'file'
        })
        base.name = name
        base.type = 'file'
        base.callback = callback || null
        upload.addEventListener('change', e => {
            base.value = e.target.value
            if (callback) {
                callback(e)
            }
            if (self._globalWatcher) {
                self._callGlobalWatcher(e)
            }
        })
        wrapper.appendChild(label)
        wrapper.appendChild(upload)
        base.getValue = function() {
            return base.element().files[0]
        }
        base.setValue = function(v, syntheticEvent) {
            base.value = v
            base.element().files[0] = v
            if (syntheticEvent === true)
                self._dispatchEvent(base.element(), base.type)
        }
        this._body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name] = base
    }

    /**
     * Watch panel for changes and fire callback on each change
     * @param {function} callback - function executed on each change in the panel
     * @returns {void}
     * @example
     * mySettings.watch(callback)
     */
    watch(callback) {
        this._globalWatcher = callback
    }

    /**
     * Load controls from the configuration object.
     * @param {(object|string|array)} config - configuration object or JSON string or configuration array of objects
     * @returns {void}
     * @example
     * const mySettings = new SmartSettings('Name', 10, 10)
     * mySettings.loadConfig({
     *      control1: {
     *          type: 'color',
     *          name: 'Color',
     *          value: '#fd3ef4',
     *          callback: someCallbackFunction
     *      },
     *      // etc.
     * })
     * 
     * // or
     * mySettings.loadConfig('{
     *      "control1": {
     *          "type": "color",
     *          "name": "Color",
     *          "value": "#fd3ef4",
     *          "callback": "someCallbackFunction"
     *      },
     *      // etc.
     * }')
     * 
     * // or
     * mySettings.loadConfig([{
     *      {
     *          type: 'color',
     *          name: 'Color',
     *          value: '#fd3ef4',
     *          callback: someCallbackFunction
     *      },
     *      // etc.
     * ])
     */
    loadConfig(config) {
        if (!config) {
            throw new Error('There is no config provided')
        }
        if (typeof config === 'string' || !Array.isArray(config)) {
            if (typeof config === 'string') {
                config = JSON.parse(config)
            }
            for (let key in config) {
                let _entry = config[key]
                this._assignEntryToMethod(_entry)
            }
        }
        if (Array.isArray(config) === true) {
            config.forEach(entry => this._assignEntryToMethod(entry))
        }
    }

    /**
     * Returns current configuration
     * @param {string} [output] - unless there is an output parameter specified, this method returns an object. But you can set an output to be an 'array' or JSON 'string'
     * @returns {(object|array|string)}
     * @example
     * let currentConfig = mySettings.getConfig('array')
     * // returns array of control objects
     */
    getConfig(output = 'object') {
        let _valueOrItems
        let _obj = {}
        let decide = ctrl => {
            if (
                ctrl.type === 'select' ||
                ctrl.type === 'range' ||
                ctrl.type === 'number'
            ) {
                return {
                    items: ctrl.getItems()
                }
            } else {
                return {
                    value: ctrl.getValue()
                }
            }
        }
        for (let key in this._controls) {
            let _control = this._controls[key]
            if (_control.type === 'button') {
                _obj[key] = {
                    type: _control.type,
                    name: _control.name
                }
                if (_control.callback !== null) {
                    _obj[key].callback = _control.callback
                }
            } else {
                let itemsOrValue = decide(_control)
                _obj[key] = Object.assign({
                    type: _control.type,
                    name: _control.name
                }, itemsOrValue)
                if (_control.callback !== null) {
                    _obj[key].callback = _control.callback
                }
            }
        }
        if (!output || output === 'object') {
            return _obj
        }
        if (output === 'array') {
            return Object.values(_obj)
        }
        if (output === 'string') {
            return JSON.stringify(_obj, null, 4)
        }
    }
}

export default SmartSettings