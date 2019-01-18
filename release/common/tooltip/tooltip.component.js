"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TooltipContentComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _throttle = require("../../utils/throttle");

var _position = require("./position");

var _style = require("./style.type");

var _alignment = require("./alignment.type");

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

var TooltipContentComponent = /** @class */function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function get() {
            var clz = 'ngx-charts-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width) return;
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(function () {
            return _this.renderer.addClass(nativeElm, 'animate');
        }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = _position.PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment),
            top = _a.top,
            left = _a.left;
        this.renderer.setStyle(nativeElm, 'top', top + "px");
        this.renderer.setStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = _position.PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment),
            top = _a.top,
            left = _a.left;
        this.renderer.setStyle(caretElm, 'top', top + "px");
        this.renderer.setStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = _position.PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TooltipContentComponent.prototype, "host", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TooltipContentComponent.prototype, "showCaret", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipContentComponent.prototype, "type", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipContentComponent.prototype, "placement", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipContentComponent.prototype, "alignment", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], TooltipContentComponent.prototype, "spacing", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], TooltipContentComponent.prototype, "cssClass", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], TooltipContentComponent.prototype, "title", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TooltipContentComponent.prototype, "template", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TooltipContentComponent.prototype, "context", void 0);
    __decorate([(0, _core.ViewChild)('caretElm'), __metadata("design:type", Object)], TooltipContentComponent.prototype, "caretElm", void 0);
    __decorate([(0, _core.HostBinding)('class'), __metadata("design:type", String), __metadata("design:paramtypes", [])], TooltipContentComponent.prototype, "cssClasses", null);
    __decorate([(0, _core.HostListener)('window:resize'), (0, _throttle.throttleable)(100), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TooltipContentComponent.prototype, "onWindowResize", null);
    TooltipContentComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-tooltip-content',
        template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template\n            [ngTemplateOutlet]=\"template\"\n            [ngTemplateOutletContext]=\"{ model: context }\">\n          </ng-template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  ",
        encapsulation: _core.ViewEncapsulation.None,
        styleUrls: ['./tooltip.component.css']
    }), __metadata("design:paramtypes", [_core.ElementRef, _core.Renderer2])], TooltipContentComponent);
    return TooltipContentComponent;
}();
exports.TooltipContentComponent = TooltipContentComponent;
//# sourceMappingURL=tooltip.component.js.map