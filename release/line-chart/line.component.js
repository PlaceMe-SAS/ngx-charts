"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _d3Selection = require("d3-selection");

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

var LineComponent = /** @class */function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new _core.EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        } else {
            this.updatePathEl();
        }
    };
    LineComponent.prototype.updatePathEl = function () {
        var node = (0, _d3Selection.select)(this.element.nativeElement).select('.line');
        if (this.animations) {
            node.transition().duration(750).attr('d', this.path);
        } else {
            node.attr('d', this.path);
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineComponent.prototype, "path", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineComponent.prototype, "stroke", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LineComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], LineComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], LineComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], LineComponent.prototype, "select", void 0);
    LineComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-line]',
        template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        animations: [(0, _animations.trigger)('animationState', [(0, _animations.transition)(':enter', [(0, _animations.style)({
            strokeDasharray: 2000,
            strokeDashoffset: 2000
        }), (0, _animations.animate)(1000, (0, _animations.style)({
            strokeDashoffset: 0
        }))])])]
    }), __metadata("design:paramtypes", [_core.ElementRef])], LineComponent);
    return LineComponent;
}();
exports.LineComponent = LineComponent;
//# sourceMappingURL=line.component.js.map