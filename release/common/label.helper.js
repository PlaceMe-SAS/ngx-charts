"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatLabel = formatLabel;
/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    } else {
        label = label.toLocaleString();
    }
    return label;
}
//# sourceMappingURL=label.helper.js.map