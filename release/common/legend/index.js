'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _legend = require('./legend.component');

Object.keys(_legend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legend[key];
    }
  });
});

var _scaleLegend = require('./scale-legend.component');

Object.keys(_scaleLegend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scaleLegend[key];
    }
  });
});

var _legendEntry = require('./legend-entry.component');

Object.keys(_legendEntry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legendEntry[key];
    }
  });
});

var _advancedLegend = require('./advanced-legend.component');

Object.keys(_advancedLegend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _advancedLegend[key];
    }
  });
});