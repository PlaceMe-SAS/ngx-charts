"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SvgLinearGradientComponent = undefined;

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

var SvgLinearGradientComponent = /** @class */function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
    }
    SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        } else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], SvgLinearGradientComponent.prototype, "orientation", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], SvgLinearGradientComponent.prototype, "name", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], SvgLinearGradientComponent.prototype, "stops", void 0);
    SvgLinearGradientComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-svg-linear-gradient]',
        template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:linearGradient>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], SvgLinearGradientComponent);
    return SvgLinearGradientComponent;
}();
exports.SvgLinearGradientComponent = SvgLinearGradientComponent;
//# sourceMappingURL=svg-linear-gradient.component.js.map