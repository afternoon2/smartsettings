function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".sms-panel{position:absolute;width:200px;background-color:#16285a;padding:0 10px}.sms-panel * *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.sms-panel-header{width:100%;height:25px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-moz-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.sms-panel-header:hover{cursor:pointer}.sms-panel-header-name{font-family:Roboto,sans-serif;font-size:12px;font-weight:500;color:#fff;padding:0 10px;margin:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}";
styleInject(css);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var SmartSettings = function () {
    function SmartSettings() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SmartSettings';
        var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        _classCallCheck(this, SmartSettings);
        this.name = name;
        this.left = left;
        this.top = top;
        this._visible = true;
        this._open = true;
        this._draggable = false;
        this._panel = null;
        this._controls = [];
        this._sections = [];
        this._create(this.name, this.top, this.left);
    }
    _createClass(SmartSettings, [{
        key: '_createElement',
        value: function _createElement(type, attributes) {
            var element = document.createElement(type);
            if (attributes) {
                for (var key in attributes) {
                    if (key === 'class') {
                        element.classList.add.apply(element.classList, [attributes[key]]);
                    } else {
                        element[key] = attributes[key];
                    }
                }
            }
            return element;
        }
    }, {
        key: '_create',
        value: function _create() {
            var panelAttributes = {
                class: 'sms-panel',
                id: 'sms_panel_' + this.name,
                style: 'top: ' + this.top + 'px; left: ' + this.left + 'px; z-index: 2'
            };
            var panel = this._createElement('div', panelAttributes);
            var header = this._createElement('div', { class: 'sms-panel-header' });
            var body = this._createElement('div', { class: 'sms-panel-body' });
            var paragraph = this._createElement('p', { class: 'sms-panel-header-name' });
            paragraph.innerText = this.name;
            header.appendChild(paragraph);
            panel.appendChild(header);
            panel.appendChild(body);
            this._panel = panel;
            document.body.appendChild(this._panel);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this._panel && this._panel.parentElement) {
                this._panel.parentElement.removeChild(this._panel);
            }
            this._panel = null;
            this._sections = [];
            this._controls = [];
        }
    }]);
    return SmartSettings;
}();

export default SmartSettings;
//# sourceMappingURL=smartsettings.es.js.map
