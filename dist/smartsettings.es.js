function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

var utils = {
    createElement: function createElement(type, attributes) {
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
};

var helpers = {
    create: function create(panel, name) {
        var _panelHeaderAttrs = { 'class': 'sms-panel-header' };
        var _panelBodyAttrs = { 'class': 'sms-panel-body' };
        var _panelNameAttrs = { 'class': 'sms-panel-name' };
        if (panel.childNodes.length < 1) {
            var panelHeader = utils.createElement('div', _panelHeaderAttrs),
                panelBody = utils.createElement('div', _panelBodyAttrs),
                panelName = utils.createElement('p', _panelNameAttrs);
            panelName.innerText = name;
            panel.setAttribute('class', 'sms-panel');
            panel.setAttribute('id', 'panel-[' + name + ']');
            panel.appendChild(panelHeader);
            panel.appendChild(panelBody);
            panelHeader.appendChild(panelName);
            document.body.appendChild(panel);
        }
    },
    destroy: function destroy(panel) {
        if (panel && panel.parentElement) {
            panel.parentElement.removeChild(panel);
        }
    }
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var SmartSettings = function () {
  function SmartSettings(name, position) {
    _classCallCheck(this, SmartSettings);
    this.name = name;
    this.position = position;
    this.panel = document.createElement('div');
    helpers.create(this.panel, this.name);
  }
  _createClass(SmartSettings, [{
    key: 'destroy',
    value: function destroy() {
      return helpers.destroy(this.panel);
    }
  }]);
  return SmartSettings;
}();

export default SmartSettings;
//# sourceMappingURL=smartsettings.es.js.map
