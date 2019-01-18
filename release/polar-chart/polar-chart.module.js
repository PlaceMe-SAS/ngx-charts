"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PolarChartModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _chartCommon = require("../common/chart-common.module");

var _polarChart = require("./polar-chart.component");

var _polarSeries = require("./polar-series.component");

var _pieChart = require("../pie-chart/");

var _lineChart = require("../line-chart/");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PolarChartModule = /** @class */function () {
    function PolarChartModule() {}
    PolarChartModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule, _pieChart.PieChartModule, _lineChart.LineChartModule],
        declarations: [_polarChart.PolarChartComponent, _polarSeries.PolarSeriesComponent],
        exports: [_polarChart.PolarChartComponent, _polarSeries.PolarSeriesComponent]
    })], PolarChartModule);
    return PolarChartModule;
}();
exports.PolarChartModule = PolarChartModule;
//# sourceMappingURL=polar-chart.module.js.map