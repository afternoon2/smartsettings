(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('index', factory) :
	(global.index = factory());
}(this, (function () { 'use strict';

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
        var attrs = {
          'class': 'sms-panel',
          'id': this.name
        };
        var panel = this._createElement('div', attrs);
        this.panel = panel;
        document.body.appendChild(this.panel);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.panel && this.panel.parentElement) {
        this.panel.parentElement.removeChild(this.panel);
      }
    }
  }, {
    key: '_createElement',
    value: function _createElement(type, attributes) {
      var element = document.createElement(type);
      for (var key in attributes) {
        if (key === 'class') element.classList.add.apply(element.classList, [attributes[key]]);else element[key] = attributes[key];
      }
      return element;
    }
  }, {
    key: 'addSection',
    value: function addSection(name) {
      this.sections.push({
        name: name,
        controls: []
      });
    }
  }, {
    key: 'removeSection',
    value: function removeSection(name) {
      delete this.sections[name];
    }
  }, {
    key: 'button',
    value: function button(name) {
    }
  }, {
    key: 'dropdown',
    value: function dropdown(name, items, callback) {}
  }, {
    key: 'range',
    value: function range(name, items, callback) {}
  }, {
    key: 'boolean',
    value: function boolean(name, value, callback) {}
  }, {
    key: 'progressbar',
    value: function progressbar(name, items, callback) {}
  }, {
    key: 'text',
    value: function text(name, value, callback) {}
  }, {
    key: 'textarea',
    value: function textarea(name, value, callback) {}
  }, {
    key: 'html',
    value: function html(name, value, callback) {}
  }]);
  return SmartSettings;
}();

return SmartSettings;

})));
