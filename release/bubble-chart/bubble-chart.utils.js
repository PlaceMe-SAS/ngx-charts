'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDomain = getDomain;
exports.getScale = getScale;

var _d3Scale = require('d3-scale');

function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    var domain = [];
    if (scaleType === 'linear') {
        values = values.map(function (v) {
            return Number(v);
        });
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === 'time' || scaleType === 'linear') {
        var min = minVal ? minVal : Math.min.apply(Math, values);
        var max = maxVal ? maxVal : Math.max.apply(Math, values);
        domain = [min, max];
    } else {
        domain = values;
    }
    return domain;
}
function getScale(domain, range, scaleType, roundDomains) {
    var scale;
    if (scaleType === 'time') {
        scale = (0, _d3Scale.scaleTime)().range(range).domain(domain);
    } else if (scaleType === 'linear') {
        scale = (0, _d3Scale.scaleLinear)().range(range).domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    } else if (scaleType === 'ordinal') {
        scale = (0, _d3Scale.scalePoint)().range([range[0], range[1]]).domain(domain);
    }
    return scale;
}
//# sourceMappingURL=bubble-chart.utils.js.map