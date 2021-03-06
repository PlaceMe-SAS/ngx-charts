"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AreaChartModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _areaChart = require("./area-chart.component");

var _areaChartNormalized = require("./area-chart-normalized.component");

var _areaChartStacked = require("./area-chart-stacked.component");

var _areaSeries = require("./area-series.component");

var _chartCommon = require("../common/chart-common.module");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AreaChartModule = /** @class */function () {
    function AreaChartModule() {}
    AreaChartModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule],
        declarations: [_areaChart.AreaChartComponent, _areaChartNormalized.AreaChartNormalizedComponent, _areaChartStacked.AreaChartStackedComponent, _areaSeries.AreaSeriesComponent],
        exports: [_areaChart.AreaChartComponent, _areaChartNormalized.AreaChartNormalizedComponent, _areaChartStacked.AreaChartStackedComponent, _areaSeries.AreaSeriesComponent]
    })], AreaChartModule);
    return AreaChartModule;
}();
exports.AreaChartModule = AreaChartModule;
//# sourceMappingURL=area-chart.module.js.map