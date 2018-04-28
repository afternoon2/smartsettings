// @flow
import type {
    SmartSettingsObject,
        PositionObject
} from './smartsettings/types/SmartSettings.types'

/**
 * @class SmartSettings
 * 
 * @param {string} name describes newly created settings panel by giving a name to it
 * @param {PositionObject} position sets initial position of the settings panel.
 * @returns new SmartSettings instance
 * 
 * @example
 * const mySettings = new SmartSettings('My Settings', {
 *      top: 50,
 *      left: 20
 * })
 */

class SmartSettings {

    name: string
    position: PositionObject

    _panel: HTMLDivElement | void

    constructor(
        name: string,
        position: PositionObject
    ) {
        this.name = name
        this.position = position
        this._panel = undefined
    }

    _create() {

    }

    _delete() {
        if (this._panel !== undefined && this._panel.parentElement) {
            this._panel.parentElement.removeChild(this._panel)
        }
    }
}

export default SmartSettings