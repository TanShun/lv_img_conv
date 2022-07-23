"use strict";
exports.__esModule = true;
exports.xyz2rgb = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2rgb.ts - part of Image Quantization Library
 */
var arithmetic_1 = require("../utils/arithmetic");
// gamma correction, see https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
function correctGamma(n) {
    return n > 0.0031308 ? 1.055 * Math.pow(n, (1 / 2.4)) - 0.055 : 12.92 * n;
}
function xyz2rgb(x, y, z) {
    // Observer. = 2°, Illuminant = D65
    var r = correctGamma(x * 3.2406 + y * -1.5372 + z * -0.4986);
    var g = correctGamma(x * -0.9689 + y * 1.8758 + z * 0.0415);
    var b = correctGamma(x * 0.0557 + y * -0.204 + z * 1.057);
    return {
        r: (0, arithmetic_1.inRange0to255Rounded)(r * 255),
        g: (0, arithmetic_1.inRange0to255Rounded)(g * 255),
        b: (0, arithmetic_1.inRange0to255Rounded)(b * 255)
    };
}
exports.xyz2rgb = xyz2rgb;
