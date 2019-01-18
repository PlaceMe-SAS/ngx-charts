"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinearGaugeComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Scale = require("d3-scale");

var _baseChart = require("../common/base-chart.component");

var _viewDimensions = require("../common/view-dimensions.helper");

var _color = require("../common/color.helper");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
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

var LinearGaugeComponent = /** @class */function (_super) {
    __extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = 0;
        _this.max = 100;
        _this.value = 0;
        _this.margin = [10, 20, 10, 20];
        _this.valueResizeScale = 1;
        _this.unitsResizeScale = 1;
        _this.valueTextTransform = '';
        _this.valueTranslate = '';
        _this.unitsTextTransform = '';
        _this.unitsTranslate = '';
        return _this;
    }
    LinearGaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = (0, _viewDimensions.calculateViewDimensions)({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.transformLine = "translate(" + (this.margin[3] + this.valueScale(this.previousValue)) + ", " + yOffset + ")";
        this.valueTranslate = "translate(0, -15)";
        this.unitsTranslate = "translate(0, 15)";
        setTimeout(function () {
            return _this.scaleText('value');
        }, 50);
        setTimeout(function () {
            return _this.scaleText('units');
        }, 50);
    };
    LinearGaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    LinearGaugeComponent.prototype.getValueScale = function () {
        return (0, _d3Scale.scaleLinear)().range([0, this.dims.width]).domain(this.valueDomain);
    };
    LinearGaugeComponent.prototype.getDisplayValue = function () {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    };
    LinearGaugeComponent.prototype.scaleText = function (element, repeat) {
        var _this = this;
        if (repeat === void 0) {
            repeat = true;
        }
        var el;
        var resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        } else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        var _a = el.nativeElement.getBoundingClientRect(),
            width = _a.width,
            height = _a.height;
        if (width === 0 || height === 0) return;
        var oldScale = resizeScale;
        var availableWidth = this.dims.width;
        var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        var resizeScaleWidth = Math.floor(availableWidth / (width / resizeScale) * 100) / 100;
        var resizeScaleHeight = Math.floor(availableHeight / (height / resizeScale) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            } else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () {
                    _this.scaleText(element, false);
                }, 50);
            }
        }
    };
    LinearGaugeComponent.prototype.onClick = function () {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    };
    LinearGaugeComponent.prototype.setColors = function () {
        this.colors = new _color.ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], LinearGaugeComponent.prototype, "min", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], LinearGaugeComponent.prototype, "max", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], LinearGaugeComponent.prototype, "value", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], LinearGaugeComponent.prototype, "units", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LinearGaugeComponent.prototype, "previousValue", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], LinearGaugeComponent.prototype, "valueFormatting", void 0);
    __decorate([(0, _core.ViewChild)('valueTextEl'), __metadata("design:type", _core.ElementRef)], LinearGaugeComponent.prototype, "valueTextEl", void 0);
    __decorate([(0, _core.ViewChild)('unitsTextEl'), __metadata("design:type", _core.ElementRef)], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
    LinearGaugeComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-linear-gauge',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      [animations]=\"animations\"\n      (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g ngx-charts-bar\n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\">\n        </svg:g>\n        <svg:g ngx-charts-bar\n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\">\n        </svg:g>\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\"\n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\"\n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:g [attr.transform]=\"transform\">\n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"\n              alignment-baseline=\"after-edge\">\n              {{displayValue}}\n            </svg:text>\n          </svg:g>\n\n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"\n              alignment-baseline=\"before-edge\">\n              {{units}}\n            </svg:text>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styleUrls: ['../common/base-chart.component.css', './linear-gauge.component.css'],
        encapsulation: _core.ViewEncapsulation.None,
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], LinearGaugeComponent);
    return LinearGaugeComponent;
}(_baseChart.BaseChartComponent);
exports.LinearGaugeComponent = LinearGaugeComponent;
//# sourceMappingURL=linear-gauge.component.js.map