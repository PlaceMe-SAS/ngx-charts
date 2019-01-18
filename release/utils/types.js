'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDate = isDate;
exports.isNumber = isNumber;
function isDate(value) {
    return toString.call(value) === '[object Date]';
}
function isNumber(value) {
    return typeof value === 'number';
}
//# sourceMappingURL=types.js.map