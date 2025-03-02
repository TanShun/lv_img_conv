"use strict";
exports.__esModule = true;
exports.xyz2lab = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2lab.ts - part of Image Quantization Library
 */
var refX = 0.95047; // ref_X =  95.047   Observer= 2°, Illuminant= D65
var refY = 1.0; // ref_Y = 100.000
var refZ = 1.08883; // ref_Z = 108.883
function pivot(n) {
    return n > 0.008856 ? Math.pow(n, (1 / 3)) : 7.787 * n + 16 / 116;
}
function xyz2lab(x, y, z) {
    x = pivot(x / refX);
    y = pivot(y / refY);
    z = pivot(z / refZ);
    if (116 * y - 16 < 0)
        throw new Error('xxx');
    return {
        L: Math.max(0, 116 * y - 16),
        a: 500 * (x - y),
        b: 200 * (y - z)
    };
}
exports.xyz2lab = xyz2lab;
