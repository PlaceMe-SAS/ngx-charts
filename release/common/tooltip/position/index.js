'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _placement = require('./placement.type');

Object.keys(_placement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _placement[key];
    }
  });
});

var _position = require('./position');

Object.keys(_position).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _position[key];
    }
  });
});