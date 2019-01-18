"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GaugeAxisComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Shape = require("d3-shape");

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

var GaugeAxisComponent = /** @class */function () {
    function GaugeAxisComponent() {
        this.rotate = '';
    }
    GaugeAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
    };
    GaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / this.smallSegments;
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.radius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = angleDeg * Math.PI / 180;
            var textAnchor = this.getTextAnchor(angleDeg);
            var skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                var text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor: textAnchor,
                    text: text,
                    textTransform: "\n            translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")\n          "
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    };
    GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        } else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var lineGenerator = (0, _d3Shape.line)().x(function (d) {
            return d.x;
        }).y(function (d) {
            return d.y;
        });
        return lineGenerator(points);
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "bigSegments", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "smallSegments", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "min", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "max", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], GaugeAxisComponent.prototype, "angleSpan", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], GaugeAxisComponent.prototype, "startAngle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "radius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "valueScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GaugeAxisComponent.prototype, "tickFormatting", void 0);
    GaugeAxisComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-gauge-axis]',
        template: "\n    <svg:g [attr.transform]=\"rotate\">\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:text\n                [style.textAnchor]=\"tick.textAnchor\"\n                [attr.transform]=\"tick.textTransform\"\n                alignment-baseline=\"central\">\n                {{tick.text}}\n            </svg:text>\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.small\"\n            class=\"gauge-tick gauge-tick-small\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], GaugeAxisComponent);
    return GaugeAxisComponent;
}();
exports.GaugeAxisComponent = GaugeAxisComponent;
//# sourceMappingURL=gauge-axis.component.js.map