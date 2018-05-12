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

var css = ".sms-panel{position:absolute;width:200px;background-color:#16285a;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25)}.sms-panel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.sms-panel-header{width:100%;height:25px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.sms-panel-header:hover{cursor:pointer}.sms-panel-header-name{font-family:Roboto,sans-serif;font-size:12px;color:#fff;padding:0 10px;margin:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.sms-panel-body{padding:5px 0;background-color:#101b39;color:#fff;font-family:Roboto,sans-serif;-webkit-box-align:start;-webkit-align-items:flex-start;-moz-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.sms-control,.sms-panel-body{width:100%;height:auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.sms-control{padding:5px 10px}.sms-button{width:180px;height:25px;background-color:#101b39;border:1px solid silver;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;padding:0 10px;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;color:#fff;text-align:left}.sms-button:hover{cursor:pointer;outline:none;background-color:#102052}.sms-button:focus{cursor:pointer;outline:none;background-color:#0b1638}.sms-button:focus:hover{background-color:#102052}.sms-text,.sms-textarea{width:180px;height:25px;background-color:#fff;color:#16285a;font-size:10px;border:1px solid silver;padding:0 10px}.sms-text:hover,.sms-textarea:hover{cursor:text}.sms-text:placeholder,.sms-textarea:placeholder{font-size:10px;font-family:Roboto,sans-serif;color:silver}.sms-text:focus,.sms-textarea:focus{outline:none}.sms-textarea{padding:5px 10px;resize:none;height:100px;border:none;outline:none}.sms-textarea:hover{cursor:pointer}.sms-range{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:180px}.sms-range:focus{outline:none}.sms-range:hover{cursor:pointer}.sms-range::-webkit-slider-runnable-track,.sms-range:focus::-webkit-slider-runnable-track{background-color:#16285a;width:180px;height:15px}.sms-range::-moz-range-track{background-color:#16285a;width:180px;height:15px}.sms-range::-ms-track{background-color:#16285a;width:180px;height:15px}.sms-range::-ms-fill-lower,.sms-range:::-ms-fill-upper{background-color:#102052}.sms-range:focus::-ms-fill-lower,.sms-range:focus::-ms-fill-upper{background-color:#102052}.sms-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:15px;height:15px;background-color:#36f;-webkit-border-radius:2px;border-radius:2px}.sms-range::-moz-range-thumb{width:15px;height:15px;background-color:#36f;-moz-border-radius:2px;border-radius:2px}.sms-range::-ms-thumb{width:15px;height:15px;background-color:#36f;border-radius:2px}.sms-label-span{width:30%;text-align:right;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.sms-checkbox{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:30px;height:20px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;background-color:#1b3585}.sms-checkbox:hover{cursor:pointer}.sms-checkbox:focus{outline:none}.sms-checkbox:before{content:\"\";display:block;width:20px;height:20px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;position:relative;top:0;background-color:#fff;-webkit-box-shadow:0 1px 3px hsla(0,0%,100%,.25);-moz-box-shadow:0 1px 3px hsla(0,0%,100%,.25);box-shadow:0 1px 3px hsla(0,0%,100%,.25);-webkit-transition:all .2s ease-in-out;-o-transition:.2s all ease-in-out;-moz-transition:.2s all ease-in-out;transition:all .2s ease-in-out}.sms-checkbox:checked:before{left:12.25px;background-color:#2ea883}.sms-checkbox:not(:checked):before{background-color:#36f;left:0}.sms-checkbox:disabled{background-color:#16285a}.sms-checkbox:disabled:before{background-color:#2447b3;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.sms-file{color:#fff}.sms-file,.sms-select{font-size:10px}.sms-color{width:100%;border:none}.sms-color::-webkit-color-swatch{border:none}.sms-color::-webkit-color-swatch-wrapper{padding:0}.sms-label{font-family:Roboto,sans-serif;font-size:10px;font-weight:400;width:100%;color:#fff;padding-bottom:5px;line-height:10px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.hide{display:none!important}";
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
        this.initialLeft = left;
        this.initialTop = top;
        this._hidden = false;
        this._open = true;
        this._draggable = false;
        this._panel = null;
        this._controls = {};
        this._localString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this._globalWatcher = null;
        this._createUniqueId();
        this._create(this.name, this.initialTop, this.initialLeft);
        this._body = this._panel ? this._panel.childNodes[1] : null;
    }
    createClass(SmartSettings, [{
        key: '_createUniqueId',
        value: function _createUniqueId() {
            var _this = this;
            var counter = 0;
            this.uniqueID = function () {
                return _this._localString + '-' + counter++;
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
        key: '_createLabel',
        value: function _createLabel(name) {
            return this._createElement('label', {
                class: 'sms-label',
                innerText: name,
                value: name
            });
        }
    }, {
        key: '_callGlobalWatcher',
        value: function _callGlobalWatcher(e) {
            if (this._globalWatcher) {
                this._globalWatcher(e);
            }
        }
    }, {
        key: '_assignEntryToMethod',
        value: function _assignEntryToMethod(_entry) {
            var _isCallback = _entry.callback ? _entry.callback : null;
            switch (_entry.type) {
                case 'button':
                    this.button(_entry.name, _isCallback);
                    break;
                case 'range':
                    this.range(_entry.name, _entry.items, _isCallback);
                    break;
                case 'select':
                    this.select(_entry.name, _entry.items, _isCallback);
                    break;
                case 'text':
                    this.text(_entry.name, _entry.value, _isCallback);
                    break;
                case 'textarea':
                    this.textarea(_entry.name, _entry.value, _isCallback);
                    break;
                case 'checkbox':
                    this.checkbox(_entry.name, _entry.value, _isCallback);
                    break;
                case 'number':
                    this.number(_entry.name, _entry.items, _isCallback);
                    break;
                case 'color':
                    this.color(_entry.name, _entry.value, _isCallback);
                    break;
                case 'file':
                    this.file(_entry.name, _isCallback);
            }
        }
    }, {
        key: '_dispatchEvent',
        value: function _dispatchEvent(element, type) {
            var _eventType = void 0;
            if (type === 'button') {
                _eventType = 'click';
            }
            if (type === 'text' || type === 'textarea' || type === 'range' || type === 'color' || type === 'number') {
                _eventType = 'input';
            }
            if (type === 'checkbox' || type === 'select' || type === 'file') {
                _eventType = 'change';
            }
            element.dispatchEvent(new Event(_eventType));
        }
    }, {
        key: '_create',
        value: function _create() {
            var _this2 = this;
            var panelAttributes = {
                class: 'sms-panel',
                id: this.uniqueID(),
                style: 'top: ' + this.initialTop + 'px; left: ' + this.initialLeft + 'px; z-index: 2'
            };
            var panel = this._createElement('div', panelAttributes);
            var header = this._createElement('div', { class: 'sms-panel-header' });
            var body = this._createElement('div', { class: 'sms-panel-body' });
            var paragraph = this._createElement('p', { class: 'sms-panel-header-name' });
            header.addEventListener('click', function (e) {
                return _this2.toggle();
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
            var id = this.uniqueID();
            var basics = {
                id: id,
                disabled: false,
                hidden: false,
                value: null,
                name: null,
                type: null,
                callback: null,
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
                    if (this.element().parentNode.classList[1] === 'hide') {
                        this.element().parentNode.classList.remove('hide');
                        this.hidden = false;
                    }
                },
                hide: function hide() {
                    if (this.element().parentNode.classList[1] !== 'hide') {
                        this.element().parentNode.classList.add('hide');
                        this.hidden = true;
                    }
                }
            };
            return basics;
        }
    }, {
        key: '_createSelectOption',
        value: function _createSelectOption(item, selected) {
            var option = this._createElement('option', {
                class: 'sms-select-option',
                value: item,
                innerText: item,
                selected: selected ? selected : false
            });
            return option;
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
            } else {
                this._panel.classList.remove('hide');
                this._hidden = false;
            }
        }
    }, {
        key: 'hide',
        value: function hide(name) {
            if (name) {
                this._controls[name].hide();
            } else {
                this._panel.classList.add('hide');
                this._hidden = true;
            }
        }
    }, {
        key: 'enable',
        value: function enable(name) {
            if (name && this._controls[name]) {
                return this._controls[name].enable();
            }
        }
    }, {
        key: 'disable',
        value: function disable(name) {
            if (name && this._controls[name]) {
                return this._controls[name].disable();
            }
        }
    }, {
        key: 'open',
        value: function open() {
            if (this._body.classList[1] === 'hide') {
                this._body.classList.remove('hide');
            }
            this._open = true;
        }
    }, {
        key: 'close',
        value: function close() {
            this._body.classList.add('hide');
            this._open = false;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this._body.classList[1] === 'hide' ? this._body.classList.remove('hide') : this._body.classList.add('hide');
            this._open = !this._open;
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return [this._panel.style.left, this._panel.style.top];
        }
    }, {
        key: 'setPosition',
        value: function setPosition(left, top) {
            this._panel.style.left = left + 'px';
            this._panel.style.top = top + 'px';
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
        key: 'removeAll',
        value: function removeAll() {
            for (var key in this._controls) {
                delete this._controls[key];
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
            var syntheticEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var _control = this._controls[name];
            if (name && _control && _control.setValue) {
                return _control.setValue(value, syntheticEvent);
            }
        }
    }, {
        key: 'getActiveValues',
        value: function getActiveValues() {
            var values = {};
            for (var i in this._controls) {
                if (this._controls[i].getValue) {
                    values[i] = this._controls[i].getValue();
                }
            }
            return values;
        }
    }, {
        key: 'getIndex',
        value: function getIndex(name) {
            if (name && this._controls[name].getIndex) {
                return this._controls[name].getIndex();
            }
        }
    }, {
        key: 'setIndex',
        value: function setIndex(name, index) {
            var syntheticEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            if (name && this._controls[name].setIndex) {
                return this._controls[name].setIndex(index, syntheticEvent);
            }
        }
    }, {
        key: 'getItems',
        value: function getItems(name) {
            var typeCondition = this._controls[name].type === 'range' || this._controls[name].type === 'select' || this._controls[name].type === 'progressbar';
            if (this._controls[name] && typeCondition) {
                return this._controls[name].getItems();
            } else {
                throw new Error('Chosen control is not a range, select or progressbar type');
            }
        }
    }, {
        key: 'setItems',
        value: function setItems(name, items) {
            var syntheticEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var typeCondition = this._controls[name].type === 'range' || this._controls[name].type === 'select' || this._controls[name].type === 'progressbar';
            if (this._controls[name] && typeCondition) {
                return this._controls[name].setItems(items, syntheticEvent);
            } else {
                throw new Error('Chosen control is not a range, select or progressbar type');
            }
        }
    }, {
        key: 'button',
        value: function button(name, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', {
                class: 'sms-control'
            });
            var button = this._createElement('button', {
                class: 'sms-button',
                id: base.id,
                innerText: name,
                value: name
            });
            base.type = 'button';
            base.name = name;
            base.callback = callback || null;
            button.addEventListener('click', function (e) {
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            wrapper.appendChild(button);
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'text',
        value: function text(name, value, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var input = this._createElement('input', {
                class: 'sms-text',
                id: base.id,
                type: 'text',
                innerText: value,
                placeholder: value,
                value: value
            });
            base.name = name;
            base.value = value;
            base.type = 'text';
            base.callback = callback || null;
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            input.addEventListener('input', function (e) {
                base.value = e.target.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            this._body.appendChild(wrapper);
            base.getValue = function () {
                return this.element().value;
            };
            base.setValue = function (value, syntheticEvent) {
                base.value = value;
                base.element().innerText = value;
                base.element().value = value;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'textarea',
        value: function textarea(name, value, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var textarea = this._createElement('textarea', {
                class: 'sms-textarea',
                id: base.id,
                innerText: value,
                value: value,
                placeholder: value
            });
            base.name = name;
            base.value = value;
            base.type = 'textarea';
            base.callback = callback || null;
            wrapper.appendChild(label);
            wrapper.appendChild(textarea);
            textarea.addEventListener('input', function (e) {
                base.value = e.target.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            base.getValue = function () {
                return this.element().value;
            };
            base.setValue = function (value, syntheticEvent) {
                base.value = value;
                base.element().innerText = value;
                base.element().value = value;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'range',
        value: function range(name, items, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var span = this._createElement('span', { class: 'sms-label-span' });
            var input = this._createElement('input', {
                class: 'sms-range',
                id: base.id,
                type: 'range',
                min: items[0],
                max: items[1],
                value: items[2],
                step: items[3]
            });
            base.type = 'range';
            base.name = name;
            base.value = items[2];
            base.callback = callback || null;
            input.addEventListener('input', function (e) {
                base.value = parseFloat(e.target.value);
                span.innerText = base.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            span.innerText = base.value;
            label.appendChild(span);
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            this._body.appendChild(wrapper);
            base.getValue = function () {
                return parseFloat(base.element().value);
            };
            base.setValue = function (v, syntheticEvent) {
                base.value = v;
                base.element().value = v;
                span.innerText = v;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            base.getItems = function () {
                var e = base.element();
                return [parseFloat(e.min), parseFloat(e.max), parseFloat(e.value), parseFloat(e.step)];
            };
            base.setItems = function (items, syntheticEvent) {
                var e = base.element();
                e.min = items[0];
                e.max = items[1];
                e.value = items[2];
                e.step = items[3];
                base.value = parseFloat(e.value);
                span.innerText = parseFloat(e.value);
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'checkbox',
        value: function checkbox(name, value, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var checkbox = this._createElement('input', {
                class: 'sms-checkbox',
                id: base.id,
                type: 'checkbox'
            });
            base.name = name;
            base.type = 'checkbox';
            base.value = value;
            base.callback = callback || null;
            if (value === true) {
                checkbox.setAttribute('checked', true);
            }
            checkbox.addEventListener('change', function (e) {
                base.value = e.target.checked;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            wrapper.appendChild(label);
            wrapper.appendChild(checkbox);
            base.getValue = function () {
                return base.element().checked;
            };
            base.setValue = function (v, syntheticEvent) {
                base.element().checked = v;
                base.value = v;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'color',
        value: function color(name, value, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var span = this._createElement('span', { class: 'sms-label-span' });
            var input = this._createElement('input', {
                class: 'sms-color',
                id: base.id,
                type: 'color'
            });
            base.name = name;
            base.type = 'color';
            base.value = value;
            base.callback = callback || null;
            input.setAttribute('value', value);
            input.addEventListener('input', function (e) {
                base.value = e.target.value;
                span.innerText = e.target.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            span.innerText = value;
            label.appendChild(span);
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            base.getValue = function () {
                return base.element().value;
            };
            base.setValue = function (v, syntheticEvent) {
                base.element().value = v;
                base.value = v;
                span.innerText = v;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'select',
        value: function select(name, items, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var select = this._createElement('select', {
                class: 'sms-select',
                id: base.id,
                name: name,
                value: items[0]
            });
            wrapper.appendChild(label);
            items.map(function (item) {
                var option = self._createSelectOption(item);
                select.options.add(option);
            });
            select.addEventListener('change', function (e) {
                base.value = e.target.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            wrapper.appendChild(select);
            base.value = items[0];
            base.name = name;
            base.type = 'select';
            base.callback = callback || null;
            base.getValue = function () {
                var _select = base.element();
                return _select.options[_select.selectedIndex].value;
            };
            base.setValue = function (v, syntheticEvent) {
                base.value = v;
                var _select = base.element();
                select.options[select.selectedIndex] = self._createSelectOption(v);
                _select.value = v;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            base.getItems = function () {
                return Array.from(base.element().options).map(function (option) {
                    return option.value;
                });
            };
            base.setItems = function (items, syntheticEvent) {
                var _current = {
                    selected: base.element().selectedIndex,
                    length: base.getItems().length
                };
                var _new = {
                    selected: -1,
                    length: items.length
                };
                if (_new.length > _current.length) {
                    if (_current.selected === -1 || _current.selected === '') {
                        _new.selected = 0;
                    }
                    if (_current.selected > -1) {
                        _new.selected = _new.length - 1;
                    }
                }
                if (_new.length < _current.length) {
                    if (_current.selected > -1 && _current.selected < _new.length) {
                        _new.selected = _current.selected;
                    }
                    if (_current.selected > _new.length - 1) {
                        _new.selected = _new.length - 1;
                    }
                }
                for (var i = 0; i < base.element().options.length; i++) {
                    base.element().options[i].remove();
                }
                items.forEach(function (item) {
                    var _index = items.indexOf(item);
                    base.element().options[_index] = self._createSelectOption(item, _index = _new.selected ? true : false);
                });
                base.value = items[_new.selected];
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            base.getIndex = function () {
                return parseInt(base.element().selectedIndex);
            };
            base.setIndex = function (value, syntheticEvent) {
                base.element().selectedIndex = value;
                base.value = base.element().options[value].value;
                if (syntheticEvent === true) {
                    self.dispatchEvent(base.element(), base.type);
                }
            };
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'number',
        value: function number(name, items, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var input = this._createElement('input', {
                class: 'sms-number',
                id: base.id,
                type: 'number',
                value: items[0],
                step: items[1]
            });
            input.addEventListener('input', function (e) {
                base.value = parseFloat(e.target.value);
                if (callback) {
                    callback(parseFloat(e));
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            base.type = 'number';
            base.name = name;
            base.value = items[0];
            base.callback = callback || null;
            base.getValue = function () {
                return parseFloat(base.element().value);
            };
            base.setValue = function (v, syntheticEvent) {
                base.element().value = v;
                base.value = v;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name] = base;
        }
    }, {
        key: 'file',
        value: function file(name, callback) {
            var self = this;
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createLabel(name);
            var upload = this._createElement('input', {
                class: 'sms-file',
                id: base.id,
                type: 'file'
            });
            base.name = name;
            base.type = 'file';
            base.callback = callback || null;
            upload.addEventListener('change', function (e) {
                base.value = e.target.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher) {
                    self._callGlobalWatcher(e);
                }
            });
            wrapper.appendChild(label);
            wrapper.appendChild(upload);
            base.getValue = function () {
                return base.element().files[0];
            };
            base.setValue = function (v, syntheticEvent) {
                base.value = v;
                base.element().files[0] = v;
                if (syntheticEvent === true) self._dispatchEvent(base.element(), base.type);
            };
            this._body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name] = base;
        }
    }, {
        key: 'watch',
        value: function watch(callback) {
            this._globalWatcher = callback;
        }
    }, {
        key: 'loadConfig',
        value: function loadConfig(config) {
            var _this3 = this;
            if (!config) {
                throw new Error('There is no config provided');
            }
            if (typeof config === 'string' || !Array.isArray(config)) {
                if (typeof config === 'string') {
                    config = JSON.parse(config);
                }
                for (var key in config) {
                    var _entry = config[key];
                    this._assignEntryToMethod(_entry);
                }
            }
            if (Array.isArray(config) === true) {
                config.forEach(function (entry) {
                    return _this3._assignEntryToMethod(entry);
                });
            }
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            var output = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'object';
            var _obj = {};
            var decide = function decide(ctrl) {
                if (ctrl.type === 'select' || ctrl.type === 'range' || ctrl.type === 'number') {
                    return {
                        items: ctrl.getItems()
                    };
                } else {
                    return {
                        value: ctrl.getValue()
                    };
                }
            };
            for (var key in this._controls) {
                var _control = this._controls[key];
                if (_control.type === 'button') {
                    _obj[key] = {
                        type: _control.type,
                        name: _control.name
                    };
                    if (_control.callback !== null) {
                        _obj[key].callback = _control.callback;
                    }
                } else {
                    var itemsOrValue = decide(_control);
                    _obj[key] = Object.assign({
                        type: _control.type,
                        name: _control.name
                    }, itemsOrValue);
                    if (_control.callback !== null) {
                        _obj[key].callback = _control.callback;
                    }
                }
            }
            if (!output || output === 'object') {
                return _obj;
            }
            if (output === 'array') {
                return Object.values(_obj);
            }
            if (output === 'string') {
                return JSON.stringify(_obj, null, 4);
            }
        }
    }]);
    return SmartSettings;
}();

export default SmartSettings;
//# sourceMappingURL=smartsettings.es.js.map
