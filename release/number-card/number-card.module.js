"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NumberCardModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _chartCommon = require("../common/chart-common.module");

var _card = require("./card.component");

var _cardSeries = require("./card-series.component");

var _numberCard = require("./number-card.component");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NumberCardModule = /** @class */function () {
    function NumberCardModule() {}
    NumberCardModule = __decorate([(0, _core.NgModule)({
        imports: [_chartCommon.ChartCommonModule],
        declarations: [_card.CardComponent, _cardSeries.CardSeriesComponent, _numberCard.NumberCardComponent],
        exports: [_card.CardComponent, _cardSeries.CardSeriesComponent, _numberCard.NumberCardComponent]
    })], NumberCardModule);
    return NumberCardModule;
}();
exports.NumberCardModule = NumberCardModule;
//# sourceMappingURL=number-card.module.js.map