// 

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



    constructor(
        name,
        position
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