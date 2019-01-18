"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AreaComponent = undefined;

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

var AreaComponent = /** @class */function () {
    function AreaComponent(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.animations = true;
        this.select = new _core.EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        } else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        this.gradientId = 'grad' + (0, _id.id)().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        } else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.updatePathEl = function () {
        var node = (0, _d3Selection.select)(this.element).select('.area');
        if (this.animations) {
            node.transition().duration(750).attr('d', this.path);
        } else {
            node.attr('d', this.path);
        }
    };
    AreaComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [{
            offset: 0,
            color: this.fill,
            opacity: this.startOpacity
        }, {
            offset: 100,
            color: this.fill,
            opacity: this.endOpacity
        }];
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "path", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "startingPath", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "opacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "startOpacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "endOpacity", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], AreaComponent.prototype, "activeLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], AreaComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], AreaComponent.prototype, "stops", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], AreaComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], AreaComponent.prototype, "select", void 0);
    AreaComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-area]',
        template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], AreaComponent);
    return AreaComponent;
}();
exports.AreaComponent = AreaComponent;
//# sourceMappingURL=area.component.js.map