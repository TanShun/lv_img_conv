"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.xyz2rgb = exports.xyz2lab = exports.lab2rgb = exports.lab2xyz = exports.rgb2lab = exports.rgb2hsl = exports.rgb2xyz = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */
var rgb2xyz_1 = require("./rgb2xyz");
__createBinding(exports, rgb2xyz_1, "rgb2xyz");
var rgb2hsl_1 = require("./rgb2hsl");
__createBinding(exports, rgb2hsl_1, "rgb2hsl");
var rgb2lab_1 = require("./rgb2lab");
__createBinding(exports, rgb2lab_1, "rgb2lab");
var lab2xyz_1 = require("./lab2xyz");
__createBinding(exports, lab2xyz_1, "lab2xyz");
var lab2rgb_1 = require("./lab2rgb");
__createBinding(exports, lab2rgb_1, "lab2rgb");
var xyz2lab_1 = require("./xyz2lab");
__createBinding(exports, xyz2lab_1, "xyz2lab");
var xyz2rgb_1 = require("./xyz2rgb");
__createBinding(exports, xyz2rgb_1, "xyz2rgb");
