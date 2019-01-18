'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axes = require('./axes.module');

Object.keys(_axes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _axes[key];
    }
  });
});

var _axisLabel = require('./axis-label.component');

Object.keys(_axisLabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _axisLabel[key];
    }
  });
});

var _xAxis = require('./x-axis.component');

Object.keys(_xAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _xAxis[key];
    }
  });
});

var _xAxisTicks = require('./x-axis-ticks.component');

Object.keys(_xAxisTicks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _xAxisTicks[key];
    }
  });
});

var _yAxis = require('./y-axis.component');

Object.keys(_yAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _yAxis[key];
    }
  });
});

var _yAxisTicks = require('./y-axis-ticks.component');

Object.keys(_yAxisTicks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _yAxisTicks[key];
    }
  });
});

var _ticks = require('./ticks.helper');

Object.keys(_ticks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ticks[key];
    }
  });
});