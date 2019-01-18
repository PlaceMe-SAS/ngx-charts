"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GaugeModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _chartCommon = require("../common/chart-common.module");

var _linearGauge = require("./linear-gauge.component");

var _gauge = require("./gauge.component");

var _gaugeArc = require("./gauge-arc.component");

var _gaugeAxis = require("./gauge-axis.component");

var _pieChart = require("../pie-chart/pie-chart.module");

var _barChart = require("../bar-chart/bar-chart.module");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GaugeModule = /** @class */function () {
    function GaugeModule() {}
    GaugeModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule, _pieChart.PieChartModule, _barChart.BarChartModule],
        declarations: [_linearGauge.LinearGaugeComponent, _gauge.GaugeComponent, _gaugeArc.GaugeArcComponent, _gaugeAxis.GaugeAxisComponent],
        exports: [_linearGauge.LinearGaugeComponent, _gauge.GaugeComponent, _gaugeArc.GaugeArcComponent, _gaugeAxis.GaugeAxisComponent]
    })], GaugeModule);
    return GaugeModule;
}();
exports.GaugeModule = GaugeModule;
//# sourceMappingURL=gauge.module.js.map