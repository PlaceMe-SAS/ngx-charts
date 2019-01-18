"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PieSeriesComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Array = require("d3-array");

var _d3Shape = require("d3-shape");

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

var PieSeriesComponent = /** @class */function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new _core.EventEmitter();
        this.activate = new _core.EventEmitter();
        this.deactivate = new _core.EventEmitter();
        this.dblclick = new _core.EventEmitter();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pieGenerator = (0, _d3Shape.pie)().value(function (d) {
            return d.value;
        }).sort(null);
        var arcData = pieGenerator(this.series);
        this.max = (0, _d3Array.max)(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return (0, _d3Shape.arc)().innerRadius(this.outerRadius * factor).outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var factor = 1.5;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    };
    PieSeriesComponent.prototype.getTooltipTitle = function (a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    };
    PieSeriesComponent.prototype.labelText = function (myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    };
    PieSeriesComponent.prototype.label = function (myArc) {
        return (0, _label.formatLabel)(myArc.data.name);
    };
    PieSeriesComponent.prototype.defaultTooltipText = function (myArc) {
        var label = this.label(myArc);
        var val = (0, _label.formatLabel)(myArc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (myArc) {
        return this.colors.getColor(this.label(myArc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries) return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "colors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "series", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "dims", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "explodeSlices", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "showLabels", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieSeriesComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], PieSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieSeriesComponent.prototype, "trimLabels", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], PieSeriesComponent.prototype, "maxLabelLength", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Function)], PieSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", _core.TemplateRef)], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieSeriesComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieSeriesComponent.prototype, "dblclick", void 0);
    PieSeriesComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-pie-series]',
        template: "\n    <svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n      <svg:g ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"labelText(arc)\"\n        [labelTrim]=\"trimLabels\"\n        [labelTrimSize]=\"maxLabelLength\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\"\n        [animations]=\"animations\">\n      </svg:g>\n      <svg:g\n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        [animate]=\"animations\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        (dblclick)=\"dblclick.emit($event)\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"getTooltipTitle(arc)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"arc.data\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], PieSeriesComponent);
    return PieSeriesComponent;
}();
exports.PieSeriesComponent = PieSeriesComponent;
//# sourceMappingURL=pie-series.component.js.map