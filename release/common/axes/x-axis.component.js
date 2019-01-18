"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XAxisComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _xAxisTicks = require("./x-axis-ticks.component");

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

var XAxisComponent = /** @class */function () {
    function XAxisComponent() {
        this.showGridLines = false;
        this.xOrient = 'bottom';
        this.xAxisOffset = 0;
        this.dimensionsChanged = new _core.EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
    }
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.padding + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "xScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "dims", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "tickFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "showGridLines", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "showLabel", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "labelText", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], XAxisComponent.prototype, "ticks", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "xAxisTickInterval", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], XAxisComponent.prototype, "xAxisTickCount", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], XAxisComponent.prototype, "xOrient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], XAxisComponent.prototype, "xAxisOffset", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], XAxisComponent.prototype, "dimensionsChanged", void 0);
    __decorate([(0, _core.ViewChild)(_xAxisTicks.XAxisTicksComponent), __metadata("design:type", _xAxisTicks.XAxisTicksComponent)], XAxisComponent.prototype, "ticksComponent", void 0);
    XAxisComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-x-axis]',
        template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        [tickValues]=\"ticks\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], XAxisComponent);
    return XAxisComponent;
}();
exports.XAxisComponent = XAxisComponent;
//# sourceMappingURL=x-axis.component.js.map