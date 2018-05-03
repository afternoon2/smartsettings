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
        this.left = left
        this.top = top

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

        this._createUniqueId()
        this._create(this.name, this.top, this.left)
    }

    /* Utility methods */

    /**
     * Creates unique element identifier
     * @private
     */
    _createUniqueId() {
        let counter = 0
        window.uniqueId = () => `sms-id-${counter++}`
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

    /* Helper methods */

    /**
     * Creates settings panel, invoked on class construction
     * @returns {void}
     * @private
     */
    _create() {
        let panelAttributes = {
            class: 'sms-panel',
            id: uniqueId(),
            style: `top: ${this.top}px; left: ${this.left}px; z-index: 2`
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
        let id = uniqueId()
        let basics = {
            id: id,
            disabled: false,
            hidden: false,
            value: null,
            name: null,
            type: null,
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
                if (this.element().classList[1] === 'hide') {
                    this.element().classList.remove('hide')
                    this.hidden = false
                }
            },
            hide: function() {
                if (this.element().classList[1] !== 'hide') {
                    this.element().classList.add('hide')
                    this.hidden = true
                }
            }
        }
        return basics
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
        }
        this._panel.classList.remove('hide')
        this._hidden = false
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
        }
        this._panel.classList.add('hide')
        this._hidden = true
    }

    /**
     * Open settings panel
     * @example
     * mySettings.open()
     */
    open() {
        let panelBody = this._panel.childNodes[1]
        if (panelBody.classList[1] === 'hide') {
            panelBody.classList.remove('hide')
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
        let panelBody = this._panel.childNodes[1]
        panelBody.classList.add('hide')
        this._open = false
    }

    /**
     * Open or close settings panel depending on `_open` property
     * @returns {void}
     * @example
     * mySettings.toggle()
     */
    toggle() {
        let panelBody = this._panel.childNodes[1]
        panelBody.classList[1] === 'hide' ?
            panelBody.classList.remove('hide') :
            panelBody.classList.add('hide')
        this._open = !this._open
    }

    /**
     * Returns panel position [left, top]
     * @return {array<number>}
     * @example
     * let position = mySettings.getPosition() // [0, 0]
     */
    getPosition() {
        return [this.left, this.top]
    }

    /**
     * Sets panel position
     * @param {number} left - new position on the X axis
     * @param {number} top - new position on the Y axis
     * @example
     * mySettings.setPosition(400, 400)
     */
    setPosition(left, top) {
        this.left = left
        this.top = top
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
     * Get value of specific control
     * @param {string} name - name of the control
     * @returns {(number|string)}
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
     * @param {(number|string)} name - new value
     * @returns {void}
     * @example
     * mySettings.setValue('Control name', 'value')
     */
    setValue(name, value) {
        if (name && this._controls[name] && this._controls[name].setValue) {
            return this._controls[name].setValue(value)
        }
    }

    /**
     * Get all active values
     * @returns {object} - an object with values from all currently set controls
     * @example
     * let values = mySettings.getValues()
     */
    getValues() {
        let values = {}
        for (let i in this._controls) {
            if (this._controls[i].getValue) {
                values[i] = this._controls[i].getValue()
            }
        }
        return values
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
        let base = this._createControlBasics()
        let body = this._panel.childNodes[1]
        let wrapper = this._createElement('div', {
            class: 'sms-control'
        })
        let button = this._createElement('button', {
            class: 'sms-button',
            id: base.id
        })
        base.type = 'button'
        base.name = name
        button.innerText = name
        button.value = name
        if (callback) {
            button.addEventListener('click', callback)
        }
        wrapper.appendChild(button)
        body.appendChild(wrapper)
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates text input control
     * @param {string} name - name of the control
     * @param {string} value - value of the control
     * @param {function} [callback] - function executed on each change
     * @returns {void}
     * @example
     * let textInput = mySettings.text('Text input', 'Hello world')
     */
    text(name, value, callback) {
        let body = this._panel.childNodes[1]
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createElement('label', { class: 'sms-label' })
        let input = this._createElement('input', {
            class: 'sms-text',
            id: base.id,
            type: 'text'
        })
        input.innerText = value
        input.value = value
        input.placeholder = value
        base.name = name
        base.value = value
        base.type = 'text'
        label.innerText = name
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        if (callback) {
            input.addEventListener('input', callback)
        }
        body.appendChild(wrapper)
        base.getValue = function() {
            return this.element().value
        }
        base.setValue = function(value) {
            base.value = value
            base.element().innerText = value
            base.element().value = value
        }
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates textarea control
     * @param {string} name - name of the control
     * @param {string} value - value of the control
     * @param {function} [callback] - function executed on each change
     * @returns {void}
     * @example
     * let textarea = mySettings.textarea('Text input', 'Hello world')
     */
    textarea(name, value, callback) {
        let body = this._panel.childNodes[1]
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createElement('label', { class: 'sms-label' })
        let textarea = this._createElement('textarea', {
            class: 'sms-textarea',
            id: base.id
        })
        textarea.innerText = value
        textarea.value = value
        textarea.placeholder = value
        base.name = name
        base.value = value
        base.type = 'text'
        label.innerText = name
        wrapper.appendChild(label)
        wrapper.appendChild(textarea)
        if (callback) {
            textarea.addEventListener('input', callback)
        }
        body.appendChild(wrapper)
        base.getValue = function () {
            return this.element().value
        }
        base.setValue = function (value) {
            base.value = value
            base.element().innerText = value
            base.element().value = value
        }
        this._controls[name] = base
        return this._controls[name]
    }

    /**
     * Creates range control
     * @param {string} name - name of the control
     * @param {array} items - array with min, max, default and step values
     * @param {function} callback - function executed on each change
     * @returns {void}
     * @example
     * let range = mySettings.range('Range', [1, 100, 40, 1], e => console.log(e.target.value))
     */
    range(name, items, callback) {
        let body = this._panel.childNodes[1]
        let base = this._createControlBasics()
        let wrapper = this._createElement('div', { class: 'sms-control' })
        let label = this._createElement('label', { class: 'sms-label' })
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
        input.addEventListener('input', e => {
            base.value = e.target.value
            span.innerText = base.value
            callback(e)
        })
        span.innerText = base.value
        label.value = name
        label.innerText = name
        label.appendChild(span)
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        body.appendChild(wrapper)
        base.getValue = function() {
            return parseFloat(base.element().value)
        }
        base.setValue = function(v) {
            base.value = v
            base.element().value = v
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
        base.setItems = function(items) {
            let e = base.element()
            e.min = items[0]
            e.max = items[1]
            e.value = items[2]
            e.step = items[3]
            base.value = parseFloat(e.value)
        }
        this._controls[name] = base
        return this._controls[name]
    }
}

export default SmartSettings