"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timeline = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Brush = require("d3-brush");

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

var _utils = require("../../utils");

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

var Timeline = /** @class */function () {
    function Timeline(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new _core.EventEmitter();
        this.onDomainChange = new _core.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnChanges = function (changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    Timeline.prototype.update = function () {
        this.dims = this.getDims();
        this.height = this.dims.height;
        var offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = "translate(0 , " + offsetY + ")";
        this.filterId = 'filter' + (0, _utils.id)().toString();
        this.filter = "url(#" + this.filterId + ")";
        this.cd.markForCheck();
    };
    Timeline.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        } else if (this.scaleType === 'linear') {
            values = values.map(function (v) {
                return Number(v);
            });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        } else {
            domain = values;
        }
        return domain;
    };
    Timeline.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = (0, _d3Scale.scaleTime)().range([0, this.dims.width]).domain(this.xDomain);
        } else if (this.scaleType === 'linear') {
            scale = (0, _d3Scale.scaleLinear)().range([0, this.dims.width]).domain(this.xDomain);
        } else if (this.scaleType === 'ordinal') {
            scale = (0, _d3Scale.scalePoint)().range([0, this.dims.width]).padding(0.1).domain(this.xDomain);
        }
        return scale;
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.brush) return;
        var height = this.height;
        var width = this.view[0];
        this.brush = (0, _d3Brush.brushX)().extent([[0, 0], [width, height]]).on('brush end', function () {
            var selection = _d3Selection.event.selection || _this.xScale.range();
            var newDomain = selection.map(_this.xScale.invert);
            _this.onDomainChange.emit(newDomain);
            _this.cd.markForCheck();
        });
        (0, _d3Selection.select)(this.element).select('.brush').call(this.brush);
    };
    Timeline.prototype.updateBrush = function () {
        if (!this.brush) return;
        var height = this.height;
        var width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        (0, _d3Selection.select)(this.element).select('.brush').call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        (0, _d3Selection.select)(this.element).select('.selection').attr('fill', undefined).attr('stroke', undefined).attr('fill-opacity', undefined);
        this.cd.markForCheck();
    };
    Timeline.prototype.getDims = function () {
        var width = this.view[0];
        var dims = {
            width: width,
            height: this.height
        };
        return dims;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "view", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "state", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "results", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "scheme", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "customColors", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "legend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "miniChart", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "autoScale", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], Timeline.prototype, "scaleType", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], Timeline.prototype, "height", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], Timeline.prototype, "select", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], Timeline.prototype, "onDomainChange", void 0);
    Timeline = __decorate([(0, _core.Component)({
        selector: 'g[ngx-charts-timeline]',
        template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\"\n        [attr.width]=\"view[0]\"\n        y=\"0\"\n        [attr.height]=\"height\"\n        class=\"brush-background\"\n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
        styleUrls: ['./timeline.component.css'],
        encapsulation: _core.ViewEncapsulation.None,
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    }), __metadata("design:paramtypes", [_core.ElementRef, _core.ChangeDetectorRef])], Timeline);
    return Timeline;
}();
exports.Timeline = Timeline;
//# sourceMappingURL=timeline.component.js.map