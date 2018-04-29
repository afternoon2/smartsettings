/**
 * @class SmartSettings
 * @example
 * const mySettings = new SmartSettings('My Settings', {
 *      top: 50,
 *      left: 20
 * })
 */

class SmartSettings {
    /**
     * @param {string} name - describes newly created settings panel by giving a name to it.
     * @param {Object} position - sets initial position of the settings panel.
     * @property {Node} panel - panel's parent div
     */
    constructor(
        name,
        position
    ) {
        /**
         * @type {string}
         */
        this.name = name

        /**
         * @type {string}
         */
        this.position = position

        /**
         * @type {Node}
         */
        this.panel = document.createElement('div')
        this._create()
    }

    /**
     * Mounts panel in the DOM, immediately called after class instantiation
     * @return {void}
     * @private
     */
    _create() {
        if (this.panel.childNodes.length < 1) {
            let attrs = {
                'class': 'sms-panel',
                'id': this.name
            }
            let panel = this._createElement('div', attrs)
            this.panel = panel
            document.body.appendChild(this.panel)
        }
    }

    /** 
     * Unmounts settings panel from the DOM
     * @return {void}
     */
    destroy() {
        if (this.panel && this.panel.parentElement) {
            this.panel.parentElement.removeChild(this.panel)
        }
    }

    /**
     * Creates
     * @param {string} type - type of HTML element 
     * @param {Object} attributes - attributes of HTML element
     * @return {Node}
     */
    _createElement(type, attributes) {
        let element = document.createElement(type)
        for (let key in attributes) {
            if (key === 'class')
                element.classList.add.apply(
                    element.classList,
                    [attributes[key]]
                ) 
            else
                element[key] = attributes[key]
        }
        return element
    }

}

export default SmartSettings