// @flow
import type {
    SmartSettingsObject,
    PositionObject
} from './smartsettings/types/SmartSettings.types'

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