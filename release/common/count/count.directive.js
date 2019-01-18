"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CountUpDirective = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _count = require("./count.helper");

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

/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
var CountUpDirective = /** @class */function () {
    function CountUpDirective(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new _core.EventEmitter();
        this.countFinish = new _core.EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function get() {
            if (this._countDecimals) return this._countDecimals;
            return (0, _count.decimalChecker)(this.countTo);
        },
        set: function set(val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function get() {
            return this._countTo;
        },
        set: function set(val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function get() {
            return this._countFrom;
        },
        set: function set(val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var valueFormatting = this.valueFormatting || function (value) {
            return "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix;
        };
        var callback = function callback(_a) {
            var value = _a.value,
                progress = _a.progress,
                finished = _a.finished;
            _this.value = valueFormatting(value);
            _this.cd.markForCheck();
            if (!finished) _this.countChange.emit({ value: _this.value, progress: progress });
            if (finished) _this.countFinish.emit({ value: _this.value, progress: progress });
        };
        this.animationReq = (0, _count.count)(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Number)], CountUpDirective.prototype, "countDuration", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], CountUpDirective.prototype, "countPrefix", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], CountUpDirective.prototype, "countSuffix", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], CountUpDirective.prototype, "valueFormatting", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Number), __metadata("design:paramtypes", [Number])], CountUpDirective.prototype, "countDecimals", null);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CountUpDirective.prototype, "countTo", null);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CountUpDirective.prototype, "countFrom", null);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CountUpDirective.prototype, "countChange", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", Object)], CountUpDirective.prototype, "countFinish", void 0);
    CountUpDirective = __decorate([(0, _core.Component)({
        selector: '[ngx-charts-count-up]',
        template: "{{value}}"
    }), __metadata("design:paramtypes", [_core.ChangeDetectorRef, _core.ElementRef])], CountUpDirective);
    return CountUpDirective;
}();
exports.CountUpDirective = CountUpDirective;
//# sourceMappingURL=count.directive.js.map