"use strict";
/*
 * Copyright (c) 2015, Leon Sorokin
 * All rights reserved. (MIT Licensed)
 *
 * RGBQuant.js - an image quantization lib
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.RGBQuant = void 0;
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgbquant.ts - part of Image Quantization Library
 */
var palette_1 = require("../../utils/palette");
var point_1 = require("../../utils/point");
var colorHistogram_1 = require("./colorHistogram");
var paletteQuantizer_1 = require("../paletteQuantizer");
var arithmetic_1 = require("../../utils/arithmetic");
var utils_1 = require("../../utils");
var RemovedColor = /** @class */ (function () {
    function RemovedColor(index, color, distance) {
        this.index = index;
        this.color = color;
        this.distance = distance;
    }
    return RemovedColor;
}());
// TODO: make input/output image and input/output palettes with instances of class Point only!
var RGBQuant = /** @class */ (function (_super) {
    __extends(RGBQuant, _super);
    function RGBQuant(colorDistanceCalculator, colors, method) {
        if (colors === void 0) { colors = 256; }
        if (method === void 0) { method = 2; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        // desired final palette size
        _this._colors = colors;
        // histogram to accumulate
        _this._histogram = new colorHistogram_1.ColorHistogram(method, colors);
        _this._initialDistance = 0.01;
        _this._distanceIncrement = 0.005;
        return _this;
    }
    // gathers histogram info
    RGBQuant.prototype.sample = function (image) {
        /*
         var pointArray = image.getPointArray(), max = [0, 0, 0, 0], min = [255, 255, 255, 255];
    
         for (var i = 0, l = pointArray.length; i < l; i++) {
         var color = pointArray[i];
         for (var componentIndex = 0; componentIndex < 4; componentIndex++) {
         if (max[componentIndex] < color.rgba[componentIndex]) max[componentIndex] = color.rgba[componentIndex];
         if (min[componentIndex] > color.rgba[componentIndex]) min[componentIndex] = color.rgba[componentIndex];
         }
         }
         var rd = max[0] - min[0], gd = max[1] - min[1], bd = max[2] - min[2], ad = max[3] - min[3];
         this._distance.setWhitePoint(rd, gd, bd, ad);
    
         this._initialDistance = (Math.sqrt(rd * rd + gd * gd + bd * bd + ad * ad) / Math.sqrt(255 * 255 + 255 * 255 + 255 * 255)) * 0.01;
         */
        this._histogram.sample(image);
    };
    // reduces histogram to palette, remaps & memoizes reduced colors
    RGBQuant.prototype.quantize = function () {
        var idxi32;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idxi32 = this._histogram.getImportanceSortedColorsIDXI32();
                    if (idxi32.length === 0) {
                        throw new Error('No colors in image');
                    }
                    return [5 /*yield**/, __values(this._buildPalette(idxi32))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    // reduces similar colors from an importance-sorted Uint32 rgba array
    RGBQuant.prototype._buildPalette = function (idxi32) {
        var palette, colorArray, usageArray, i, len, memDist, palLen, thold, tracker, i, pxi, j, pxj, dist, k, removedColor, colors, colorIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    palette = new palette_1.Palette();
                    colorArray = palette.getPointContainer().getPointArray();
                    usageArray = new Array(idxi32.length);
                    for (i = 0; i < idxi32.length; i++) {
                        colorArray.push(point_1.Point.createByUint32(idxi32[i]));
                        usageArray[i] = 1;
                    }
                    len = colorArray.length;
                    memDist = [];
                    palLen = len;
                    thold = this._initialDistance;
                    tracker = new utils_1.ProgressTracker(palLen - this._colors, 99);
                    _a.label = 1;
                case 1:
                    if (!(palLen > this._colors)) return [3 /*break*/, 7];
                    memDist.length = 0;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < len)) return [3 /*break*/, 6];
                    if (!tracker.shouldNotify(len - palLen)) return [3 /*break*/, 4];
                    return [4 /*yield*/, {
                            progress: tracker.progress
                        }];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (usageArray[i] === 0)
                        return [3 /*break*/, 5];
                    pxi = colorArray[i];
                    // if (!pxi) continue;
                    for (j = i + 1; j < len; j++) {
                        if (usageArray[j] === 0)
                            continue;
                        pxj = colorArray[j];
                        dist = this._distance.calculateNormalized(pxi, pxj);
                        if (dist < thold) {
                            // store index,rgb,dist
                            memDist.push(new RemovedColor(j, pxj, dist));
                            usageArray[j] = 0;
                            palLen--;
                        }
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6:
                    // palette reduction pass
                    // console.log("palette length: " + palLen);
                    // if palette is still much larger than target, increment by larger initDist
                    thold +=
                        palLen > this._colors * 3
                            ? this._initialDistance
                            : this._distanceIncrement;
                    return [3 /*break*/, 1];
                case 7:
                    // if palette is over-reduced, re-add removed colors with largest distances from last round
                    if (palLen < this._colors) {
                        // sort descending
                        (0, arithmetic_1.stableSort)(memDist, function (a, b) { return b.distance - a.distance; });
                        k = 0;
                        while (palLen < this._colors && k < memDist.length) {
                            removedColor = memDist[k];
                            // re-inject rgb into final palette
                            usageArray[removedColor.index] = 1;
                            palLen++;
                            k++;
                        }
                    }
                    colors = colorArray.length;
                    for (colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
                        if (usageArray[colorIndex] === 0) {
                            if (colorIndex !== colors - 1) {
                                colorArray[colorIndex] = colorArray[colors - 1];
                            }
                            --colors;
                        }
                    }
                    colorArray.length = colors;
                    palette.sort();
                    return [4 /*yield*/, {
                            palette: palette,
                            progress: 100
                        }];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return RGBQuant;
}(paletteQuantizer_1.AbstractPaletteQuantizer));
exports.RGBQuant = RGBQuant;
