"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeatMapComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Scale = require("d3-scale");

var _baseChart = require("../common/base-chart.component");

var _viewDimensions = require("../common/view-dimensions.helper");

var _color = require("../common/color.helper");

var _domain = require("../common/domain.helper");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
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

var HeatMapComponent = /** @class */function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.innerPadding = 8;
        _this.tooltipDisabled = false;
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.scaleType = 'linear';
        return _this;
    }
    HeatMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.formatDates();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.scaleType = (0, _domain.getScaleType)(this.valueDomain, false);
        this.dims = (0, _viewDimensions.calculateViewDimensions)({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.scaleType,
            legendPosition: this.legendPosition
        });
        if (this.scaleType === 'linear') {
            var min = this.min;
            var max = this.max;
            if (!this.min) {
                min = Math.min.apply(Math, [0].concat(this.valueDomain));
            }
            if (!this.max) {
                max = Math.max.apply(Math, this.valueDomain);
            }
            this.valueDomain = [min, max];
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.rects = this.getRects();
    };
    HeatMapComponent.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        return domain;
    };
    /**
     * Converts the input to gap paddingInner in fraction
     * Supports the following inputs:
     *    Numbers: 8
     *    Strings: "8", "8px", "8%"
     *    Arrays: [8,2], "8,2", "[8,2]"
     *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
     *
     * @param {(string | number | Array<string | number>)} value
     * @param {number} [index=0]
     * @param {number} N
     * @param {number} L
     * @returns {number}
     *
     * @memberOf HeatMapComponent
     */
    HeatMapComponent.prototype.getDimension = function (value, index, N, L) {
        if (index === void 0) {
            index = 0;
        }
        if (typeof value === 'string') {
            value = value.replace('[', '').replace(']', '').replace('px', '').replace('\'', '');
            if (value.includes(',')) {
                value = value.split(',');
            }
        }
        if (Array.isArray(value) && typeof index === 'number') {
            return this.getDimension(value[index], null, N, L);
        }
        if (typeof value === 'string' && value.includes('%')) {
            return +value.replace('%', '') / 100;
        }
        return N / (L / +value + 1);
    };
    HeatMapComponent.prototype.getXScale = function () {
        var f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
        return (0, _d3Scale.scaleBand)().rangeRound([0, this.dims.width]).domain(this.xDomain).paddingInner(f);
    };
    HeatMapComponent.prototype.getYScale = function () {
        var f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
        return (0, _d3Scale.scaleBand)().rangeRound([this.dims.height, 0]).domain(this.yDomain).paddingInner(f);
    };
    HeatMapComponent.prototype.getRects = function () {
        var _this = this;
        var rects = [];
        this.xDomain.map(function (xVal) {
            _this.yDomain.map(function (yVal) {
                rects.push({
                    x: _this.xScale(xVal),
                    y: _this.yScale(yVal),
                    rx: 3,
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    };
    HeatMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    HeatMapComponent.prototype.setColors = function () {
        this.colors = new _color.ColorHelper(this.scheme, this.scaleType, this.valueDomain);
    };
    HeatMapComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: this.scaleType,
            domain: this.valueDomain,
            colors: this.scaleType === 'ordinal' ? this.colors : this.colors.scale,
            title: this.scaleType === 'ordinal' ? this.legendTitle : undefined,
            position: this.legendPosition
        };
    };
    HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "legend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], HeatMapComponent.prototype, "legendTitle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], HeatMapComponent.prototype, "legendPosition", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "xAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "yAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "showXAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "showYAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "xAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "yAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], HeatMapComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "innerPadding", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], HeatMapComponent.prototype, "xAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], HeatMapComponent.prototype, "yAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], HeatMapComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "tooltipText", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "min", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapComponent.prototype, "max", void 0);
    __decorate([(0, _core.ContentChild)('tooltipTemplate'), __metadata("design:type", _core.TemplateRef)], HeatMapComponent.prototype, "tooltipTemplate", void 0);
    HeatMapComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-heat-map',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [animations]=\"animations\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:rect *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        styleUrls: ['../common/base-chart.component.css'],
        encapsulation: _core.ViewEncapsulation.None
    })], HeatMapComponent);
    return HeatMapComponent;
}(_baseChart.BaseChartComponent);
exports.HeatMapComponent = HeatMapComponent;
//# sourceMappingURL=heat-map.component.js.map