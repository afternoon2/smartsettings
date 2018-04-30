import utils from './utils'

/**
 * Contains all private methods used by SmartSettings class
 * @type {Object}
 * @property {function} create - Mounts panel in the DOM, immediately called after SmartSettings class instantiation
 * @property {function} destroy - Unmounts settings panel from the DOM
 * @private
 */
const helpers = {
    create: (panel, name) => {
        let _panelHeaderAttrs = { 'class': 'sms-panel-header' }
        let _panelBodyAttrs = { 'class': 'sms-panel-body' }
        let _panelNameAttrs = { 'class': 'sms-panel-name' }
        if (panel.childNodes.length < 1) {
            let panelHeader = utils.createElement('div', _panelHeaderAttrs),
                panelBody = utils.createElement('div', _panelBodyAttrs),
                panelName = utils.createElement('p', _panelNameAttrs)
            panelName.innerText = name
            panel.setAttribute('class', 'sms-panel')
            panel.setAttribute('id', `panel-[${name}]`)
            panel.appendChild(panelHeader)
            panel.appendChild(panelBody)
            panelHeader.appendChild(panelName)
            document.body.appendChild(panel)
        }
    },

    destroy: (panel) => {
        if (panel && panel.parentElement) {
            panel.parentElement.removeChild(panel)
        }
    }
}

export default helpers