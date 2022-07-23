"use strict";
exports.__esModule = true;
exports.lab2rgb = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2rgb.ts - part of Image Quantization Library
 */
var lab2xyz_1 = require("./lab2xyz");
var xyz2rgb_1 = require("./xyz2rgb");
// tslint:disable-next-line:naming-convention
function lab2rgb(L, a, b) {
    var xyz = (0, lab2xyz_1.lab2xyz)(L, a, b);
    return (0, xyz2rgb_1.xyz2rgb)(xyz.x, xyz.y, xyz.z);
}
exports.lab2rgb = lab2rgb;
