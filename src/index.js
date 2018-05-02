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
                if (this.element().classList[2] === 'hide') {
                    this.element().classList.remove('hide')
                    this.hidden = false
                }
            },
            hide: function() {
                if (this.element().classList[2] !== 'hide') {
                    this.element().classList.add('hide')
                    this.hidden = true
                }
            },
            remove: function() {
                delete self._controls[name]
                this.element().remove()
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
     * Shows settings panel
     * @returns {void}
     * @example
     * mySettings.show()
     */
    show() {
        this._panel.classList.remove('hide')
        this._hidden = false
    }

    /**
     * Hides settings panel
     * @returns {void}
     * @example
     * mySettings.hide()
     */
    hide() {
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
     * Creates button control
     * @param {string} name - name of the control 
     * @param {function} callback - function executed on each change
     */
    button(name, callback) {
        let body = this._panel.childNodes[1]
        let base = this._createControlBasics()
        let element = this._createElement('button', { 
            class: 'sms-control sms-button', 
            id: base.id 
        })

        element.innerText = name
        element.addEventListener('click', callback)

        base.getValue = function() {
            return base.element().innerText
        }
        
        body.appendChild(element)
        this._controls[name] = base
        return this._controls[name]
    }
}

export default SmartSettings