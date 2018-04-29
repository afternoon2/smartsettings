// @flow
import type {
    SmartSettingsObject,
        PositionObject
} from './components/types/types'

/**
 * @class SmartSettings
 * @param {string} name - describes newly created settings panel by giving a name to it.
 * @param {Object} position - sets initial position of the settings panel.
 * @property {Node} panel - panel's parent div
 * @example
 * const mySettings = new SmartSettings('My Settings', {
 *      top: 50,
 *      left: 20
 * })
 */

class SmartSettings {

    name: string
    position: PositionObject
    panel: HTMLDivElement
    _create: () => void
    _delete: () => void

    /**
     * @param {string} name - describes newly created settings panel by giving a name to it.
     * @param {Object} position - sets initial position of the settings panel.
     * @property {Node} panel - panel's parent div
     */
    constructor(
        name: string,
        position: PositionObject
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
    }

    /**
     * Updates panel's parent div element with class and id 
     * @return {void}
     * @private
     */
    _create() {
        this.panel.setAttribute('class', 'sm-panel')
        this.panel.setAttribute('id', this.name)
    }

    /** 
     * Deletes settings panel by removing this.panel from the DOM tree.
     * @return {void}
     */
    delete() {
        if (this.panel && this.panel.parentElement) {
            this.panel.parentElement.removeChild(this.panel)
        }
    }
}

export default SmartSettings