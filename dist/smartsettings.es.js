var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var SmartSettings = function () {
  function SmartSettings(name, position) {
    _classCallCheck(this, SmartSettings);
    this.name = name;
    this.position = position;
    this.panel = document.createElement('div');
    this._create();
  }
  _createClass(SmartSettings, [{
    key: '_create',
    value: function _create() {
      if (this.panel.childNodes.length < 1) {
        this.panel.setAttribute('class', 'sms-panel');
        this.panel.setAttribute('id', this.name);
        document.body.appendChild(this.panel);
      }
    }
  }, {
    key: 'delete',
    value: function _delete() {
      if (this.panel && this.panel.parentElement) {
        this.panel.parentElement.removeChild(this.panel);
      }
    }
  }]);
  return SmartSettings;
}();

export default SmartSettings;