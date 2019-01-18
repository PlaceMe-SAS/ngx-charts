"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineSeriesComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Shape = require("d3-shape");

var _id = require("../utils/id");

var _sort = require("../utils/sort");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LineSeriesComponent = /** @class */function () {
    function LineSeriesComponent() {
        this.animations = true;
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        this.updateGradients();
        var data = this.sortData(this.data.series);
        var lineGen = this.getLineGenerator();
        this.path = lineGen(data) || '';
        var areaGen = this.getAreaGenerator();
        this.areaPath = areaGen(data) || '';
        if (this.hasRange) {
            var range = this.getRangeGenerator();
            this.outerPath = range(data) || '';
        }
        if (this.hasGradient) {
            this.stroke = this.gradientUrl;
            var values = this.data.series.map(function (d) {
                return d.value;
            });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            if (max === min) {
                this.stroke = this.colors.getColor(max);
            }
        } else {
            this.stroke = this.colors.getColor(this.data.name);
        }
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return (0, _d3Shape.line)().x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            } else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            } else {
                value = _this.xScale(label);
            }
            return value;
        }).y(function (d) {
            return _this.yScale(d.value);
        }).curve(this.curve);
    };
    LineSeriesComponent.prototype.getRangeGenerator = function () {
        var _this = this;
        return (0, _d3Shape.area)().x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            } else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            } else {
                value = _this.xScale(label);
            }
            return value;
        }).y0(function (d) {
            return _this.yScale(d.min ? d.min : d.value);
        }).y1(function (d) {
            return _this.yScale(d.max ? d.max : d.value);
        }).curve(this.curve);
    };
    LineSeriesComponent.prototype.getAreaGenerator = function () {
        var _this = this;
        var xProperty = function xProperty(d) {
            var label = d.name;
            return _this.xScale(label);
        };
        return (0, _d3Shape.area)().x(xProperty).y0(function () {
            return _this.yScale.range()[0];
        }).y1(function (d) {
            return _this.yScale(d.value);
        }).curve(this.curve);
    };
    LineSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            data = (0, _sort.sortLinear)(data, 'name');
        } else if (this.scaleType === 'time') {
            data = (0, _sort.sortByTime)(data, 'name');
        } else {
            data = (0, _sort.sortByDomain)(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    };
    LineSeriesComponent.prototype.updateGradients = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            this.gradientId = 'grad' + (0, _id.id)().toString();
            this.gradientUrl = "url(#" + this.gradientId + ")";
            var values = this.data.series.map(function (d) {
                return d.value;
            });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        } else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0) return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineSeriesComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineSeriesComponent.prototype, "xScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineSeriesComponent.prototype, "yScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineSeriesComponent.prototype, "colors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineSeriesComponent.prototype, "scaleType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineSeriesComponent.prototype, "curve", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], LineSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], LineSeriesComponent.prototype, "hasRange", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], LineSeriesComponent.prototype, "animations", void 0);
    LineSeriesComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-line-series]',
        template: "\n    <svg:g>\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [animations]=\"animations\"\n      />\n      <svg:g ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"stroke\"\n        [animations]=\"animations\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n     <svg:g ngx-charts-area\n        *ngIf=\"hasRange\"\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], LineSeriesComponent);
    return LineSeriesComponent;
}();
exports.LineSeriesComponent = LineSeriesComponent;
//# sourceMappingURL=line-series.component.js.map