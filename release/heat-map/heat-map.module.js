"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeatMapModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _chartCommon = require("../common/chart-common.module");

var _heatMapCell = require("./heat-map-cell.component");

var _heatMapCellSeries = require("./heat-map-cell-series.component");

var _heatMap = require("./heat-map.component");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HeatMapModule = /** @class */function () {
    function HeatMapModule() {}
    HeatMapModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule],
        declarations: [_heatMapCell.HeatMapCellComponent, _heatMapCellSeries.HeatCellSeriesComponent, _heatMap.HeatMapComponent],
        exports: [_heatMapCell.HeatMapCellComponent, _heatMapCellSeries.HeatCellSeriesComponent, _heatMap.HeatMapComponent]
    })], HeatMapModule);
    return HeatMapModule;
}();
exports.HeatMapModule = HeatMapModule;
//# sourceMappingURL=heat-map.module.js.map