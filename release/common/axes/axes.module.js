"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AxesModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _axisLabel = require("./axis-label.component");

var _xAxis = require("./x-axis.component");

var _xAxisTicks = require("./x-axis-ticks.component");

var _yAxis = require("./y-axis.component");

var _yAxisTicks = require("./y-axis-ticks.component");

var _common = require("@angular/common");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AxesModule = /** @class */function () {
    function AxesModule() {}
    AxesModule = __decorate([(0, _core.NgModule)({
        imports: [_common.CommonModule],
        declarations: [_axisLabel.AxisLabelComponent, _xAxis.XAxisComponent, _xAxisTicks.XAxisTicksComponent, _yAxis.YAxisComponent, _yAxisTicks.YAxisTicksComponent],
        exports: [_axisLabel.AxisLabelComponent, _xAxis.XAxisComponent, _xAxisTicks.XAxisTicksComponent, _yAxis.YAxisComponent, _yAxisTicks.YAxisTicksComponent]
    })], AxesModule);
    return AxesModule;
}();
exports.AxesModule = AxesModule;
//# sourceMappingURL=axes.module.js.map