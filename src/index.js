/**
 * @class SmartSettings
 * @example
 * const mySettings = new SmartSettings('My Settings', 10, 10)
 */
class SmartSettings {
    /**
     * @constructor
     * @param {string} name 
     * @param {number} left 
     * @param {number} top
     * @property {boolean} _visible
     * @property {boolean} _open
     * @property {boolean} _draggable
     * @property {Node} _panel
     * @property {array} _controls
     * @property {array} _sections
     */
    constructor(name, left, top) {
        /**
         * @type {string} name
         */
        this.name = name || 'SmartSettings'

        /**
         * @type {number} left
         */
        this.left = left || 0

        /**
         * @type {number} top
         */
        this.top = top || 0

        /**
         * @type {boolean} _visible
         * @private
         */
        this._visible = true

        /**
         * @type {boolean} _open
         * @private
         */
        this.open = true

        /**
         * @type {boolean} _draggable
         * @private
         */
        this._draggable = false

        /**
         * @type {?Node} _panel
         */
        this.panel = null

        /**
         * @type {array} _controls
         * @private
         */
        this._controls = []

        /**
         * @type {array} _sections
         * @private
         */
        this._sections = []

        this._create(this.name, this.top, this.left)

    }

    /* Utility methods */
    
    /**
     * Creates any DOM element
     * @param {string} _type - type of the DOM element
     * @param {Object} _attributes - object with all attributes for the DOM element
     * @return {Node}
     * @private 
     */
    _createElement(_type, _attributes) {
        let element = document.createElement(_type)
        if (attributes) {
            for (let key in _attributes) {
                if (key === 'class') {
                    element.classList.add.apply(
                        element.classList,
                        [_attributes[key]]
                    )
                } else {
                    element[key] = _attributes[key]
                }
            }
        }
        return element
    }

    /**
     * Creates settings panel, invoked on class construction
     * @return void
     * @private
     */
    _create() {
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
        this.panel = panel
        document.body.appendChild(this.panel)
    }
}