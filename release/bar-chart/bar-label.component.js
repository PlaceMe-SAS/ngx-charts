"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BarLabelComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

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

var BarLabelComponent = /** @class */function () {
    function BarLabelComponent(element) {
        this.dimensionsChanged = new _core.EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    BarLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BarLabelComponent.prototype.getSize = function () {
        var h = this.element.getBoundingClientRect().height;
        var w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    };
    BarLabelComponent.prototype.ngAfterViewInit = function () {
        this.dimensionsChanged.emit(this.getSize());
    };
    BarLabelComponent.prototype.update = function () {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        } else {
            this.formatedValue = (0, _label.formatLabel)(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            // if the value is negative then it's on the left of the x0. 
            // we need to put the data label in front of the bar
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            } else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        } else {
            // orientation must be "vertical"      
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            } else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = "rotate(-45, " + this.x + " , " + this.y + ")";
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "value", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "valueFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "barX", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "barY", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "barWidth", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "barHeight", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarLabelComponent.prototype, "orientation", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], BarLabelComponent.prototype, "dimensionsChanged", void 0);
    BarLabelComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-bar-label]',
        template: "  \n    <svg:text   \n      class=\"textDataLabel\" \n      alignment-baseline=\"middle\"     \n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n      [attr.x]=\"x\" \n      [attr.y]=\"y\">\n      {{formatedValue}}     \n    </svg:text>          \n\n  ",
        styleUrls: ['./bar-label.component.css'],
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], BarLabelComponent);
    return BarLabelComponent;
}();
exports.BarLabelComponent = BarLabelComponent;
//# sourceMappingURL=bar-label.component.js.map