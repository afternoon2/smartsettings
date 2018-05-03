(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SmartSettings = factory());
}(this, (function () { 'use strict';

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

  var css = ".sms-panel{position:absolute;width:200px;background-color:#16285a;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25)}.sms-panel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.sms-panel-header{width:100%;height:25px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.sms-panel-header:hover{cursor:pointer}.sms-panel-header-name{font-family:Roboto,sans-serif;font-size:12px;color:#fff;padding:0 10px;margin:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.sms-panel-body{padding:5px 0;background-color:#101b39;color:#fff;font-family:Roboto,sans-serif;-webkit-box-align:start;-webkit-align-items:flex-start;-moz-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.sms-control,.sms-panel-body{width:100%;height:auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.sms-control{padding:5px 10px}.sms-button{width:180px;height:25px;background-color:#101b39;border:1px solid silver;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;padding:0 10px;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;color:#fff;text-align:left}.sms-button:hover{cursor:pointer;outline:none;background-color:#102052}.sms-button:focus{cursor:pointer;outline:none;background-color:#0b1638}.sms-button:focus:hover{background-color:#102052}.sms-text{width:180px;height:25px;background-color:#fff;color:#16285a;font-size:10px;border:1px solid silver;padding:0 10px}.sms-text:placeholder{font-size:10px;font-family:Roboto,sans-serif;color:silver}.sms-text:focus{outline:none}.sms-label{font-family:Roboto,sans-serif;font-size:10px;font-weight:400;width:100%;color:#fff;padding-bottom:5px;line-height:10px}.hide{display:none!important}";
  styleInject(css);

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var SmartSettings = function () {
      function SmartSettings() {
          var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SmartSettings';
          var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          classCallCheck(this, SmartSettings);
          this.name = name;
          this.left = left;
          this.top = top;
          this._hidden = false;
          this._open = true;
          this._draggable = false;
          this._panel = null;
          this._controls = {};
          this._createUniqueId();
          this._create(this.name, this.top, this.left);
      }
      createClass(SmartSettings, [{
          key: '_createUniqueId',
          value: function _createUniqueId() {
              var counter = 0;
              window.uniqueId = function () {
                  return 'sms-id-' + counter++;
              };
          }
      }, {
          key: '_createElement',
          value: function _createElement(type, attributes) {
              var element = document.createElement(type);
              if (attributes) {
                  for (var key in attributes) {
                      if (key === 'class') {
                          element.setAttribute('class', attributes[key]);
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
              var _this = this;
              var panelAttributes = {
                  class: 'sms-panel',
                  id: uniqueId(),
                  style: 'top: ' + this.top + 'px; left: ' + this.left + 'px; z-index: 2'
              };
              var panel = this._createElement('div', panelAttributes);
              var header = this._createElement('div', { class: 'sms-panel-header' });
              var body = this._createElement('div', { class: 'sms-panel-body' });
              var paragraph = this._createElement('p', { class: 'sms-panel-header-name' });
              header.addEventListener('click', function (e) {
                  return _this.toggle();
              });
              paragraph.innerText = this.name;
              header.appendChild(paragraph);
              panel.appendChild(header);
              panel.appendChild(body);
              this._panel = panel;
              document.body.appendChild(this._panel);
          }
      }, {
          key: '_createControlBasics',
          value: function _createControlBasics() {
              var id = uniqueId();
              var basics = {
                  id: id,
                  disabled: false,
                  hidden: false,
                  value: null,
                  name: null,
                  type: null,
                  element: function element() {
                      return document.getElementById(this.id);
                  },
                  enable: function enable() {
                      this.element().removeAttribute('disabled');
                      this.disabled = false;
                  },
                  disable: function disable() {
                      this.element().setAttribute('disabled', true);
                      this.disabled = true;
                  },
                  show: function show() {
                      if (this.element().classList[1] === 'hide') {
                          this.element().classList.remove('hide');
                          this.hidden = false;
                      }
                  },
                  hide: function hide() {
                      if (this.element().classList[1] !== 'hide') {
                          this.element().classList.add('hide');
                          this.hidden = true;
                      }
                  }
              };
              return basics;
          }
      }, {
          key: 'destroy',
          value: function destroy() {
              if (this._panel && this._panel.parentElement) {
                  this._panel.parentElement.removeChild(this._panel);
              }
              this._panel = null;
              this._controls = {};
          }
      }, {
          key: 'show',
          value: function show(name) {
              if (name) {
                  this._controls[name].show();
              }
              this._panel.classList.remove('hide');
              this._hidden = false;
          }
      }, {
          key: 'hide',
          value: function hide(name) {
              if (name) {
                  this._controls[name].hide();
              }
              this._panel.classList.add('hide');
              this._hidden = true;
          }
      }, {
          key: 'open',
          value: function open() {
              var panelBody = this._panel.childNodes[1];
              if (panelBody.classList[1] === 'hide') {
                  panelBody.classList.remove('hide');
              }
              this._open = true;
          }
      }, {
          key: 'close',
          value: function close() {
              var panelBody = this._panel.childNodes[1];
              panelBody.classList.add('hide');
              this._open = false;
          }
      }, {
          key: 'toggle',
          value: function toggle() {
              var panelBody = this._panel.childNodes[1];
              panelBody.classList[1] === 'hide' ? panelBody.classList.remove('hide') : panelBody.classList.add('hide');
              this._open = !this._open;
          }
      }, {
          key: 'getPosition',
          value: function getPosition() {
              return [this.left, this.top];
          }
      }, {
          key: 'setPosition',
          value: function setPosition(left, top) {
              this.left = left;
              this.top = top;
          }
      }, {
          key: 'remove',
          value: function remove(name) {
              if (name) {
                  var elem = this._controls[name].element();
                  elem.parentElement.remove();
                  elem.remove();
                  delete this._controls[name];
              }
          }
      }, {
          key: 'getValue',
          value: function getValue(name) {
              if (name && this._controls[name] && this._controls[name].getValue) {
                  return this._controls[name].getValue();
              }
          }
      }, {
          key: 'setValue',
          value: function setValue(name, value) {
              if (name && this._controls[name] && this._controls[name].setValue) {
                  return this._controls[name].setValue(value);
              }
          }
      }, {
          key: 'getValues',
          value: function getValues() {
              var values = {};
              for (var i in this._controls) {
                  if (this._controls[i].getValue) {
                      values[i] = this._controls[i].getValue();
                  }
              }
              return values;
          }
      }, {
          key: 'setName',
          value: function setName(oldName, newName) {
              var method = Object.getOwnPropertyDescriptor(this._controls, oldName);
              this._controls[newName] = method.value;
              var newControl = this._controls[newName];
              newControl.name = newName;
              if (newControl.type === 'button') {
                  newControl.value = newName;
                  newControl.element().value = newName;
                  newControl.element().innerText = newName;
              } else {
                  var parent = this._controls[oldName].element().parentElement;
                  var label = parent.childNodes[0];
                  label.innerText = newName;
                  label.value = newName;
              }
              delete this._controls[oldName];
          }
      }, {
          key: 'button',
          value: function button(name, callback) {
              var base = this._createControlBasics();
              var body = this._panel.childNodes[1];
              var wrapper = this._createElement('div', {
                  class: 'sms-control'
              });
              var button = this._createElement('button', {
                  class: 'sms-button',
                  id: base.id
              });
              base.type = 'button';
              base.name = name;
              button.innerText = name;
              button.value = name;
              if (callback) {
                  button.addEventListener('click', callback);
              }
              wrapper.appendChild(button);
              body.appendChild(wrapper);
              this._controls[name] = base;
              return this._controls[name];
          }
      }, {
          key: 'text',
          value: function text(name, value, callback) {
              var body = this._panel.childNodes[1];
              var base = this._createControlBasics();
              var wrapper = this._createElement('div', { class: 'sms-control' });
              var label = this._createElement('label', { class: 'sms-label' });
              var input = this._createElement('input', {
                  class: 'sms-text',
                  id: base.id,
                  type: 'text'
              });
              input.innerText = value;
              input.value = value;
              input.placeholder = value;
              base.name = name;
              base.value = value;
              base.type = 'text';
              label.innerText = name;
              wrapper.appendChild(label);
              wrapper.appendChild(input);
              if (callback) {
                  input.addEventListener('input', callback);
              }
              body.appendChild(wrapper);
              base.getValue = function () {
                  return this.element().innerText;
              };
              base.setValue = function (value) {
                  base.value = value;
                  base.element().innerText = value;
                  base.element().value = value;
              };
              this._controls[name] = base;
              return this._controls[name];
          }
      }]);
      return SmartSettings;
  }();

  return SmartSettings;

})));
//# sourceMappingURL=smartsettings.umd.js.map
