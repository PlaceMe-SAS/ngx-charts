"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CircleSeriesComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _label = require("../common/label.helper");

var _id = require("../utils/id");

var _color = require("../common/color.helper");

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

var CircleSeriesComponent = /** @class */function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new _core.EventEmitter();
        this.activate = new _core.EventEmitter();
        this.deactivate = new _core.EventEmitter();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        this.gradientId = 'grad' + (0, _id.id)().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circle = this.getActiveCircle();
    };
    CircleSeriesComponent.prototype.getActiveCircle = function () {
        var _this = this;
        var indexActiveDataPoint = this.data.series.findIndex(function (d) {
            var label = d.name;
            return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    };
    CircleSeriesComponent.prototype.mapDataPointToCircle = function (d, i) {
        var seriesName = this.data.name;
        var value = d.value;
        var label = d.name;
        var tooltipLabel = (0, _label.formatLabel)(label);
        var cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        } else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        } else {
            cx = this.xScale(label);
        }
        var cy = this.yScale(this.type === 'standard' ? value : d.d1);
        var radius = 5;
        var height = this.yScale.range()[0] - cy;
        var opacity = 1;
        var color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            } else {
                color = this.colors.getColor(d.d1);
            }
        } else {
            color = this.colors.getColor(seriesName);
        }
        var data = {
            series: seriesName,
            value: value,
            name: label
        };
        return {
            classNames: ["circle-data-" + i],
            value: value,
            label: label,
            data: data,
            cx: cx,
            cy: cy,
            radius: radius,
            height: height,
            tooltipLabel: tooltipLabel,
            color: color,
            opacity: opacity,
            seriesName: seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel,
            value = _a.value,
            seriesName = _a.seriesName,
            min = _a.min,
            max = _a.max;
        return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
        if (min !== undefined || max !== undefined) {
            var result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            } else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        } else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [{
            offset: 0,
            color: color,
            opacity: 0.2
        }, {
            offset: 100,
            color: color,
            opacity: 1
        }];
    };
    CircleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "type", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "xScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "yScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _color.ColorHelper)], CircleSeriesComponent.prototype, "colors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "scaleType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], CircleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _core.TemplateRef)], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CircleSeriesComponent.prototype, "deactivate", void 0);
    CircleSeriesComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-circle-series]',
        template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        animations: [(0, _animations.trigger)('animationState', [(0, _animations.transition)(':enter', [(0, _animations.style)({
            opacity: 0
        }), (0, _animations.animate)(250, (0, _animations.style)({ opacity: 1 }))])])]
    })], CircleSeriesComponent);
    return CircleSeriesComponent;
}();
exports.CircleSeriesComponent = CircleSeriesComponent;
//# sourceMappingURL=circle-series.component.js.map