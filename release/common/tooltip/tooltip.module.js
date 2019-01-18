"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TooltipModule = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _common = require("@angular/common");

var _tooltip = require("./tooltip.directive");

var _tooltip2 = require("./tooltip.component");

var _tooltip3 = require("./tooltip.service");

var _injection = require("./injection.service");

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TooltipModule = /** @class */function () {
    function TooltipModule() {}
    TooltipModule = __decorate([(0, _core.NgModule)({
        declarations: [_tooltip2.TooltipContentComponent, _tooltip.TooltipDirective],
        providers: [_injection.InjectionService, _tooltip3.TooltipService],
        exports: [_tooltip2.TooltipContentComponent, _tooltip.TooltipDirective],
        imports: [_common.CommonModule],
        entryComponents: [_tooltip2.TooltipContentComponent]
    })], TooltipModule);
    return TooltipModule;
}();
exports.TooltipModule = TooltipModule;
//# sourceMappingURL=tooltip.module.js.map