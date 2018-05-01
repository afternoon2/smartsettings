import style from './index.css'

/**
 * @class SmartSettings
 * @classdesc SmartSettings module, returns new SmartSettings instance
 * @param {string} name
 * @param {number} left
 * @param {number} top
 * @property {boolean} _visible
 * @property {boolean} _open
 * @property {boolean} _draggable
 * @property {Node} _panel
 * @property {array} _controls
 * @property {array} _sections
 * @example
 * const mySettings = new SmartSettings('My Settings', 10, 10)
*/
class SmartSettings {
    constructor(name = 'SmartSettings', left = 0, top = 0) {
        this.name = name
        this.left = left
        this.top = top
        this._visible = true
        this._open = true
        this._draggable = false
        this.panel = null
        this._controls = []
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
        this.panel = panel
        document.body.appendChild(this.panel)
    }
}

export default SmartSettings