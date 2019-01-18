"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BarChartModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _chartCommon = require("../common/chart-common.module");

var _bar = require("./bar.component");

var _barHorizontal = require("./bar-horizontal.component");

var _barHorizontal2d = require("./bar-horizontal-2d.component");

var _barHorizontalNormalized = require("./bar-horizontal-normalized.component");

var _barHorizontalStacked = require("./bar-horizontal-stacked.component");

var _barVertical = require("./bar-vertical.component");

var _barVertical2d = require("./bar-vertical-2d.component");

var _barVerticalNormalized = require("./bar-vertical-normalized.component");

var _barVerticalStacked = require("./bar-vertical-stacked.component");

var _seriesHorizontal = require("./series-horizontal.component");

var _seriesVertical = require("./series-vertical.component");

var _barLabel = require("./bar-label.component");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BarChartModule = /** @class */function () {
    function BarChartModule() {}
    BarChartModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule],
        declarations: [_bar.BarComponent, _barHorizontal.BarHorizontalComponent, _barHorizontal2d.BarHorizontal2DComponent, _barHorizontalNormalized.BarHorizontalNormalizedComponent, _barHorizontalStacked.BarHorizontalStackedComponent, _barVertical.BarVerticalComponent, _barVertical2d.BarVertical2DComponent, _barVerticalNormalized.BarVerticalNormalizedComponent, _barVerticalStacked.BarVerticalStackedComponent, _barLabel.BarLabelComponent, _seriesHorizontal.SeriesHorizontal, _seriesVertical.SeriesVerticalComponent],
        exports: [_bar.BarComponent, _barHorizontal.BarHorizontalComponent, _barHorizontal2d.BarHorizontal2DComponent, _barHorizontalNormalized.BarHorizontalNormalizedComponent, _barHorizontalStacked.BarHorizontalStackedComponent, _barVertical.BarVerticalComponent, _barVertical2d.BarVertical2DComponent, _barVerticalNormalized.BarVerticalNormalizedComponent, _barVerticalStacked.BarVerticalStackedComponent, _barLabel.BarLabelComponent, _seriesHorizontal.SeriesHorizontal, _seriesVertical.SeriesVerticalComponent]
    })], BarChartModule);
    return BarChartModule;
}();
exports.BarChartModule = BarChartModule;
//# sourceMappingURL=bar-chart.module.js.map