'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gauge = require('./gauge.module');

Object.keys(_gauge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gauge[key];
    }
  });
});

var _gaugeArc = require('./gauge-arc.component');

Object.keys(_gaugeArc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gaugeArc[key];
    }
  });
});

var _gaugeAxis = require('./gauge-axis.component');

Object.keys(_gaugeAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gaugeAxis[key];
    }
  });
});

var _gauge2 = require('./gauge.component');

Object.keys(_gauge2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gauge2[key];
    }
  });
});

var _linearGauge = require('./linear-gauge.component');

Object.keys(_linearGauge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _linearGauge[key];
    }
  });
});