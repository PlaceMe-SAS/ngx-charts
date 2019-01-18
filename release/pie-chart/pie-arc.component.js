"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PieArcComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Interpolate = require("d3-interpolate");

var _d3Selection = require("d3-selection");

var _d3Shape = require("d3-shape");

var _id = require("../utils/id");

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

var PieArcComponent = /** @class */function () {
    function PieArcComponent(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new _core.EventEmitter();
        this.activate = new _core.EventEmitter();
        this.deactivate = new _core.EventEmitter();
        this.dblclick = new _core.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.getGradient = function () {
        return this.gradient ? this.gradientFill : this.fill;
    };
    PieArcComponent.prototype.getPointerEvents = function () {
        return this.pointerEvents ? 'auto' : 'none';
    };
    PieArcComponent.prototype.update = function () {
        var calc = this.calculateArc();
        this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + (0, _id.id)().toString();
        this.gradientFill = "url(#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            } else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return (0, _d3Shape.arc)().innerRadius(this.innerRadius).outerRadius(outerRadius).cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = (0, _d3Selection.select)(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node.transition().attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolater = (0, _d3Interpolate.interpolate)(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        }).transition().duration(750).attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = (0, _d3Interpolate.interpolate)(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = (0, _d3Selection.select)(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node.transition().duration(750).attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = (0, _d3Interpolate.interpolate)(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        var _this = this;
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () {
            return _this.select.emit(_this.data);
        }, 200);
    };
    PieArcComponent.prototype.onDblClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event
        });
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieArcComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], PieArcComponent.prototype, "startAngle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], PieArcComponent.prototype, "endAngle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieArcComponent.prototype, "innerRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieArcComponent.prototype, "outerRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], PieArcComponent.prototype, "cornerRadius", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieArcComponent.prototype, "value", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieArcComponent.prototype, "max", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], PieArcComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieArcComponent.prototype, "explodeSlices", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieArcComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieArcComponent.prototype, "animate", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieArcComponent.prototype, "pointerEvents", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], PieArcComponent.prototype, "isActive", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieArcComponent.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieArcComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieArcComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], PieArcComponent.prototype, "dblclick", void 0);
    PieArcComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-pie-arc]',
        template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"getGradient()\"\n        (click)=\"onClick()\"\n        (dblclick)=\"onDblClick($event)\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"getPointerEvents()\"\n      />\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], PieArcComponent);
    return PieArcComponent;
}();
exports.PieArcComponent = PieArcComponent;
//# sourceMappingURL=pie-arc.component.js.map