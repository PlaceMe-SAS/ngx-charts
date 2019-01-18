"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ForceDirectedGraphComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _core = require("@angular/core");

var _d3Force = require("d3-force");

var _chart = require("../common/charts/chart.component");

var _baseChart = require("../common/base-chart.component");

var _viewDimensions = require("../common/view-dimensions.helper");

var _color = require("../common/color.helper");

var _events = require("../events");

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
/* tslint:disable */

var ForceDirectedGraphComponent = /** @class */function (_super) {
    __extends(ForceDirectedGraphComponent, _super);
    function ForceDirectedGraphComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force = (0, _d3Force.forceSimulation)().force('charge', (0, _d3Force.forceManyBody)()).force('collide', (0, _d3Force.forceCollide)(5)).force('x', (0, _d3Force.forceX)()).force('y', (0, _d3Force.forceY)());
        _this.forceLink = (0, _d3Force.forceLink)().id(function (node) {
            return node.value;
        });
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.nodes = [];
        _this.links = [];
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.activate = new _core.EventEmitter();
        _this.deactivate = new _core.EventEmitter();
        _this.margin = [0, 0, 0, 0];
        _this.results = [];
        _this.groupResultsBy = function (node) {
            return node.value;
        };
        return _this;
    }
    ForceDirectedGraphComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        // center graph
        this.dims = (0, _viewDimensions.calculateViewDimensions)({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.seriesDomain = this.getSeriesDomain();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "\n      translate(" + (this.dims.xOffset + this.dims.width / 2) + ", " + (this.margin[0] + this.dims.height / 2) + ")\n    ";
        if (this.force) {
            this.force.nodes(this.nodes).force('link', this.forceLink.links(this.links)).alpha(0.5).restart();
        }
    };
    ForceDirectedGraphComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    ForceDirectedGraphComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1) return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.getSeriesDomain = function () {
        var _this = this;
        return this.nodes.map(function (d) {
            return _this.groupResultsBy(d);
        }).reduce(function (nodes, node) {
            return nodes.includes(node) ? nodes : nodes.concat([node]);
        }, []).sort();
    };
    ForceDirectedGraphComponent.prototype.trackLinkBy = function (index, link) {
        return link.index;
    };
    ForceDirectedGraphComponent.prototype.trackNodeBy = function (index, node) {
        return node.value;
    };
    ForceDirectedGraphComponent.prototype.setColors = function () {
        this.colors = new _color.ColorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    ForceDirectedGraphComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.seriesDomain,
            colors: this.colors,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    // Easier to use Angular2 event management than use d3.drag
    ForceDirectedGraphComponent.prototype.onDragStart = function (node, $event) {
        this.force.alphaTarget(0.3).restart();
        this.draggingNode = node;
        this.draggingStart = { x: $event.x - node.x, y: $event.y - node.y };
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDrag = function ($event) {
        if (!this.draggingNode) return;
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDragEnd = function ($event) {
        if (!this.draggingNode) return;
        this.force.alphaTarget(0);
        this.draggingNode.fx = undefined;
        this.draggingNode.fy = undefined;
        this.draggingNode = undefined;
    };
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ForceDirectedGraphComponent.prototype, "force", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Object)], ForceDirectedGraphComponent.prototype, "forceLink", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], ForceDirectedGraphComponent.prototype, "legend", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], ForceDirectedGraphComponent.prototype, "legendTitle", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", String)], ForceDirectedGraphComponent.prototype, "legendPosition", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], ForceDirectedGraphComponent.prototype, "nodes", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], ForceDirectedGraphComponent.prototype, "links", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Array)], ForceDirectedGraphComponent.prototype, "activeEntries", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Boolean)], ForceDirectedGraphComponent.prototype, "tooltipDisabled", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], ForceDirectedGraphComponent.prototype, "activate", void 0);
    __decorate([(0, _core.Output)(), __metadata("design:type", _core.EventEmitter)], ForceDirectedGraphComponent.prototype, "deactivate", void 0);
    __decorate([(0, _core.ContentChild)('linkTemplate'), __metadata("design:type", _core.TemplateRef)], ForceDirectedGraphComponent.prototype, "linkTemplate", void 0);
    __decorate([(0, _core.ContentChild)('nodeTemplate'), __metadata("design:type", _core.TemplateRef)], ForceDirectedGraphComponent.prototype, "nodeTemplate", void 0);
    __decorate([(0, _core.ContentChild)('tooltipTemplate'), __metadata("design:type", _core.TemplateRef)], ForceDirectedGraphComponent.prototype, "tooltipTemplate", void 0);
    __decorate([(0, _core.ViewChild)(_chart.ChartComponent, { read: _core.ElementRef }), __metadata("design:type", _core.ElementRef)], ForceDirectedGraphComponent.prototype, "chart", void 0);
    __decorate([(0, _core.Input)(), __metadata("design:type", Function)], ForceDirectedGraphComponent.prototype, "groupResultsBy", void 0);
    __decorate([(0, _core.HostListener)('document:mousemove', ['$event']), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], ForceDirectedGraphComponent.prototype, "onDrag", null);
    __decorate([(0, _core.HostListener)('document:mouseup', ['$event']), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], ForceDirectedGraphComponent.prototype, "onDragEnd", null);
    ForceDirectedGraphComponent = __decorate([(0, _core.Component)({
        selector: 'ngx-charts-force-directed-graph',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"force-directed-graph chart\">\n        <svg:g class=\"links\">\n          <svg:g *ngFor=\"let link of links; trackBy:trackLinkBy\">\n            <ng-template *ngIf=\"linkTemplate\"\n              [ngTemplateOutlet]=\"linkTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: link }\">\n            </ng-template>\n            <svg:line *ngIf=\"!linkTemplate\"\n              strokeWidth=\"1\" class=\"edge\"\n              [attr.x1]=\"link.source.x\"\n              [attr.y1]=\"link.source.y\"\n              [attr.x2]=\"link.target.x\"\n              [attr.y2]=\"link.target.y\"\n            />\n          </svg:g>\n        </svg:g>\n        <svg:g class=\"nodes\">\n          <svg:g *ngFor=\"let node of nodes; trackBy:trackNodeBy\"\n            [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"\n            [attr.fill]=\"colors.getColor(groupResultsBy(node))\"\n            [attr.stroke]=\"colors.getColor(groupResultsBy(node))\"\n            (mousedown)=\"onDragStart(node, $event)\"\n            (click)=\"onClick({name: node.value})\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : node.value\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"node\">\n            <ng-template *ngIf=\"nodeTemplate\"\n              [ngTemplateOutlet]=\"nodeTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: node }\">\n            </ng-template>\n            <svg:circle *ngIf=\"!nodeTemplate\" r=\"5\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styleUrls: ['../common/base-chart.component.css', './force-directed-graph.component.css'],
        encapsulation: _core.ViewEncapsulation.None,
        changeDetection: _core.ChangeDetectionStrategy.OnPush
    })], ForceDirectedGraphComponent);
    return ForceDirectedGraphComponent;
}(_baseChart.BaseChartComponent);
exports.ForceDirectedGraphComponent = ForceDirectedGraphComponent;
//# sourceMappingURL=force-directed-graph.component.js.map