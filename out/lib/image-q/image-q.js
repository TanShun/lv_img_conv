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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.utils = exports.quality = exports.image = exports.palette = exports.distance = exports.conversion = exports.constants = exports.applyPaletteSync = exports.applyPalette = exports.buildPaletteSync = exports.buildPalette = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */
var constants = __importStar(require("./constants"));
exports.constants = constants;
var conversion = __importStar(require("./conversion"));
exports.conversion = conversion;
var distance = __importStar(require("./distance"));
exports.distance = distance;
var palette = __importStar(require("./palette"));
exports.palette = palette;
var image = __importStar(require("./image"));
exports.image = image;
var quality = __importStar(require("./quality"));
exports.quality = quality;
var utils = __importStar(require("./utils"));
exports.utils = utils;
var basicAPI_1 = require("./basicAPI");
__createBinding(exports, basicAPI_1, "buildPalette");
__createBinding(exports, basicAPI_1, "buildPaletteSync");
__createBinding(exports, basicAPI_1, "applyPalette");
__createBinding(exports, basicAPI_1, "applyPaletteSync");
