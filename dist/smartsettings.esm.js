var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var SmartSettings = function () {
    function SmartSettings(name, position) {
        _classCallCheck(this, SmartSettings);

        this.name = name;
        this.position = position;
        this._panel = undefined;
    }

    _createClass(SmartSettings, [{
        key: "_create",
        value: function _create() {}
    }, {
        key: "_delete",
        value: function _delete() {
            if (this._panel !== undefined && this._panel.parentElement) {
                this._panel.parentElement.removeChild(this._panel);
            }
        }
    }]);

    return SmartSettings;
}();

export default SmartSettings;
