"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChartComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _tooltip = require("../tooltip");

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

var ChartComponent = /** @class */function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new _core.EventEmitter();
        this.legendLabelActivate = new _core.EventEmitter();
        this.legendLabelDeactivate = new _core.EventEmitter();
        this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                } else {
                    legendColumns = 2;
                }
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = ~~(this.view[0] * chartColumns / 12.0);
        this.legendWidth = !this.legendOptions || this.legendOptions.position === 'right' ? ~~(this.view[0] * legendColumns / 12.0) : this.chartWidth;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        } else {
            return 'legend';
        }
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "view", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "showLegend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "legendOptions", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "legendData", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "legendType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ChartComponent.prototype, "colors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], ChartComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], ChartComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], ChartComponent.prototype, "legendLabelClick", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], ChartComponent.prototype, "legendLabelActivate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], ChartComponent.prototype, "legendLabelDeactivate", void 0);
    ChartComponent = __decorate([(0, _core.Component)({
        providers: [_tooltip.TooltipService],
        selector: 'ngx-charts-chart',
        template: "\n    <div\n      class=\"ngx-charts-outer\"\n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\">\n      <svg\n        class=\"ngx-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ngx-charts-legend>\n    </div>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush,
        animations: [(0, _animations.trigger)('animationState', [(0, _animations.transition)(':enter', [(0, _animations.style)({ opacity: 0 }), (0, _animations.animate)('500ms 100ms', (0, _animations.style)({ opacity: 1 }))])])]
    }), __metadata("design:paramtypes", [_core.ViewContainerRef, _tooltip.TooltipService])], ChartComponent);
    return ChartComponent;
}();
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map