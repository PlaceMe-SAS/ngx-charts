"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BarVerticalComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

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

var BarVerticalComponent = /** @class */function (_super) {
    __extends(BarVerticalComponent, _super);
    function BarVerticalComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.showDataLabel = false;
        _this.activate = new _core.EventEmitter();
        _this.deactivate = new _core.EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        return _this;
    }
    BarVerticalComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
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
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
    };
    BarVerticalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        var spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
        return (0, _d3Scale.scaleBand)().rangeRound([0, this.dims.width]).paddingInner(spacing).domain(this.xDomain);
    };
    BarVerticalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        var scale = (0, _d3Scale.scaleLinear)().range([this.dims.height, 0]).domain(this.yDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalComponent.prototype.getXDomain = function () {
        return this.results.map(function (d) {
            return d.name;
        });
    };
    BarVerticalComponent.prototype.getYDomain = function () {
        var values = this.results.map(function (d) {
            return d.value;
        });
        var min = this.yScaleMin ? Math.min.apply(Math, [this.yScaleMin].concat(values)) : Math.min.apply(Math, [0].concat(values));
        var max = this.yScaleMax ? Math.max.apply(Math, [this.yScaleMax].concat(values)) : Math.max.apply(Math, values);
        return [min, max];
    };
    BarVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarVerticalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        } else {
            domain = this.yDomain;
        }
        this.colors = new _color.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        } else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalComponent.prototype.onDataLabelMaxHeightChanged = function (event) {
        var _this = this;
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        } else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (event.index === this.results.length - 1) {
            setTimeout(function () {
                return _this.update();
            });
        }
    };
    BarVerticalComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "legend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarVerticalComponent.prototype, "legendTitle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarVerticalComponent.prototype, "legendPosition", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "xAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "yAxis", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "xAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "yAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarVerticalComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarVerticalComponent.prototype, "showGridLines", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarVerticalComponent.prototype, "schemeType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarVerticalComponent.prototype, "xAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarVerticalComponent.prototype, "yAxisTicks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "barPadding", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarVerticalComponent.prototype, "roundDomains", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarVerticalComponent.prototype, "roundEdges", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], BarVerticalComponent.prototype, "yScaleMax", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], BarVerticalComponent.prototype, "yScaleMin", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarVerticalComponent.prototype, "showDataLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarVerticalComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BarVerticalComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BarVerticalComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.ContentChild)('tooltipTemplate'), __metadata("design:type", _core.TemplateRef)], BarVerticalComponent.prototype, "tooltipTemplate", void 0);
    BarVerticalComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-bar-vertical',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-vertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (select)=\"onClick($event)\"\n          (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event)\"\n          >          \n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        styleUrls: ['../common/base-chart.component.css'],
        encapsulation: _core.ViewEncapsulation.None
    })], BarVerticalComponent);
    return BarVerticalComponent;
}(_baseChart.BaseChartComponent);
exports.BarVerticalComponent = BarVerticalComponent;
//# sourceMappingURL=bar-vertical.component.js.map