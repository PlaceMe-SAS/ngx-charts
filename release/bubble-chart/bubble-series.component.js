"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BubbleSeriesComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _label = require("../common/label.helper");

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

var BubbleSeriesComponent = /** @class */function () {
    function BubbleSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new _core.EventEmitter();
        this.activate = new _core.EventEmitter();
        this.deactivate = new _core.EventEmitter();
    }
    BubbleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BubbleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    BubbleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series.map(function (d, i) {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                var y = d.y;
                var x = d.x;
                var r = d.r;
                var radius = _this.rScale(r || 1);
                var tooltipLabel = (0, _label.formatLabel)(d.name);
                var cx = _this.xScaleType === 'linear' ? _this.xScale(Number(x)) : _this.xScale(x);
                var cy = _this.yScaleType === 'linear' ? _this.yScale(Number(y)) : _this.yScale(y);
                var color = _this.colors.scaleType === 'linear' ? _this.colors.getColor(r) : _this.colors.getColor(seriesName);
                var isActive = !_this.activeEntries.length ? true : _this.isActive({ name: seriesName });
                var opacity = isActive ? 1 : 0.3;
                var data = {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                };
                return {
                    data: data,
                    x: x,
                    y: y,
                    r: r,
                    classNames: ["circle-data-" + i],
                    value: y,
                    label: x,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    isActive: isActive,
                    transform: "translate(" + cx + "," + cy + ")"
                };
            }
        }).filter(function (circle) {
            return circle !== undefined;
        });
    };
    BubbleSeriesComponent.prototype.getTooltipText = function (circle) {
        var hasRadius = typeof circle.r !== 'undefined';
        var hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        var hasSeriesName = circle.seriesName && circle.seriesName.length;
        var radiusValue = hasRadius ? (0, _label.formatLabel)(circle.r) : '';
        var xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? this.xAxisLabel + ":" : '';
        var yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? this.yAxisLabel + ":" : '';
        var x = (0, _label.formatLabel)(circle.x);
        var y = (0, _label.formatLabel)(circle.y);
        var name = hasSeriesName && hasTooltipLabel ? circle.seriesName + " \u2022 " + circle.tooltipLabel : circle.seriesName + circle.tooltipLabel;
        var tooltipTitle = hasSeriesName || hasTooltipLabel ? "<span class=\"tooltip-label\">" + name + "</span>" : '';
        return "\n      " + tooltipTitle + "\n      <span class=\"tooltip-label\">\n        <label>" + xAxisLabel + "</label> " + x + "<br />\n        <label>" + yAxisLabel + "</label> " + y + "\n      </span>\n      <span class=\"tooltip-val\">\n        " + radiusValue + "\n      </span>\n    ";
    };
    BubbleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    BubbleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    BubbleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    BubbleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.trackBy = function (index, circle) {
        return circle.data.series + " " + circle.data.name;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "xScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "yScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "rScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "xScaleType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "yScaleType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "colors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BubbleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _core.TemplateRef)], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], BubbleSeriesComponent.prototype, "deactivate", void 0);
    BubbleSeriesComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-bubble-series]',
        template: "\n    <svg:g *ngFor=\"let circle of circles; trackBy: trackBy\">\n      <svg:g [attr.transform]=\"circle.transform\">\n        <svg:g ngx-charts-circle\n          [@animationState]=\"'active'\"\n          class=\"circle\"\n          [cx]=\"0\"\n          [cy]=\"0\"\n          [r]=\"circle.radius\"\n          [fill]=\"circle.color\"\n          [style.opacity]=\"circle.opacity\"\n          [class.active]=\"circle.isActive\"\n          [pointerEvents]=\"'all'\"\n          [data]=\"circle.value\"\n          [classNames]=\"circle.classNames\"\n          (select)=\"onClick($event, circle.label)\"\n          (activate)=\"activateCircle(circle)\"\n          (deactivate)=\"deactivateCircle(circle)\"\n          ngx-tooltip\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipPlacement]=\"'top'\"\n          [tooltipType]=\"'tooltip'\"\n          [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipContext]=\"circle.data\"\n        />\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        animations: [(0, _animations.trigger)('animationState', [(0, _animations.transition)(':enter', [(0, _animations.style)({
            opacity: 0,
            transform: 'scale(0)'
        }), (0, _animations.animate)(250, (0, _animations.style)({ opacity: 1, transform: 'scale(1)' }))])])]
    })], BubbleSeriesComponent);
    return BubbleSeriesComponent;
}();
exports.BubbleSeriesComponent = BubbleSeriesComponent;
//# sourceMappingURL=bubble-series.component.js.map