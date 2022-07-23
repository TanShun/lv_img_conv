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
exports.WuColorCube = exports.WuQuant = exports.ColorHistogram = exports.RGBQuant = exports.NeuQuantFloat = exports.NeuQuant = exports.AbstractPaletteQuantizer = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */
var paletteQuantizer_1 = require("./paletteQuantizer");
__createBinding(exports, paletteQuantizer_1, "AbstractPaletteQuantizer");
var neuquant_1 = require("./neuquant/neuquant");
__createBinding(exports, neuquant_1, "NeuQuant");
var neuquantFloat_1 = require("./neuquant/neuquantFloat");
__createBinding(exports, neuquantFloat_1, "NeuQuantFloat");
var rgbquant_1 = require("./rgbquant/rgbquant");
__createBinding(exports, rgbquant_1, "RGBQuant");
var colorHistogram_1 = require("./rgbquant/colorHistogram");
__createBinding(exports, colorHistogram_1, "ColorHistogram");
var wuQuant_1 = require("./wu/wuQuant");
__createBinding(exports, wuQuant_1, "WuQuant");
__createBinding(exports, wuQuant_1, "WuColorCube");
