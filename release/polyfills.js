'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ngxChartsPolyfills = ngxChartsPolyfills;
// The export is needed here to generate a valid polyfills.metadata.json file
function ngxChartsPolyfills() {
    // IE11 fix
    // Ref: https://github.com/swimlane/ngx-charts/issues/386
    if (typeof SVGElement !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }
}
ngxChartsPolyfills();
//# sourceMappingURL=polyfills.js.map