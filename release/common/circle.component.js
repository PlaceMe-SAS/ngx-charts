"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CircleComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

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

var CircleComponent = /** @class */function () {
    function CircleComponent() {
        this.select = new _core.EventEmitter();
        this.activate = new _core.EventEmitter();
        this.deactivate = new _core.EventEmitter();
    }
    CircleComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CircleComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    CircleComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    CircleComponent.prototype.ngOnChanges = function (changes) {
        this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
        this.classNames += 'circle';
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "cx", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "cy", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "r", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "stroke", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "classNames", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "circleOpacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CircleComponent.prototype, "pointerEvents", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CircleComponent.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CircleComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CircleComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.HostListener)('click'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], CircleComponent.prototype, "onClick", null);
    __decorate([(0, _core.HostListener)('mouseenter'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], CircleComponent.prototype, "onMouseEnter", null);
    __decorate([(0, _core.HostListener)('mouseleave'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], CircleComponent.prototype, "onMouseLeave", null);
    CircleComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-circle]',
        template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], CircleComponent);
    return CircleComponent;
}();
exports.CircleComponent = CircleComponent;
//# sourceMappingURL=circle.component.js.map