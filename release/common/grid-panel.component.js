"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GridPanelComponent = undefined;

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

var GridPanelComponent = /** @class */function () {
    function GridPanelComponent() {}
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GridPanelComponent.prototype, "path", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GridPanelComponent.prototype, "width", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GridPanelComponent.prototype, "height", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GridPanelComponent.prototype, "x", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], GridPanelComponent.prototype, "y", void 0);
    GridPanelComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-grid-panel]',
        template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], GridPanelComponent);
    return GridPanelComponent;
}();
exports.GridPanelComponent = GridPanelComponent;
//# sourceMappingURL=grid-panel.component.js.map