import utils from './utils'

/**
 * Contains all private methods used by SmartSettings class
 * @type {Object}
 * @property {function} create - Mounts panel in the DOM, immediately called after SmartSettings class instantiation
 * @property {function} destroy - Unmounts settings panel from the DOM
 * @private
 */
const helpers = {
    /**
     * Mounts panel in the DOM, immediately called after SmartSettings class instantiation
     * @param {Node} panel - empty div element
     * @param {name} string - name of the panel set by the class instantiation
     * @return {void}
     * @private
     */
    create: (panel, name) => {
        if (panel.childNodes.length < 1) {
            let attrs = {
                'class': 'sms-panel',
                'id': name
            }
            panel = utils.createElement('div', attrs)
            document.body.appendChild(panel)
        }
    },

    /** 
     * Unmounts settings panel from the DOM
     * @param {Node} panel - SmartSettings' this.panel
     * @return {void}
     * @example
     * mySettings.destroy()
     */
    destroy: (panel) => {
        if (panel && panel.parentElement) {
            panel.parentElement.removeChild(panel)
        }
    }
}

export default helpers