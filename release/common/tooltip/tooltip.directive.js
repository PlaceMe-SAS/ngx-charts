"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TooltipDirective = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _position = require("./position");

var _style = require("./style.type");

var _alignment = require("./alignment.type");

var _show = require("./show.type");

var _tooltip = require("./tooltip.service");

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

var TooltipDirective = /** @class */function () {
    function TooltipDirective(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = _position.PlacementTypes.top;
        this.tooltipAlignment = _alignment.AlignmentTypes.center;
        this.tooltipType = _style.StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = _show.ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new _core.EventEmitter();
        this.hide = new _core.EventEmitter();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function get() {
            return this.tooltipShowEvent === _show.ShowTypes.all || this.tooltipShowEvent === _show.ShowTypes.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function get() {
            return this.tooltipShowEvent === _show.ShowTypes.all || this.tooltipShowEvent === _show.ShowTypes.mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                var contentDom = this.component.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains) return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    };
    TooltipDirective.prototype.onMouseClick = function () {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        if (this.component || this.tooltipDisabled) return;
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            var options = _this.createBoundOptions();
            _this.component = _this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(function () {
                if (_this.component) {
                    _this.addHideListeners(_this.component.instance.element.nativeElement);
                }
            }, 10);
            _this.show.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip(_this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains) _this.hideTooltip();
            });
        }
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (immediate === void 0) {
            immediate = false;
        }
        if (!this.component) return;
        var destroyFn = function destroyFn() {
            // remove events
            if (_this.mouseLeaveContentEvent) _this.mouseLeaveContentEvent();
            if (_this.mouseEnterContentEvent) _this.mouseEnterContentEvent();
            if (_this.documentClickEvent) _this.documentClickEvent();
            // emit events
            _this.hide.emit(true);
            // destroy component
            _this.tooltipService.destroy(_this.component);
            _this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        } else {
            destroyFn();
        }
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], TooltipDirective.prototype, "tooltipCssClass", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], TooltipDirective.prototype, "tooltipTitle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipSpacing", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipDirective.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipDirective.prototype, "tooltipShowCaret", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipPlacement", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipAlignment", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TooltipDirective.prototype, "tooltipTemplate", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipDirective.prototype, "tooltipShowEvent", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TooltipDirective.prototype, "tooltipContext", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], TooltipDirective.prototype, "show", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], TooltipDirective.prototype, "hide", void 0);
    __decorate([(0, _core.HostListener)('focusin'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TooltipDirective.prototype, "onFocus", null);
    __decorate([(0, _core.HostListener)('blur'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TooltipDirective.prototype, "onBlur", null);
    __decorate([(0, _core.HostListener)('mouseenter'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TooltipDirective.prototype, "onMouseEnter", null);
    __decorate([(0, _core.HostListener)('mouseleave', ['$event.target']), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TooltipDirective.prototype, "onMouseLeave", null);
    __decorate([(0, _core.HostListener)('click'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TooltipDirective.prototype, "onMouseClick", null);
    TooltipDirective = __decorate([(0, _core.Directive)({ selector: '[ngx-tooltip]' }), __metadata("design:paramtypes", [_tooltip.TooltipService, _core.ViewContainerRef, _core.Renderer2])], TooltipDirective);
    return TooltipDirective;
}();
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map