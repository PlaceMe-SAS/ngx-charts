'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chart = require('./chart.component');

Object.keys(_chart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _chart[key];
    }
  });
});