"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChartCommonModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _common = require("@angular/common");

var _chart = require("./charts/chart.component");

var _legend = require("./legend");

var _baseChart = require("./base-chart.component");

var _axes = require("./axes/axes.module");

var _tooltip = require("./tooltip");

var _circleSeries = require("./circle-series.component");

var _circle = require("./circle.component");

var _gridPanel = require("./grid-panel.component");

var _gridPanelSeries = require("./grid-panel-series.component");

var _svgLinearGradient = require("./svg-linear-gradient.component");

var _svgRadialGradient = require("./svg-radial-gradient.component");

var _timeline = require("./timeline");

var _area = require("./area.component");

var _tooltipArea = require("./tooltip-area.component");

var _count = require("./count");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var COMPONENTS = [_area.AreaComponent, _baseChart.BaseChartComponent, _count.CountUpDirective, _tooltipArea.TooltipArea, _chart.ChartComponent, _legend.LegendComponent, _legend.LegendEntryComponent, _legend.ScaleLegendComponent, _circle.CircleComponent, _circleSeries.CircleSeriesComponent, _gridPanel.GridPanelComponent, _gridPanelSeries.GridPanelSeriesComponent, _svgLinearGradient.SvgLinearGradientComponent, _svgRadialGradient.SvgRadialGradientComponent, _timeline.Timeline, _legend.AdvancedLegendComponent];
var ChartCommonModule = /** @class */function () {
    function ChartCommonModule() {}
    ChartCommonModule = __decorate([(0, _core.NgModule)({
        providers: [_common.Location, {
            provide: _common.LocationStrategy,
            useClass: _common.PathLocationStrategy
        }],
        imports: [_common.CommonModule, _axes.AxesModule, _tooltip.TooltipModule],
        declarations: COMPONENTS.slice(),
        exports: [_common.CommonModule, _axes.AxesModule, _tooltip.TooltipModule].concat(COMPONENTS)
    })], ChartCommonModule);
    return ChartCommonModule;
}();
exports.ChartCommonModule = ChartCommonModule;
//# sourceMappingURL=chart-common.module.js.map