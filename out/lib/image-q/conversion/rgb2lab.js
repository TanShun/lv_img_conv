"use strict";
exports.__esModule = true;
exports.rgb2lab = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2lab.ts - part of Image Quantization Library
 */
var rgb2xyz_1 = require("./rgb2xyz");
var xyz2lab_1 = require("./xyz2lab");
function rgb2lab(r, g, b) {
    var xyz = (0, rgb2xyz_1.rgb2xyz)(r, g, b);
    return (0, xyz2lab_1.xyz2lab)(xyz.x, xyz.y, xyz.z);
}
exports.rgb2lab = rgb2lab;
