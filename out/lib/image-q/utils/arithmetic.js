"use strict";
exports.__esModule = true;
exports.stableSort = exports.inRange0to255 = exports.inRange0to255Rounded = exports.intInRange = exports.min3 = exports.max3 = exports.degrees2radians = void 0;
function degrees2radians(n) {
    return n * (Math.PI / 180);
}
exports.degrees2radians = degrees2radians;
function max3(a, b, c) {
    var m = a;
    if (m < b)
        m = b;
    if (m < c)
        m = c;
    return m;
}
exports.max3 = max3;
function min3(a, b, c) {
    var m = a;
    if (m > b)
        m = b;
    if (m > c)
        m = c;
    return m;
}
exports.min3 = min3;
function intInRange(value, low, high) {
    if (value > high)
        value = high;
    if (value < low)
        value = low;
    return value | 0;
}
exports.intInRange = intInRange;
function inRange0to255Rounded(n) {
    n = Math.round(n);
    if (n > 255)
        n = 255;
    else if (n < 0)
        n = 0;
    return n;
}
exports.inRange0to255Rounded = inRange0to255Rounded;
function inRange0to255(n) {
    if (n > 255)
        n = 255;
    else if (n < 0)
        n = 0;
    return n;
}
exports.inRange0to255 = inRange0to255;
function stableSort(arrayToSort, callback) {
    var type = typeof arrayToSort[0];
    var sorted;
    if (type === 'number' || type === 'string') {
        var ord_1 = Object.create(null); // tslint:disable-line:no-null-keyword
        for (var i = 0, l = arrayToSort.length; i < l; i++) {
            var val = arrayToSort[i];
            if (ord_1[val] || ord_1[val] === 0)
                continue;
            ord_1[val] = i;
        }
        sorted = arrayToSort.sort(function (a, b) { return callback(a, b) || ord_1[a] - ord_1[b]; });
    }
    else {
        var ord2_1 = arrayToSort.slice(0);
        sorted = arrayToSort.sort(function (a, b) { return callback(a, b) || ord2_1.indexOf(a) - ord2_1.indexOf(b); });
    }
    return sorted;
}
exports.stableSort = stableSort;
