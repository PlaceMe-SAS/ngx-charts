"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BarHorizontalStackedComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _d3Scale = require("d3-scale");

var _viewDimensions = require("../common/view-dimensions.helper");

var _color = require("../common/color.helper");

var _baseChart = require("../common/base-chart.component");

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

var BarHorizontalStackedComponent = /** @class */function (_super) {
    __extends(BarHorizontalStackedComponent, _super);
    function BarHorizontalStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.showDataLabel = false;
        _this.activate = new _core.EventEmitter();
        _this.deactivate = new _core.EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        return _this;
    }
    BarHorizontalStackedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
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
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
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
    BarHorizontalStackedComponent.prototype.getValueDomain = function () {
        var domain = [];
        var smallest = 0;
        var biggest = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var smallestSum = 0;
            var biggestSum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (d.value < 0) {
                    smallestSum += d.value;
                } else {
                    biggestSum += d.value;
                }
                smallest = d.value < smallest ? d.value : smallest;
                biggest = d.value > biggest ? d.value : biggest;
            }
            domain.push(smallestSum);
            domain.push(biggestSum);
        }
        domain.push(smallest);
        domain.push(biggest);
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = this.xScaleMax ? Math.max.apply(Math, [this.xScaleMax].concat(domain)) : Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontalStackedComponent.prototype.getYScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return (0, _d3Scale.scaleBand)().rangeRound([0, this.dims.height]).paddingInner(spacing).domain(this.groupDomain);
    };
    BarHorizontalStackedComponent.prototype.getXScale = function () {
        var scale = (0, _d3Scale.scaleLinear)().range([0, this.dims.width]).domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        } else {
            domain = this.valueDomain;
        }
        this.colors = new _color.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        } else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.onDataLabelMaxWidthChanged = function (event, groupIndex) {
        var _this = this;
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        } else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () {
                return _this.update();
            });
        }
    };
    BarHorizontalStackedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalStackedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "legend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarHorizontalStackedComponent.prototype, "legendTitle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarHorizontalStackedComponent.prototype, "legendPosition", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "xAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "yAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarHorizontalStackedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarHorizontalStackedComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarHorizontalStackedComponent.prototype, "showGridLines", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarHorizontalStackedComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarHorizontalStackedComponent.prototype, "schemeType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarHorizontalStackedComponent.prototype, "xAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarHorizontalStackedComponent.prototype, "yAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "barPadding", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarHorizontalStackedComponent.prototype, "roundDomains", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], BarHorizontalStackedComponent.prototype, "xScaleMax", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarHorizontalStackedComponent.prototype, "showDataLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarHorizontalStackedComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BarHorizontalStackedComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BarHorizontalStackedComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.ContentChild)('tooltipTemplate'), __metadata("design:type", _core.TemplateRef)], BarHorizontalStackedComponent.prototype, "tooltipTemplate", void 0);
    BarHorizontalStackedComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-bar-horizontal-stacked',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [activeEntries]=\"activeEntries\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        styleUrls: ['../common/base-chart.component.css'],
        encapsulation: _core.ViewEncapsulation.None,
        animations: [(0, _animations.trigger)('animationState', [(0, _animations.transition)(':leave', [(0, _animations.style)({
            opacity: 1,
            transform: '*'
        }), (0, _animations.animate)(500, (0, _animations.style)({ opacity: 0, transform: 'scale(0)' }))])])]
    })], BarHorizontalStackedComponent);
    return BarHorizontalStackedComponent;
}(_baseChart.BaseChartComponent);
exports.BarHorizontalStackedComponent = BarHorizontalStackedComponent;
//# sourceMappingURL=bar-horizontal-stacked.component.js.map