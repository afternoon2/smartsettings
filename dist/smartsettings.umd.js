!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.SmartSettings=t()}(this,function(){"use strict";!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&s.firstChild?s.insertBefore(a,s.firstChild):s.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}('.sms-panel{position:absolute;width:200px;background-color:#16285a;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25)}.sms-panel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.sms-panel-header{width:100%;height:25px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px rgba(0,0,0,.25);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.sms-panel-header:hover{cursor:pointer}.sms-panel-header-name{font-family:Roboto,sans-serif;font-size:12px;color:#fff;padding:0 10px;margin:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.sms-panel-body{padding:5px 0;background-color:#101b39;color:#fff;font-family:Roboto,sans-serif;-webkit-box-align:start;-webkit-align-items:flex-start;-moz-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.sms-control,.sms-panel-body{width:100%;height:auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.sms-control{padding:5px 10px}.sms-button{width:180px;height:25px;background-color:#101b39;border:1px solid silver;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;padding:0 10px;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;color:#fff;text-align:left}.sms-button:hover{cursor:pointer;outline:none;background-color:#102052}.sms-button:focus{cursor:pointer;outline:none;background-color:#0b1638}.sms-button:focus:hover{background-color:#102052}.sms-text,.sms-textarea{width:180px;height:25px;background-color:#fff;color:#16285a;font-size:10px;border:1px solid silver;padding:0 10px}.sms-text:hover,.sms-textarea:hover{cursor:text}.sms-text:placeholder,.sms-textarea:placeholder{font-size:10px;font-family:Roboto,sans-serif;color:silver}.sms-text:focus,.sms-textarea:focus{outline:none}.sms-textarea{padding:5px 10px;resize:none;height:100px;border:none;outline:none}.sms-textarea:hover{cursor:pointer}.sms-range{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:180px}.sms-range:focus{outline:none}.sms-range:hover{cursor:pointer}.sms-range::-webkit-slider-runnable-track,.sms-range:focus::-webkit-slider-runnable-track{background-color:#16285a;width:180px;height:15px}.sms-range::-moz-range-track{background-color:#16285a;width:180px;height:15px}.sms-range::-ms-track{background-color:#16285a;width:180px;height:15px}.sms-range::-ms-fill-lower,.sms-range:::-ms-fill-upper{background-color:#102052}.sms-range:focus::-ms-fill-lower,.sms-range:focus::-ms-fill-upper{background-color:#102052}.sms-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:15px;height:15px;background-color:#36f;-webkit-border-radius:2px;border-radius:2px}.sms-range::-moz-range-thumb{width:15px;height:15px;background-color:#36f;-moz-border-radius:2px;border-radius:2px}.sms-range::-ms-thumb{width:15px;height:15px;background-color:#36f;border-radius:2px}.sms-label-span{width:30%;text-align:right;font-family:Roboto,sans-serif;font-size:10px;font-weight:400;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.sms-checkbox{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:30px;height:20px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;background-color:#1b3585}.sms-checkbox:hover{cursor:pointer}.sms-checkbox:focus{outline:none}.sms-checkbox:before{content:"";display:block;width:20px;height:20px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;position:relative;top:0;background-color:#fff;-webkit-box-shadow:0 1px 3px hsla(0,0%,100%,.25);-moz-box-shadow:0 1px 3px hsla(0,0%,100%,.25);box-shadow:0 1px 3px hsla(0,0%,100%,.25);-webkit-transition:all .2s ease-in-out;-o-transition:.2s all ease-in-out;-moz-transition:.2s all ease-in-out;transition:all .2s ease-in-out}.sms-checkbox:checked:before{left:12.25px;background-color:#2ea883}.sms-checkbox:not(:checked):before{background-color:#36f;left:0}.sms-checkbox:disabled{background-color:#16285a}.sms-checkbox:disabled:before{background-color:#2447b3;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.sms-file{color:#fff}.sms-file,.sms-select{font-size:10px}.sms-color{width:100%;border:none}.sms-color::-webkit-color-swatch{border:none}.sms-color::-webkit-color-swatch-wrapper{padding:0}.sms-label{font-family:Roboto,sans-serif;font-size:10px;font-weight:400;width:100%;color:#fff;padding-bottom:5px;line-height:10px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.hide{display:none!important}');var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}();return function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"SmartSettings",s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;e(this,n),this.name=t,this.initialLeft=s,this.initialTop=a,this._hidden=!1,this._open=!0,this._draggable=!1,this._panel=null,this._controls={},this._globalWatcher=null,this._createUniqueId(),this._create(this.name,this.initialTop,this.initialLeft),this._body=this._panel?this._panel.childNodes[1]:null,this._top=this.initialTop,this._left=this.initialLeft}return t(n,[{key:"_createUniqueId",value:function(){var e=0;window.uniqueId=function(){return"sms-id-"+e++}}},{key:"_createElement",value:function(e,t){var n=document.createElement(e);if(t)for(var s in t)"class"===s?n.setAttribute("class",t[s]):n[s]=t[s];return n}},{key:"_createLabel",value:function(e){return this._createElement("label",{class:"sms-label",innerText:e,value:e})}},{key:"_callGlobalWatcher",value:function(e){this._globalWatcher&&this._globalWatcher(e)}},{key:"_assignEntryToMethod",value:function(e){var t=e.callback?e.callback:null;switch(e.type){case"button":this.button(e.name,t);break;case"range":this.range(e.name,e.items,t);break;case"select":this.select(e.name,e.items,t);break;case"text":case"textarea":this.text(e.name,e.value,t);break;case"checkbox":this.checkbox(e.name,e.value,t);break;case"number":this.number(e.name,e.items,t);break;case"color":this.color(e.name,e.value,t);break;case"file":this.file(e.name,t)}}},{key:"_dispatchEvent",value:function(e,t){var n=void 0;"button"===t&&(n="click"),"text"!==t&&"textarea"!==t&&"range"!==t&&"color"!==t&&"number"!==t||(n="input"),"checkbox"!==t&&"select"!==t&&"file"!==t||(n="change"),e.dispatchEvent(new Event(n))}},{key:"_create",value:function(){var e=this,t={class:"sms-panel",id:uniqueId(),style:"top: "+this.initialTop+"px; left: "+this.initialLeft+"px; z-index: 2"},n=this._createElement("div",t),s=this._createElement("div",{class:"sms-panel-header"}),a=this._createElement("div",{class:"sms-panel-body"}),i=this._createElement("p",{class:"sms-panel-header-name"});s.addEventListener("click",function(t){return e.toggle()}),i.innerText=this.name,s.appendChild(i),n.appendChild(s),n.appendChild(a),this._panel=n,document.body.appendChild(this._panel)}},{key:"_createControlBasics",value:function(){return{id:uniqueId(),disabled:!1,hidden:!1,value:null,name:null,type:null,element:function(){return document.getElementById(this.id)},enable:function(){this.element().removeAttribute("disabled"),this.disabled=!1},disable:function(){this.element().setAttribute("disabled",!0),this.disabled=!0},show:function(){"hide"===this.element().classList[1]&&(this.element().classList.remove("hide"),this.hidden=!1)},hide:function(){"hide"!==this.element().classList[1]&&(this.element().classList.add("hide"),this.hidden=!0)}}}},{key:"_createSelectOption",value:function(e){var t=this._createElement("option",{class:"sms-select-option",value:e});return t.innerText=e,t}},{key:"destroy",value:function(){this._panel&&this._panel.parentElement&&this._panel.parentElement.removeChild(this._panel),this._panel=null,this._controls={}}},{key:"show",value:function(e){e&&this._controls[e].show(),this._panel.classList.remove("hide"),this._hidden=!1}},{key:"hide",value:function(e){e&&this._controls[e].hide(),this._panel.classList.add("hide"),this._hidden=!0}},{key:"enable",value:function(e){if(e&&this._controls[e])return this._controls[e].enable()}},{key:"disable",value:function(e){if(e&&this._controls[e])return this._controls[e].disable()}},{key:"open",value:function(){"hide"===this._body.classList[1]&&this._body.classList.remove("hide"),this._open=!0}},{key:"close",value:function(){this._body.classList.add("hide"),this._open=!1}},{key:"toggle",value:function(){"hide"===this._body.classList[1]?this._body.classList.remove("hide"):this._body.classList.add("hide"),this._open=!this._open}},{key:"getPosition",value:function(){return[this._panel.style.left,this._panel.style.top]}},{key:"setPosition",value:function(e,t){this.initialLeft=e,this.initialTop=t,this._panel.style.left=e+"px",this._panel.style.top=t+"px"}},{key:"remove",value:function(e){if(e){var t=this._controls[e].element();t.parentElement.remove(),t.remove(),delete this._controls[e]}}},{key:"getValue",value:function(e){if(e&&this._controls[e]&&this._controls[e].getValue)return this._controls[e].getValue()}},{key:"setValue",value:function(e,t){if(e&&this._controls[e]&&this._controls[e].setValue)return this._controls[e].setValue(t)}},{key:"getActiveValues",value:function(){var e={};for(var t in this._controls)this._controls[t].getValue&&(e[t]=this._controls[t].getValue());return e}},{key:"getItems",value:function(e){var t="range"===this._controls[e].type||"select"===this._controls[e].type||"progressbar"===this._controls[e].type;if(this._controls[e]&&t)return this._controls[e].getItems();throw new Error("Chosen control is not a range, select or progressbar type")}},{key:"setItems",value:function(e,t){var n="range"===this._controls[e].type||"select"===this._controls[e].type||"progressbar"===this._controls[e].type;if(this._controls[e]&&n)return this._controls[e].setItems(t);throw new Error("Chosen control is not a range, select or progressbar type")}},{key:"button",value:function(e,t){var n=this,s=this._createControlBasics(),a=this._createElement("div",{class:"sms-control"}),i=this._createElement("button",{class:"sms-button",id:s.id,innerText:e,value:e});return s.type="button",s.name=e,i.addEventListener("click",function(e){t&&t(e),null!==n._globalWatcher&&n._callGlobalWatcher(e)}),a.appendChild(i),this._body.appendChild(a),this._controls[e]=s,this._controls[e]}},{key:"text",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("input",{class:"sms-text",id:a.id,type:"text",innerText:t,placeholder:t,value:t});return a.name=e,a.value=t,a.type="text",i.appendChild(o),i.appendChild(l),l.addEventListener("input",function(e){a.value=e.target.value,n&&n(e),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),this._body.appendChild(i),a.getValue=function(){return this.element().value},a.setValue=function(e){a.value=e,a.element().innerText=e,a.element().value=e,s._dispatchEvent(a.element(),a.type)},this._controls[e]=a,this._controls[e]}},{key:"textarea",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("textarea",{class:"sms-textarea",id:a.id,innerText:t,value:t,placeholder:t});return a.name=e,a.value=t,a.type="text",i.appendChild(o),i.appendChild(l),l.addEventListener("input",function(e){a.value=e.target.value,n&&n(e),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),a.getValue=function(){return this.element().value},a.setValue=function(e){a.value=e,a.element().innerText=e,a.element().value=e,s._dispatchEvent(a.element(),a.type)},this._body.appendChild(i),this._controls[e]=a,this._controls[e]}},{key:"range",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("span",{class:"sms-label-span"}),r=this._createElement("input",{class:"sms-range",id:a.id,type:"range",min:t[0],max:t[1],value:t[2],step:t[3]});return a.type="range",a.name=e,a.value=t[2],r.addEventListener("input",function(e){a.value=parseFloat(e.target.value),l.innerText=a.value,n&&n(e),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),l.innerText=a.value,o.appendChild(l),i.appendChild(o),i.appendChild(r),this._body.appendChild(i),a.getValue=function(){return parseFloat(a.element().value)},a.setValue=function(e){a.value=e,a.element().value=e,s._dispatchEvent(a.element(),a.type)},a.getItems=function(){var e=a.element();return[parseFloat(e.min),parseFloat(e.max),parseFloat(e.value),parseFloat(e.step)]},a.setItems=function(e){var t=a.element();t.min=e[0],t.max=e[1],t.value=e[2],t.step=e[3],a.value=parseFloat(t.value),s._dispatchEvent(a.element(),a.type)},this._controls[e]=a,this._controls[e]}},{key:"checkbox",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("input",{class:"sms-checkbox",id:a.id,type:"checkbox"});return a.name=e,a.type="checkbox",a.value=t,!0===t&&l.setAttribute("checked",!0),l.addEventListener("change",function(e){a.value=e.target.checked,n&&n(e),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),i.appendChild(o),i.appendChild(l),a.getValue=function(){return a.element().checked},a.setValue=function(e){a.element().checked=e,a.value=e,s._dispatchEvent(a.element(),a.type)},this._body.appendChild(i),this._controls[e]=a,this._controls[e]}},{key:"color",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("span",{class:"sms-label-span"}),r=this._createElement("input",{class:"sms-color",id:a.id,type:"color"});return a.name=e,a.type="color",a.value=t,r.setAttribute("value",t),r.addEventListener("input",function(e){a.value=e.target.value,l.innerText=e.target.value,n&&n(e),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),l.innerText=t,o.appendChild(l),i.appendChild(o),i.appendChild(r),a.getValue=function(){return a.element().value},a.setValue=function(e){a.element().value=e,a.value=e,l.innerText=e,s._dispatchEvent(a.element(),a.type)},this._body.appendChild(i),this._controls[e]=a,this._controls[e]}},{key:"select",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("select",{class:"sms-select",id:a.id,name:e,value:t[0]});return i.appendChild(o),t.map(function(e){var t=s._createSelectOption(e);l.options.add(t)}),l.addEventListener("change",function(e){a.value=e.target.value,n&&n(e),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),i.appendChild(l),a.value=t[0],a.name=e,a.type="select",a.getValue=function(){var e=a.element();return e.options[e.selectedIndex].value},a.setValue=function(e){a.value=e;var t=a.element();l.options[l.selectedIndex]=s._createSelectOption(e),t.value=e,s._dispatchEvent(a.element(),a.type)},a.getItems=function(){return Array.from(a.element().options).map(function(e){return e.value})},a.setItems=function(e){var t=a.element();e.forEach(function(n){var a=e.indexOf(n);t.options[a]=s._createSelectOption(n)}),s._dispatchEvent(a.element(),a.type)},this._body.appendChild(i),this._controls[e]=a,this._controls[e]}},{key:"number",value:function(e,t,n){var s=this,a=this._createControlBasics(),i=this._createElement("div",{class:"sms-control"}),o=this._createLabel(e),l=this._createElement("input",{class:"sms-number",id:a.id,type:"number",value:t[0],step:t[1]});return l.addEventListener("input",function(e){a.value=parseFloat(e.target.value),n&&n(parseFloat(e)),null!==s._globalWatcher&&s._callGlobalWatcher(e)}),a.type="number",a.name=e,a.value=t[0],a.getValue=function(){return parseFloat(a.element().value)},a.setValue=function(e){a.element().value=e,a.value=e,s._dispatchEvent(a.element(),a.type)},i.appendChild(o),i.appendChild(l),this._body.appendChild(i),this._controls[e]=a,this._controls[e]=a}},{key:"file",value:function(e,t){var n=this,s=this._createControlBasics(),a=this._createElement("div",{class:"sms-control"}),i=this._createLabel(e),o=this._createElement("input",{class:"sms-file",id:s.id,type:"file"});return s.name=e,s.type="file",o.addEventListener("change",function(e){s.value=e.target.value,t&&t(e),n._globalWatcher&&n._callGlobalWatcher(e)}),a.appendChild(i),a.appendChild(o),s.getValue=function(){return s.element().files[0]},s.setValue=function(e){s.value=e,s.element().files[0]=e,n._dispatchEvent(s.element(),s.type)},this._body.appendChild(a),this._controls[e]=s,this._controls[e]=s}},{key:"watch",value:function(e){this._globalWatcher=e}},{key:"loadConfig",value:function(e){var t=this;if(!e)throw new Error("There is no config provided");if("string"==typeof e||!Array.isArray(e))for(var n in"string"==typeof e&&(e=JSON.parse(e)),e){var s=e[n];this._assignEntryToMethod(s)}!0===Array.isArray(e)&&e.forEach(function(e){return t._assignEntryToMethod(e)})}}]),n}()});
//# sourceMappingURL=smartsettings.umd.js.map
