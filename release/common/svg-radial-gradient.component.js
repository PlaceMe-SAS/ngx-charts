"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SvgRadialGradientComponent = undefined;

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

var SvgRadialGradientComponent = /** @class */function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
        get: function get() {
            return this.stopsInput || this.stopsDefault;
        },
        set: function set(value) {
            this.stopsInput = value;
        },
        enumerable: true,
        configurable: true
    });
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = '30%';
        if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
            this.stopsDefault = [{
                offset: 0,
                color: this.color,
                opacity: this.startOpacity
            }, {
                offset: 100,
                color: this.color,
                opacity: this.endOpacity
            }];
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], SvgRadialGradientComponent.prototype, "color", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], SvgRadialGradientComponent.prototype, "name", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], SvgRadialGradientComponent.prototype, "cx", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], SvgRadialGradientComponent.prototype, "cy", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], SvgRadialGradientComponent.prototype, "stops", null);
    SvgRadialGradientComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-svg-radial-gradient]',
        template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], SvgRadialGradientComponent);
    return SvgRadialGradientComponent;
}();
exports.SvgRadialGradientComponent = SvgRadialGradientComponent;
//# sourceMappingURL=svg-radial-gradient.component.js.map