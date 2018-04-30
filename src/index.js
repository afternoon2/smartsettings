import helpers from './components/helpers'

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

    /**
     * Adds new section to the panel
     * @param {string} name - name of the section
     * @return {void}
     * @example
     * const newSection = mySettings.addSection('New section')
     */
    addSection(name) {
        this.sections.push({
            name: name,
            controls: []
        })
    }

    /**
     * Removes section from the panel
     * @param {string} name - name of the section
     * @return {void}
     * @example
     * mySettings.removeSection('New section')
     */
    removeSection(name) {
        delete this.sections[name]
    }

    /**
     * Creates button control
     * @param {string} name - name of the button (displayed in it)
     * @param {function} [callback] - callback invoked after button click
     * @return {void}
     * @example
     * mySettings.button('Execute', executionHadler)
     */
    button(name, callback = null) {

    }

    /**
     * Creates dropdown control
     * @param {string} name - dropdown name
     * @param {string[]|number[]|function} items - list of values to display in the dropdown options list or a function that returns these values
     * @param {function} [callback] - callback invoked after every change
     */
    dropdown(name, items, callback) {

    }

    /**
     * Creates range control
     * @param {string} name - range name
     * @param {number[]|function} items - list of range values (min, max, step, default) or a function that returns them
     * @param {function} [callback] - callback invoked after every change
     */
    range(name, items, callback) {

    }

    /**
     * Creates checkbox control
     * @param {string} name - checkbox name
     * @param {boolean} value - checkbox default value
     * @param {function} [callback] - callback invoked after every change
     */
    boolean(name, value, callback) {

    }

    /**
     * Creates progress bar control
     * @param {string} name - progress bar name
     * @param {Array<any>} items - list of progress bar values (current value, max value, display value)
     * @param {function} [callback] -  callback invoked after every change
     */
    progressbar(name, items, callback) {

    }

    /**
     * Creates text input control
     * @param {string} name - text input control name
     * @param {string} value - default text to display
     * @param {function} [callback] -  callback invoked after every change
     */
    text(name, value, callback) {

    }

    
    /**
     * Creates textarea control
     * @param {string} name - text input control name
     * @param {string} value - default text to display
     * @param {function} [callback] -  callback invoked after every change
     */
    textarea(name, value, callback) {

    }

    
    /**
     * Creates custom html content control
     * @param {string} name - control name
     * @param {string} value - default content to display
     * @param {function} [callback] -  callback invoked after every change
     */
    html(name, value, callback) {

    }



}

export default SmartSettings