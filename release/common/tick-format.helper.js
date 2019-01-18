'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tickFormat = tickFormat;

var _d3TimeFormat = require('d3-time-format');

function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = (0, _d3TimeFormat.timeFormat)('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}
//# sourceMappingURL=tick-format.helper.js.map