"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NgxChartsModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require("./polyfills");

var _core = require("@angular/core");

var _chartCommon = require("./common/chart-common.module");

var _areaChart = require("./area-chart/area-chart.module");

var _barChart = require("./bar-chart/bar-chart.module");

var _bubbleChart = require("./bubble-chart/bubble-chart.module");

var _forceDirectedGraph = require("./force-directed-graph/force-directed-graph.module");

var _heatMap = require("./heat-map/heat-map.module");

var _lineChart = require("./line-chart/line-chart.module");

var _polarChart = require("./polar-chart/polar-chart.module");

var _numberCard = require("./number-card/number-card.module");

var _pieChart = require("./pie-chart/pie-chart.module");

var _treeMap = require("./tree-map/tree-map.module");

var _gauge = require("./gauge/gauge.module");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NgxChartsModule = /** @class */function () {
    function NgxChartsModule() {}
    NgxChartsModule = __decorate([(0, _core.NgModule)({
        exports: [_chartCommon.ChartCommonModule, _areaChart.AreaChartModule, _barChart.BarChartModule, _bubbleChart.BubbleChartModule, _forceDirectedGraph.ForceDirectedGraphModule, _heatMap.HeatMapModule, _lineChart.LineChartModule, _polarChart.PolarChartModule, _numberCard.NumberCardModule, _pieChart.PieChartModule, _treeMap.TreeMapModule, _gauge.GaugeModule]
    })], NgxChartsModule);
    return NgxChartsModule;
}();
exports.NgxChartsModule = NgxChartsModule;
//# sourceMappingURL=ngx-charts.module.js.map