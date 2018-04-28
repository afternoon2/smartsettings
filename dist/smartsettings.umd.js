(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('.smartsettings/SmartSettings')) :
	typeof define === 'function' && define.amd ? define(['.smartsettings/SmartSettings'], factory) :
	(global.smartsettings = factory(global.SmartSettings));
}(this, (function (SmartSettings) { 'use strict';

SmartSettings = SmartSettings && SmartSettings.hasOwnProperty('default') ? SmartSettings['default'] : SmartSettings;



return SmartSettings;

})));
