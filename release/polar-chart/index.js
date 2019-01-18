'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _polarChart = require('./polar-chart.module');

Object.keys(_polarChart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _polarChart[key];
    }
  });
});

var _polarChart2 = require('./polar-chart.component');

Object.keys(_polarChart2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _polarChart2[key];
    }
  });
});

var _polarSeries = require('./polar-series.component');

Object.keys(_polarSeries).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _polarSeries[key];
    }
  });
});