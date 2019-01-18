"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BubbleChartComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _d3Scale = require("d3-scale");

var _baseChart = require("../common/base-chart.component");

var _viewDimensions = require("../common/view-dimensions.helper");

var _color = require("../common/color.helper");

var _domain = require("../common/domain.helper");

var _bubbleChart = require("./bubble-chart.utils");

var _id = require("../utils/id");

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

var BubbleChartComponent = /** @class */function (_super) {
    __extends(BubbleChartComponent, _super);
    function BubbleChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showGridLines = true;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.xAxis = true;
        _this.yAxis = true;
        _this.roundDomains = false;
        _this.maxRadius = 10;
        _this.minRadius = 3;
        _this.schemeType = 'ordinal';
        _this.tooltipDisabled = false;
        _this.activate = new _core.EventEmitter();
        _this.deactivate = new _core.EventEmitter();
        _this.scaleType = 'linear';
        _this.margin = [10, 20, 10, 20];
        _this.bubblePadding = [0, 0, 0, 0];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.activeEntries = [];
        return _this;
    }
    BubbleChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
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
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.seriesDomain = this.results.map(function (d) {
            return d.name;
        });
        this.rDomain = this.getRDomain();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.transform = "translate(" + this.dims.xOffset + "," + this.margin[0] + ")";
        var colorDomain = this.schemeType === 'ordinal' ? this.seriesDomain : this.rDomain;
        this.colors = new _color.ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);
        this.data = this.results;
        this.minRadius = Math.max(this.minRadius, 1);
        this.maxRadius = Math.max(this.maxRadius, 1);
        this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
        this.bubblePadding = [0, 0, 0, 0];
        this.setScales();
        this.bubblePadding = this.getBubblePadding();
        this.setScales();
        this.legendOptions = this.getLegendOptions();
        this.clipPathId = 'clip' + (0, _id.id)().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    BubbleChartComponent.prototype.hideCircles = function () {
        this.deactivateAll();
    };
    BubbleChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    BubbleChartComponent.prototype.getBubblePadding = function () {
        var yMin = 0;
        var xMin = 0;
        var yMax = this.dims.height;
        var xMax = this.dims.width;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var s = _a[_i];
            for (var _b = 0, _c = s.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var r = this.rScale(d.r);
                var cx = this.xScaleType === 'linear' ? this.xScale(Number(d.x)) : this.xScale(d.x);
                var cy = this.yScaleType === 'linear' ? this.yScale(Number(d.y)) : this.yScale(d.y);
                xMin = Math.max(r - cx, xMin);
                yMin = Math.max(r - cy, yMin);
                yMax = Math.max(cy + r, yMax);
                xMax = Math.max(cx + r, xMax);
            }
        }
        xMax = Math.max(xMax - this.dims.width, 0);
        yMax = Math.max(yMax - this.dims.height, 0);
        return [yMin, xMax, yMax, xMin];
    };
    BubbleChartComponent.prototype.setScales = function () {
        var width = this.dims.width;
        if (this.xScaleMin === undefined && this.xScaleMax === undefined) {
            width = width - this.bubblePadding[1];
        }
        var height = this.dims.height;
        if (this.yScaleMin === undefined && this.yScaleMax === undefined) {
            height = height - this.bubblePadding[2];
        }
        this.xScale = this.getXScale(this.xDomain, width);
        this.yScale = this.getYScale(this.yDomain, height);
    };
    BubbleChartComponent.prototype.getYScale = function (domain, height) {
        return (0, _bubbleChart.getScale)(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getXScale = function (domain, width) {
        return (0, _bubbleChart.getScale)(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getRScale = function (domain, range) {
        var scale = (0, _d3Scale.scaleLinear)().range(range).domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BubbleChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            position: this.legendPosition,
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        } else {
            opts.domain = this.rDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BubbleChartComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.x)) {
                    values.push(d.x);
                }
            }
        }
        this.xScaleType = (0, _domain.getScaleType)(values);
        return (0, _bubbleChart.getDomain)(values, this.xScaleType, this.autoScale, this.xScaleMin, this.xScaleMax);
    };
    BubbleChartComponent.prototype.getYDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.y)) {
                    values.push(d.y);
                }
            }
        }
        this.yScaleType = (0, _domain.getScaleType)(values);
        return (0, _bubbleChart.getDomain)(values, this.yScaleType, this.autoScale, this.yScaleMin, this.yScaleMax);
    };
    BubbleChartComponent.prototype.getRDomain = function () {
        var min = Infinity;
        var max = -Infinity;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var value = Number(d.r) || 1;
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
        }
        return [min, max];
    };
    BubbleChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BubbleChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BubbleChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    BubbleChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "showGridLines", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "legend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BubbleChartComponent.prototype, "legendTitle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BubbleChartComponent.prototype, "legendPosition", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "xAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "yAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BubbleChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BubbleChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BubbleChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BubbleChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "roundDomains", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "maxRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "minRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "autoScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "schemeType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "xScaleMin", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "xScaleMax", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "yScaleMin", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleChartComponent.prototype, "yScaleMax", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BubbleChartComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BubbleChartComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.ContentChild)('tooltipTemplate'), __metadata("design:type", _core.TemplateRef)], BubbleChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([(0, _core.HostListener)('mouseleave'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], BubbleChartComponent.prototype, "hideCircles", null);
    BubbleChartComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-bubble-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [activeEntries]=\"activeEntries\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"bubble-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"/>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [showGridLines]=\"showGridLines\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"/>\n        <svg:rect\n          class=\"bubble-chart-area\"\n          x=\"0\"\n          y=\"0\"\n          [attr.width]=\"dims.width\"\n          [attr.height]=\"dims.height\"\n          style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          (mouseenter)=\"deactivateAll()\"\n        />\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of data; trackBy:trackBy\" [@animationState]=\"'active'\">\n            <svg:g ngx-charts-bubble-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [rScale]=\"rScale\"\n              [xScaleType]=\"xScaleType\"\n              [yScaleType]=\"yScaleType\"\n              [xAxisLabel]=\"xAxisLabel\"\n              [yAxisLabel]=\"yAxisLabel\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styleUrls: ['../common/base-chart.component.css'],
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        encapsulation: _core.ViewEncapsulation.None,
        animations: [(0, _animations.trigger)('animationState', [(0, _animations.transition)(':leave', [(0, _animations.style)({
            opacity: 1
        }), (0, _animations.animate)(500, (0, _animations.style)({
            opacity: 0
        }))])])]
    })], BubbleChartComponent);
    return BubbleChartComponent;
}(_baseChart.BaseChartComponent);
exports.BubbleChartComponent = BubbleChartComponent;
//# sourceMappingURL=bubble-chart.component.js.map