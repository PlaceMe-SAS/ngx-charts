"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PieChartModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _chartCommon = require("../common/chart-common.module");

var _advancedPieChart = require("./advanced-pie-chart.component");

var _pieLabel = require("./pie-label.component");

var _pieArc = require("./pie-arc.component");

var _pieChart = require("./pie-chart.component");

var _pieGrid = require("./pie-grid.component");

var _pieGridSeries = require("./pie-grid-series.component");

var _pieSeries = require("./pie-series.component");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PieChartModule = /** @class */function () {
    function PieChartModule() {}
    PieChartModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule],
        declarations: [_advancedPieChart.AdvancedPieChartComponent, _pieLabel.PieLabelComponent, _pieArc.PieArcComponent, _pieChart.PieChartComponent, _pieGrid.PieGridComponent, _pieGridSeries.PieGridSeriesComponent, _pieSeries.PieSeriesComponent],
        exports: [_advancedPieChart.AdvancedPieChartComponent, _pieLabel.PieLabelComponent, _pieArc.PieArcComponent, _pieChart.PieChartComponent, _pieGrid.PieGridComponent, _pieGridSeries.PieGridSeriesComponent, _pieSeries.PieSeriesComponent]
    })], PieChartModule);
    return PieChartModule;
}();
exports.PieChartModule = PieChartModule;
//# sourceMappingURL=pie-chart.module.js.map