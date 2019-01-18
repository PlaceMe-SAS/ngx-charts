'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forceDirectedGraph = require('./force-directed-graph.module');

Object.keys(_forceDirectedGraph).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _forceDirectedGraph[key];
    }
  });
});

var _forceDirectedGraph2 = require('./force-directed-graph.component');

Object.keys(_forceDirectedGraph2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _forceDirectedGraph2[key];
    }
  });
});