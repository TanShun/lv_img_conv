"use strict";
exports.__esModule = true;
exports.lab2xyz = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2xyz.ts - part of Image Quantization Library
 */
var refX = 0.95047; // ref_X =  95.047   Observer= 2°, Illuminant = D65
var refY = 1.0; // ref_Y = 100.000
var refZ = 1.08883; // ref_Z = 108.883
function pivot(n) {
    return n > 0.206893034 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787;
}
// tslint:disable-next-line:naming-convention
function lab2xyz(L, a, b) {
    var y = (L + 16) / 116;
    var x = a / 500 + y;
    var z = y - b / 200;
    return {
        x: refX * pivot(x),
        y: refY * pivot(y),
        z: refZ * pivot(z)
    };
}
exports.lab2xyz = lab2xyz;
