"use strict";
exports.__esModule = true;
exports.dechex = exports.str_pad = exports.round_half_up = void 0;
/**
 * Rounds equivalently to PHP_ROUND_HALF_UP in PHP.
 * @param n input number
 * @returns rounded result
 */
function round_half_up(n) {
    if (n < 0) {
        /* Ugly hack that makes sure -1.5 rounds to -2 */
        n -= 0.0000001;
    }
    return Math.round(n);
}
exports.round_half_up = round_half_up;
function str_pad(str, n, padding, left) {
    if (left) {
        return str.padStart(n, padding);
    }
    else
        return str.padEnd(n, padding);
}
exports.str_pad = str_pad;
function dechex(n) {
    return n.toString(16);
}
exports.dechex = dechex;
