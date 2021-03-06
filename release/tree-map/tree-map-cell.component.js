"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeMapCellComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Selection = require("d3-selection");

var _colorUtils = require("../utils/color-utils");

var _trimLabel = require("../common/trim-label.helper");

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

var TreeMapCellComponent = /** @class */function () {
    function TreeMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new _core.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TreeMapCellComponent.prototype.ngOnChanges = function () {
        this.update();
        this.valueFormatting = this.valueFormatting || function (value) {
            return value.toLocaleString();
        };
        var labelFormatting = this.labelFormatting || function (cell) {
            return (0, _trimLabel.trimLabel)(cell.label, 55);
        };
        var cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedValue = this.valueFormatting(cellData.value);
        this.formattedLabel = labelFormatting(cellData);
        this.gradientId = 'grad' + (0, _id.id)().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
    };
    TreeMapCellComponent.prototype.update = function () {
        if (this.initialized) {
            this.animateToCurrentForm();
        } else {
            if (this.animations) {
                this.loadAnimation();
            }
            this.initialized = true;
        }
    };
    TreeMapCellComponent.prototype.loadAnimation = function () {
        var node = (0, _d3Selection.select)(this.element).select('.cell');
        node.attr('opacity', 0).attr('x', this.x).attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCellComponent.prototype.getTextColor = function () {
        return (0, _colorUtils.invertColor)(this.fill);
    };
    TreeMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = (0, _d3Selection.select)(this.element).select('.cell');
        if (this.animations) {
            node.transition().duration(750).attr('opacity', 1).attr('x', this.x).attr('y', this.y).attr('width', this.width).attr('height', this.height);
        } else {
            node.attr('opacity', 1).attr('x', this.x).attr('y', this.y).attr('width', this.width).attr('height', this.height);
        }
    };
    TreeMapCellComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.label,
            value: this.value
        });
    };
    TreeMapCellComponent.prototype.getGradientStops = function () {
        return [{
            offset: 0,
            color: this.fill,
            opacity: 0.3
        }, {
            offset: 100,
            color: this.fill,
            opacity: 1
        }];
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "data", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "fill", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "x", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "y", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "width", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "height", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "label", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "value", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "valueType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "valueFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "labelFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TreeMapCellComponent.prototype, "gradient", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], TreeMapCellComponent.prototype, "animations", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], TreeMapCellComponent.prototype, "select", void 0);
    TreeMapCellComponent = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-tree-map-cell]',
        template: "\n    <svg:g>\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"label\"\n        [style.pointer-events]=\"'none'\">\n        <xhtml:p\n          [style.color]=\"getTextColor()\"\n          [style.height]=\"height + 'px'\"\n          [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\">\n          </xhtml:span>\n          <xhtml:br />\n          <xhtml:span *ngIf=\"animations\"\n            class=\"treemap-val\" \n            ngx-charts-count-up \n            [countTo]=\"value\"\n            [valueFormatting]=\"valueFormatting\">\n          </xhtml:span>\n          <xhtml:span *ngIf=\"!animations\"\n            class=\"treemap-val\">\n            {{formattedValue}}\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef])], TreeMapCellComponent);
    return TreeMapCellComponent;
}();
exports.TreeMapCellComponent = TreeMapCellComponent;
//# sourceMappingURL=tree-map-cell.component.js.map