(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

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

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    var SmartSettings = function () {
      function SmartSettings(name, left, top) {
        _classCallCheck(this, SmartSettings);
        this.name = name || 'SmartSettings';
        this.left = left || 0;
        this.top = top || 0;
        this._visible = true;
        this.open = true;
        this._draggable = false;
        this.panel = null;
        this._controls = [];
        this._sections = [];
        this._create(this.name, this.top, this.left);
      }
      _createClass(SmartSettings, [{
        key: '_createElement',
        value: function _createElement(_type, _attributes) {
          var element = document.createElement(_type);
          if (attributes) {
            for (var key in _attributes) {
              if (key === 'class') {
                element.classList.add.apply(element.classList, [_attributes[key]]);
              } else {
                element[key] = _attributes[key];
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
            id: 'sms_panel_' + name,
            style: 'top: ' + top + 'px; left: ' + left + 'px; z-index: 2'
          };
          var panel = this._createElement('div', panelAttributes);
          var header = this._createElement('div', { class: 'sms-panel-header' });
          var body = this._createElement('div', { class: 'sms-panel-body' });
          var paragraph = this._createElement('p', { class: 'sms-panel-header-name' });
          paragraph.innerText = name;
          header.appendChild(paragraph);
          panel.appendChild(header);
          panel.appendChild(body);
          this.panel = panel;
          document.body.appendChild(this.panel);
        }
      }]);
      return SmartSettings;
    }();

})));
//# sourceMappingURL=smartsettings.umd.js.map
