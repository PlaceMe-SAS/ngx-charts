"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AxisLabelComponent = undefined;

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

var AxisLabelComponent = /** @class */function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AxisLabelComponent.prototype, "orient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AxisLabelComponent.prototype, "label", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AxisLabelComponent.prototype, "offset", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AxisLabelComponent.prototype, "width", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AxisLabelComponent.prototype, "height", void 0);
    AxisLabelComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-axis-label]',
        template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], AxisLabelComponent);
    return AxisLabelComponent;
}();
exports.AxisLabelComponent = AxisLabelComponent;
//# sourceMappingURL=axis-label.component.js.map