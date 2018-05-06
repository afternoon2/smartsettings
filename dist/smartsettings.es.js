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

var css = ".sms-panel{position:absolute;width:200px;background-color:#16285a;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25)}.sms-panel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.sms-panel-header{width:100%;height:25px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.sms-panel-header:hover{cursor:pointer}.sms-panel-header-name{font-family:Roboto,sans-serif;font-size:12px;color:#fff;padding:0 10px;margin:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.sms-panel-body{padding:5px 0;background-color:#101b39;color:#fff;font-family:Roboto,sans-serif;-webkit-box-align:start;-webkit-align-items:flex-start;-moz-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.sms-control,.sms-panel-body{width:100%;height:auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.sms-control{padding:5px 10px}.sms-button{width:180px;height:25px;background-color:#101b39;border:1px solid silver;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;padding:0 10px;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;color:#fff;text-align:left}.sms-button:hover{cursor:pointer;outline:none;background-color:#102052}.sms-button:focus{cursor:pointer;outline:none;background-color:#0b1638}.sms-button:focus:hover{background-color:#102052}.sms-text,.sms-textarea{width:180px;height:25px;background-color:#fff;color:#16285a;font-size:10px;border:1px solid silver;padding:0 10px}.sms-text:hover,.sms-textarea:hover{cursor:text}.sms-text:placeholder,.sms-textarea:placeholder{font-size:10px;font-family:Roboto,sans-serif;color:silver}.sms-text:focus,.sms-textarea:focus{outline:none}.sms-textarea{padding:5px 10px;resize:none;height:100px;border:none;outline:none}.sms-textarea:hover{cursor:pointer}.sms-range{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:180px}.sms-range:focus{outline:none}.sms-range:hover{cursor:pointer}.sms-range::-webkit-slider-runnable-track,.sms-range:focus::-webkit-slider-runnable-track{background-color:#16285a;width:180px;height:15px}.sms-range::-moz-range-track{background-color:#16285a;width:180px;height:15px}.sms-range::-ms-track{background-color:#16285a;width:180px;height:15px}.sms-range::-ms-fill-lower,.sms-range:::-ms-fill-upper{background-color:#102052}.sms-range:focus::-ms-fill-lower,.sms-range:focus::-ms-fill-upper{background-color:#102052}.sms-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:15px;height:15px;background-color:#36f;-webkit-border-radius:2px;border-radius:2px}.sms-range::-moz-range-thumb{width:15px;height:15px;background-color:#36f;-moz-border-radius:2px;border-radius:2px}.sms-range::-ms-thumb{width:15px;height:15px;background-color:#36f;border-radius:2px}.sms-label-span{width:30%;text-align:right;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.sms-checkbox{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:30px;height:20px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;background-color:#1b3585}.sms-checkbox:hover{cursor:pointer}.sms-checkbox:focus{outline:none}.sms-checkbox:before{content:\"\";display:block;width:20px;height:20px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;position:relative;top:0;background-color:#fff;-webkit-box-shadow:0 1px 3px hsla(0,0%,100%,.25);-moz-box-shadow:0 1px 3px hsla(0,0%,100%,.25);box-shadow:0 1px 3px hsla(0,0%,100%,.25);-webkit-transition:all .2s ease-in-out;-o-transition:.2s all ease-in-out;-moz-transition:.2s all ease-in-out;transition:all .2s ease-in-out}.sms-checkbox:checked:before{left:12.25px;background-color:#2ea883}.sms-checkbox:not(:checked):before{background-color:#36f;left:0}.sms-checkbox:disabled{background-color:#16285a}.sms-checkbox:disabled:before{background-color:#2447b3;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.sms-file,.sms-label{font-size:10px;color:#fff}.sms-label{font-family:Roboto,sans-serif;font-weight:400;width:100%;padding-bottom:5px;line-height:10px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.hide{display:none!important}";
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
        this._globalWatcher = null;
        this._createUniqueId();
        this._create(this.name, this.initialTop, this.initialLeft);
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
                    this.text(_entry.name, _entry.value, _isCallback);
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
        key: '_create',
        value: function _create() {
            var _this = this;
            var panelAttributes = {
                class: 'sms-panel',
                id: uniqueId(),
                style: 'top: ' + this.initialTop + 'px; left: ' + this.initialLeft + 'px; z-index: 2'
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
        key: '_createSelectOption',
        value: function _createSelectOption(item) {
            var option = this._createElement('option', {
                class: 'sms-select-option',
                value: item
            });
            option.innerText = item;
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
            return [this.initialLeft, this.initialTop];
        }
    }, {
        key: 'setPosition',
        value: function setPosition(left, top) {
            this.initialLeft = left;
            this.initialTop = top;
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
            var typeCondition = this._controls[name].type === 'range' || this._controls[name].type === 'select' || this._controls[name].type === 'progressbar';
            if (this._controls[name] && typeCondition) {
                return this._controls[name].setItems(items);
            } else {
                throw new Error('Chosen control is not a range, select or progressbar type');
            }
        }
    }, {
        key: 'button',
        value: function button(name, callback) {
            var self = this;
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
            button.addEventListener('click', function (e) {
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            wrapper.appendChild(button);
            body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'text',
        value: function text(name, value, callback) {
            var self = this;
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
            input.addEventListener('input', function (e) {
                base.value = e.target.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            body.appendChild(wrapper);
            base.getValue = function () {
                return this.element().value;
            };
            base.setValue = function (value) {
                base.value = value;
                base.element().innerText = value;
                base.element().value = value;
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'textarea',
        value: function textarea(name, value, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
            var textarea = this._createElement('textarea', {
                class: 'sms-textarea',
                id: base.id
            });
            textarea.innerText = value;
            textarea.value = value;
            textarea.placeholder = value;
            base.name = name;
            base.value = value;
            base.type = 'text';
            label.innerText = name;
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
            body.appendChild(wrapper);
            base.getValue = function () {
                return this.element().value;
            };
            base.setValue = function (value) {
                base.value = value;
                base.element().innerText = value;
                base.element().value = value;
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'range',
        value: function range(name, items, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
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
            input.addEventListener('input', function (e) {
                base.value = e.target.value;
                span.innerText = base.value;
                if (callback) {
                    callback(e);
                }
                if (self._globalWatcher !== null) {
                    self._callGlobalWatcher(e);
                }
            });
            span.innerText = base.value;
            label.value = name;
            label.innerText = name;
            label.appendChild(span);
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            body.appendChild(wrapper);
            base.getValue = function () {
                return parseFloat(base.element().value);
            };
            base.setValue = function (v) {
                base.value = v;
                base.element().value = v;
            };
            base.getItems = function () {
                var e = base.element();
                return [parseFloat(e.min), parseFloat(e.max), parseFloat(e.value), parseFloat(e.step)];
            };
            base.setItems = function (items) {
                var e = base.element();
                e.min = items[0];
                e.max = items[1];
                e.value = items[2];
                e.step = items[3];
                base.value = parseFloat(e.value);
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'checkbox',
        value: function checkbox(name, value, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
            var checkbox = this._createElement('input', {
                class: 'sms-checkbox',
                id: base.id,
                type: 'checkbox'
            });
            base.name = name;
            base.type = 'checkbox';
            base.value = value;
            label.innerText = name;
            label.value = name;
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
            body.appendChild(wrapper);
            base.getValue = function () {
                return base.element().checked;
            };
            base.setValue = function (v) {
                base.element().checked = v;
                base.value = v;
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'color',
        value: function color(name, value, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
            var span = this._createElement('span', { class: 'sms-label-span' });
            var input = this._createElement('input', {
                class: 'sms-color',
                id: base.id,
                type: 'color'
            });
            base.name = name;
            base.type = 'color';
            base.value = value;
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
            label.value = name;
            label.innerText = name;
            label.appendChild(span);
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            body.appendChild(wrapper);
            base.getValue = function () {
                return base.element().value;
            };
            base.setValue = function (v) {
                base.element().value = v;
                base.value = v;
                span.innerText = v;
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'select',
        value: function select(name, items, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
            var select = this._createElement('select', {
                class: 'sms-select',
                id: base.id,
                name: name
            });
            label.innerText = name;
            label.value = name;
            wrapper.appendChild(label);
            items.map(function (item) {
                var option = self._createSelectOption(item);
                select.options.add(option);
            });
            select.value = items[0];
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
            body.appendChild(wrapper);
            base.value = items[0];
            base.name = name;
            base.type = 'select';
            base.getValue = function () {
                var _select = base.element();
                return _select.options[_select.selectedIndex].value;
            };
            base.setValue = function (v) {
                base.value = v;
                var _select = base.element();
                select.options[select.selectedIndex] = self._createSelectOption(v);
                _select.value = v;
            };
            base.getItems = function () {
                return Array.from(base.element().options).map(function (option) {
                    return option.value;
                });
            };
            base.setItems = function (items) {
                var _select = base.element();
                items.forEach(function (item) {
                    var _index = items.indexOf(item);
                    _select.options[_index] = self._createSelectOption(item);
                });
            };
            this._controls[name] = base;
            return this._controls[name];
        }
    }, {
        key: 'number',
        value: function number(name, items, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
            label.innerText = name;
            label.value = name;
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
            base.getValue = function () {
                return parseFloat(base.element().value);
            };
            base.setValue = function (v) {
                base.element().value = v;
                base.value = v;
            };
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            body.appendChild(wrapper);
            this._controls[name] = base;
            return this._controls[name] = base;
        }
    }, {
        key: 'file',
        value: function file(name, callback) {
            var self = this;
            var body = this._panel.childNodes[1];
            var base = this._createControlBasics();
            var wrapper = this._createElement('div', { class: 'sms-control' });
            var label = this._createElement('label', { class: 'sms-label' });
            var upload = this._createElement('input', {
                class: 'sms-file',
                id: base.id,
                type: 'file'
            });
            base.name = name;
            base.type = 'file';
            label.innerText = name;
            label.value = name;
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
            base.setValue = function (v) {
                base.value = v;
                base.element().files[0] = v;
            };
            body.appendChild(wrapper);
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
            var _this2 = this;
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
                    return _this2._assignEntryToMethod(entry);
                });
            }
        }
    }]);
    return SmartSettings;
}();

export default SmartSettings;
//# sourceMappingURL=smartsettings.es.js.map
