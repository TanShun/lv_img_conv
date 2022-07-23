"use strict";
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */
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
exports.ErrorDiffusionRiemersma = exports.ErrorDiffusionArrayKernel = exports.ErrorDiffusionArray = exports.NearestColor = exports.AbstractImageQuantizer = void 0;
var imageQuantizer_1 = require("./imageQuantizer");
__createBinding(exports, imageQuantizer_1, "AbstractImageQuantizer");
var nearestColor_1 = require("./nearestColor");
__createBinding(exports, nearestColor_1, "NearestColor");
var array_1 = require("./array");
__createBinding(exports, array_1, "ErrorDiffusionArray");
__createBinding(exports, array_1, "ErrorDiffusionArrayKernel");
var riemersma_1 = require("./riemersma");
__createBinding(exports, riemersma_1, "ErrorDiffusionRiemersma");
