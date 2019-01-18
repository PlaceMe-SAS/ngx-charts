"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeatMapCellComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Selection = require("d3-selection");

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

var HeatMapCellComponent = /** @class */function () {
    function HeatMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new _core.EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + (0, _id.id)().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
    };
    HeatMapCellComponent.prototype.getGradientStops = function () {
        return [{
            offset: 0,
            color: this.fill,
            opacity: this.startOpacity
        }, {
            offset: 100,
            color: this.fill,
            opacity: 1
        }];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = (0, _d3Selection.select)(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = (0, _d3Selection.select)(this.element).select('.cell');
        node.transition().duration(750).attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "x", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "y", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "width", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "height", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "label", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], HeatMapCellComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], HeatMapCellComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], HeatMapCellComponent.prototype, "select", void 0);
    HeatMapCellComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-heat-map-cell]',
        template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], HeatMapCellComponent);
    return HeatMapCellComponent;
}();
exports.HeatMapCellComponent = HeatMapCellComponent;
//# sourceMappingURL=heat-map-cell.component.js.map