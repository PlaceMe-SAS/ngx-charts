"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BarComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Selection = require("d3-selection");

var _shape = require("../common/shape.helper");

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

var BarComponent = /** @class */function () {
    function BarComponent(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.select = new _core.EventEmitter();
        this.activate = new _core.EventEmitter();
        this.deactivate = new _core.EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    BarComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        } else {
            this.update();
        }
    };
    BarComponent.prototype.update = function () {
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
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.updatePathEl = function () {
        var node = (0, _d3Selection.select)(this.element).select('.bar');
        var path = this.getPath();
        if (this.animations) {
            node.transition().duration(500).attr('d', path);
        } else {
            node.attr('d', path);
        }
    };
    BarComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [{
            offset: 0,
            color: this.fill,
            opacity: this.getStartOpacity()
        }, {
            offset: 100,
            color: this.fill,
            opacity: 1
        }];
    };
    BarComponent.prototype.getStartingPath = function () {
        if (!this.animations) {
            return this.getPath();
        }
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = (0, _shape.roundedRect)(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            } else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = (0, _shape.roundedRect)(this.x, this.y, 1, this.height, 0, this.edges);
            }
        } else {
            if (this.orientation === 'vertical') {
                path = (0, _shape.roundedRect)(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            } else if (this.orientation === 'horizontal') {
                path = (0, _shape.roundedRect)(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        return path;
    };
    BarComponent.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = (0, _shape.roundedRect)(this.x, this.y, this.width, this.height, radius, this.edges);
            } else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = (0, _shape.roundedRect)(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        } else {
            path = (0, _shape.roundedRect)(this.x, this.y, this.width, this.height, radius, this.edges);
        }
        return path;
    };
    BarComponent.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    };
    BarComponent.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        } else {
            return 0.5;
        }
    };
    Object.defineProperty(BarComponent.prototype, "edges", {
        get: function get() {
            var edges = [false, false, false, false];
            if (this.roundEdges) {
                if (this.orientation === 'vertical') {
                    if (this.data.value > 0) {
                        edges = [true, true, false, false];
                    } else {
                        edges = [false, false, true, true];
                    }
                } else if (this.orientation === 'horizontal') {
                    if (this.data.value > 0) {
                        edges = [false, true, false, true];
                    } else {
                        edges = [true, false, true, false];
                    }
                }
            }
            return edges;
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "width", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "height", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "x", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "y", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "orientation", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarComponent.prototype, "roundEdges", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], BarComponent.prototype, "offset", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarComponent.prototype, "isActive", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], BarComponent.prototype, "stops", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], BarComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], BarComponent.prototype, "ariaLabel", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], BarComponent.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], BarComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], BarComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.HostListener)('mouseenter'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], BarComponent.prototype, "onMouseEnter", null);
    __decorate([(0, _core.HostListener)('mouseleave'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], BarComponent.prototype, "onMouseLeave", null);
    BarComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-bar]',
        template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      role=\"img\"\n      tabIndex=\"-1\"\n      [class.active]=\"isActive\"\n      [attr.d]=\"path\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], BarComponent);
    return BarComponent;
}();
exports.BarComponent = BarComponent;
//# sourceMappingURL=bar.component.js.map