"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScaleLegendComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _platformBrowser = require("@angular/platform-browser");

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

var ScaleLegendComponent = /** @class */function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        var direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to " + direction + ", " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ScaleLegendComponent.prototype, "valueRange", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ScaleLegendComponent.prototype, "colors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ScaleLegendComponent.prototype, "height", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ScaleLegendComponent.prototype, "width", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ScaleLegendComponent.prototype, "horizontal", void 0);
    ScaleLegendComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-scale-legend',
        template: "\n    <div\n      class=\"scale-legend\"\n      [class.horizontal-legend]=\"horizontal\"\n      [style.height.px]=\"horizontal ? undefined : height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
        styleUrls: ['./scale-legend.component.css'],
        encapsulation: _core.ViewEncapsulation.None,
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_platformBrowser.DomSanitizer])], ScaleLegendComponent);
    return ScaleLegendComponent;
}();
exports.ScaleLegendComponent = ScaleLegendComponent;
//# sourceMappingURL=scale-legend.component.js.map