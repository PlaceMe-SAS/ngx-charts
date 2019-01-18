'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeline = require('./timeline.component');

Object.keys(_timeline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timeline[key];
    }
  });
});