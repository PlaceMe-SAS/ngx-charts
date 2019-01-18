"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PieLabelComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Shape = require("d3-shape");

var _trimLabel = require("../common/trim-label.helper");

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

var PieLabelComponent = /** @class */function () {
    function PieLabelComponent() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = _trimLabel.trimLabel;
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = (0, _d3Shape.arc)().innerRadius(startRadius).outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
    };
    Object.defineProperty(PieLabelComponent.prototype, "textX", {
        get: function get() {
            return this.data.pos[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textY", {
        get: function get() {
            return this.data.pos[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
        get: function get() {
            return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
        get: function get() {
            return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
        get: function get() {
            return this.isIE || !this.animations ? null : 'transform 0.75s';
        },
        enumerable: true,
        configurable: true
    });
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "radius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "label", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "color", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "max", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "value", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieLabelComponent.prototype, "explodeSlices", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieLabelComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieLabelComponent.prototype, "labelTrim", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], PieLabelComponent.prototype, "labelTrimSize", void 0);
    PieLabelComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-pie-label]',
        template: "\n    <title>{{label}}</title>\n    <svg:g\n      [attr.transform]=\"attrTransform\"\n      [style.transform]=\"styleTransform\"\n      [style.transition]=\"textTransition\">\n      <svg:text\n        class=\"pie-label\"\n        [class.animation]=\"animations\"\n        dy=\".35em\"\n        [style.textAnchor]=\"textAnchor()\"\n        [style.shapeRendering]=\"'crispEdges'\">\n        {{labelTrim ? trimLabel(label, labelTrimSize) : label}}\n      </svg:text>\n    </svg:g>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"pie-label-line line\"\n      [class.animation]=\"animations\">\n    </svg:path>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [])], PieLabelComponent);
    return PieLabelComponent;
}();
exports.PieLabelComponent = PieLabelComponent;
//# sourceMappingURL=pie-label.component.js.map