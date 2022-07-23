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
exports.PNGQuant = exports.ManhattanNommyde = exports.ManhattanBT709 = exports.Manhattan = exports.AbstractManhattan = exports.EuclideanBT709 = exports.EuclideanBT709NoAlpha = exports.Euclidean = exports.AbstractEuclidean = exports.CMetric = exports.CIEDE2000 = exports.CIE94GraphicArts = exports.CIE94Textiles = exports.AbstractDistanceCalculator = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
__createBinding(exports, distanceCalculator_1, "AbstractDistanceCalculator");
var cie94_1 = require("./cie94");
__createBinding(exports, cie94_1, "CIE94Textiles");
__createBinding(exports, cie94_1, "CIE94GraphicArts");
var ciede2000_1 = require("./ciede2000");
__createBinding(exports, ciede2000_1, "CIEDE2000");
var cmetric_1 = require("./cmetric");
__createBinding(exports, cmetric_1, "CMetric");
var euclidean_1 = require("./euclidean");
__createBinding(exports, euclidean_1, "AbstractEuclidean");
__createBinding(exports, euclidean_1, "Euclidean");
__createBinding(exports, euclidean_1, "EuclideanBT709NoAlpha");
__createBinding(exports, euclidean_1, "EuclideanBT709");
var manhattan_1 = require("./manhattan");
__createBinding(exports, manhattan_1, "AbstractManhattan");
__createBinding(exports, manhattan_1, "Manhattan");
__createBinding(exports, manhattan_1, "ManhattanBT709");
__createBinding(exports, manhattan_1, "ManhattanNommyde");
var pngQuant_1 = require("./pngQuant");
__createBinding(exports, pngQuant_1, "PNGQuant");
