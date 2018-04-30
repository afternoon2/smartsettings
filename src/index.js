import helpers from './components/helpers'

/**
 * @class SmartSettings
 * @example
 * const mySettings = new SmartSettings('My Settings', {
 *      top: 50,
 *      left: 20
 * })
 */

export default class SmartSettings {
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
        helpers.create(this.panel, this.name)
    }

    /** 
     * Unmounts settings panel from the DOM
     * @return {void}
     * @example
     * mySettings.destroy()
     */
    destroy() {
        return helpers.destroy(this.panel)
    }

}