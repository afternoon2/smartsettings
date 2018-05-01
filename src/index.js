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
         * @property {boolean} _visible
         * @private
         */
        this._visible = true

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
         * @property {array} _controls
         * @private
         */
        this._controls = []

        /**
         * @property {array} _sections
         * @private
         */
        this._sections = []

        this._create(this.name, this.top, this.left)
    }

    /* Utility methods */
    
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
                    element.classList.add.apply(
                        element.classList,
                        [attributes[key]]
                    )
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
            id: `sms_panel_${this.name}`,
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
        this._sections = []
        this._controls = []
    }

    /**
     * Shows settings panel
     * @returns {void}
     * @example
     * mySettings.show()
     */
    show() {
        this._panel.classList.remove('hide')
        this._visible = true
    }

    /**
     * Hides settings panel
     * @returns {void}
     * @example
     * mySettings.hide()
     */
    hide() {
        this._panel.classList.add('hide')
        this._visible = false
    }

}

export default SmartSettings