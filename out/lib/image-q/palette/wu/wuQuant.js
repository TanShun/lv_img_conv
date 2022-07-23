"use strict";
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
exports.WuQuant = exports.WuColorCube = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * wuQuant.ts - part of Image Quantization Library
 */
var palette_1 = require("../../utils/palette");
var point_1 = require("../../utils/point");
var paletteQuantizer_1 = require("../paletteQuantizer");
var utils_1 = require("../../utils");
function createArray1D(dimension1) {
    var a = [];
    for (var k = 0; k < dimension1; k++) {
        a[k] = 0;
    }
    return a;
}
function createArray4D(dimension1, dimension2, dimension3, dimension4) {
    var a = new Array(dimension1);
    for (var i = 0; i < dimension1; i++) {
        a[i] = new Array(dimension2);
        for (var j = 0; j < dimension2; j++) {
            a[i][j] = new Array(dimension3);
            for (var k = 0; k < dimension3; k++) {
                a[i][j][k] = new Array(dimension4);
                for (var l = 0; l < dimension4; l++) {
                    a[i][j][k][l] = 0;
                }
            }
        }
    }
    return a;
}
function createArray3D(dimension1, dimension2, dimension3) {
    var a = new Array(dimension1);
    for (var i = 0; i < dimension1; i++) {
        a[i] = new Array(dimension2);
        for (var j = 0; j < dimension2; j++) {
            a[i][j] = new Array(dimension3);
            for (var k = 0; k < dimension3; k++) {
                a[i][j][k] = 0;
            }
        }
    }
    return a;
}
function fillArray3D(a, dimension1, dimension2, dimension3, value) {
    for (var i = 0; i < dimension1; i++) {
        a[i] = [];
        for (var j = 0; j < dimension2; j++) {
            a[i][j] = [];
            for (var k = 0; k < dimension3; k++) {
                a[i][j][k] = value;
            }
        }
    }
}
function fillArray1D(a, dimension1, value) {
    for (var i = 0; i < dimension1; i++) {
        a[i] = value;
    }
}
var WuColorCube = /** @class */ (function () {
    function WuColorCube() {
    }
    return WuColorCube;
}());
exports.WuColorCube = WuColorCube;
var WuQuant = /** @class */ (function (_super) {
    __extends(WuQuant, _super);
    function WuQuant(colorDistanceCalculator, colors, significantBitsPerChannel) {
        if (colors === void 0) { colors = 256; }
        if (significantBitsPerChannel === void 0) { significantBitsPerChannel = 5; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._setQuality(significantBitsPerChannel);
        _this._initialize(colors);
        return _this;
    }
    WuQuant.prototype.sample = function (image) {
        var pointArray = image.getPointArray();
        for (var i = 0, l = pointArray.length; i < l; i++) {
            this._addColor(pointArray[i]);
        }
        this._pixels = this._pixels.concat(pointArray);
    };
    WuQuant.prototype.quantize = function () {
        var palette, paletteIndex, sum, r, g, b, a, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(this._preparePalette())];
                case 1:
                    _a.sent();
                    palette = new palette_1.Palette();
                    // generates palette
                    for (paletteIndex = 0; paletteIndex < this._colors; paletteIndex++) {
                        if (this._sums[paletteIndex] > 0) {
                            sum = this._sums[paletteIndex];
                            r = this._reds[paletteIndex] / sum;
                            g = this._greens[paletteIndex] / sum;
                            b = this._blues[paletteIndex] / sum;
                            a = this._alphas[paletteIndex] / sum;
                            color = point_1.Point.createByRGBA(r | 0, g | 0, b | 0, a | 0);
                            palette.add(color);
                        }
                    }
                    palette.sort();
                    return [4 /*yield*/, {
                            palette: palette,
                            progress: 100
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    WuQuant.prototype._preparePalette = function () {
        var next, volumeVariance, cubeIndex, temp, index, lookupRed, lookupGreen, lookupBlue, lookupAlpha, k, weight, index, l, color, match, bestMatch, bestDistance, lookup, foundRed, foundGreen, foundBlue, foundAlpha, distance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // preprocess the colors
                return [5 /*yield**/, __values(this._calculateMoments())];
                case 1:
                    // preprocess the colors
                    _a.sent();
                    next = 0;
                    volumeVariance = createArray1D(this._colors);
                    // processes the cubes
                    for (cubeIndex = 1; cubeIndex < this._colors; ++cubeIndex) {
                        // if cut is possible; make it
                        if (this._cut(this._cubes[next], this._cubes[cubeIndex])) {
                            volumeVariance[next] =
                                this._cubes[next].volume > 1
                                    ? this._calculateVariance(this._cubes[next])
                                    : 0.0;
                            volumeVariance[cubeIndex] =
                                this._cubes[cubeIndex].volume > 1
                                    ? this._calculateVariance(this._cubes[cubeIndex])
                                    : 0.0;
                        }
                        else {
                            // the cut was not possible, revert the index
                            volumeVariance[next] = 0.0;
                            cubeIndex--;
                        }
                        next = 0;
                        temp = volumeVariance[0];
                        for (index = 1; index <= cubeIndex; ++index) {
                            if (volumeVariance[index] > temp) {
                                temp = volumeVariance[index];
                                next = index;
                            }
                        }
                        if (temp <= 0.0) {
                            this._colors = cubeIndex + 1;
                            break;
                        }
                    }
                    lookupRed = [];
                    lookupGreen = [];
                    lookupBlue = [];
                    lookupAlpha = [];
                    // precalculates lookup tables
                    for (k = 0; k < this._colors; ++k) {
                        weight = WuQuant._volume(this._cubes[k], this._weights);
                        if (weight > 0) {
                            lookupRed[k] =
                                (WuQuant._volume(this._cubes[k], this._momentsRed) / weight) | 0;
                            lookupGreen[k] =
                                (WuQuant._volume(this._cubes[k], this._momentsGreen) / weight) | 0;
                            lookupBlue[k] =
                                (WuQuant._volume(this._cubes[k], this._momentsBlue) / weight) | 0;
                            lookupAlpha[k] =
                                (WuQuant._volume(this._cubes[k], this._momentsAlpha) / weight) | 0;
                        }
                        else {
                            lookupRed[k] = 0;
                            lookupGreen[k] = 0;
                            lookupBlue[k] = 0;
                            lookupAlpha[k] = 0;
                        }
                    }
                    this._reds = createArray1D(this._colors + 1);
                    this._greens = createArray1D(this._colors + 1);
                    this._blues = createArray1D(this._colors + 1);
                    this._alphas = createArray1D(this._colors + 1);
                    this._sums = createArray1D(this._colors + 1);
                    // scans and adds colors
                    for (index = 0, l = this._pixels.length; index < l; index++) {
                        color = this._pixels[index];
                        match = -1;
                        bestMatch = match;
                        bestDistance = Number.MAX_VALUE;
                        for (lookup = 0; lookup < this._colors; lookup++) {
                            foundRed = lookupRed[lookup];
                            foundGreen = lookupGreen[lookup];
                            foundBlue = lookupBlue[lookup];
                            foundAlpha = lookupAlpha[lookup];
                            distance = this._distance.calculateRaw(foundRed, foundGreen, foundBlue, foundAlpha, color.r, color.g, color.b, color.a);
                            if (distance < bestDistance) {
                                bestDistance = distance;
                                bestMatch = lookup;
                            }
                        }
                        this._reds[bestMatch] += color.r;
                        this._greens[bestMatch] += color.g;
                        this._blues[bestMatch] += color.b;
                        this._alphas[bestMatch] += color.a;
                        this._sums[bestMatch]++;
                    }
                    return [2 /*return*/];
            }
        });
    };
    WuQuant.prototype._addColor = function (color) {
        var bitsToRemove = 8 - this._significantBitsPerChannel;
        var indexRed = (color.r >> bitsToRemove) + 1;
        var indexGreen = (color.g >> bitsToRemove) + 1;
        var indexBlue = (color.b >> bitsToRemove) + 1;
        var indexAlpha = (color.a >> bitsToRemove) + 1;
        // if(color.a > 10) {
        this._weights[indexAlpha][indexRed][indexGreen][indexBlue]++;
        this._momentsRed[indexAlpha][indexRed][indexGreen][indexBlue] += color.r;
        this._momentsGreen[indexAlpha][indexRed][indexGreen][indexBlue] += color.g;
        this._momentsBlue[indexAlpha][indexRed][indexGreen][indexBlue] += color.b;
        this._momentsAlpha[indexAlpha][indexRed][indexGreen][indexBlue] += color.a;
        this._moments[indexAlpha][indexRed][indexGreen][indexBlue] +=
            this._table[color.r] +
                this._table[color.g] +
                this._table[color.b] +
                this._table[color.a];
        // }
    };
    /**
     * Converts the histogram to a series of _moments.
     */
    WuQuant.prototype._calculateMoments = function () {
        var area, areaRed, areaGreen, areaBlue, areaAlpha, area2, xarea, xareaRed, xareaGreen, xareaBlue, xareaAlpha, xarea2, trackerProgress, tracker, alphaIndex, redIndex, greenIndex, line, lineRed, lineGreen, lineBlue, lineAlpha, line2, blueIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    area = [];
                    areaRed = [];
                    areaGreen = [];
                    areaBlue = [];
                    areaAlpha = [];
                    area2 = [];
                    xarea = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaRed = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaGreen = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaBlue = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xareaAlpha = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    xarea2 = createArray3D(this._sideSize, this._sideSize, this._sideSize);
                    trackerProgress = 0;
                    tracker = new utils_1.ProgressTracker(this._alphaMaxSideIndex * this._maxSideIndex, 99);
                    alphaIndex = 1;
                    _a.label = 1;
                case 1:
                    if (!(alphaIndex <= this._alphaMaxSideIndex)) return [3 /*break*/, 7];
                    fillArray3D(xarea, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaRed, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaGreen, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaBlue, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xareaAlpha, this._sideSize, this._sideSize, this._sideSize, 0);
                    fillArray3D(xarea2, this._sideSize, this._sideSize, this._sideSize, 0);
                    redIndex = 1;
                    _a.label = 2;
                case 2:
                    if (!(redIndex <= this._maxSideIndex)) return [3 /*break*/, 6];
                    if (!tracker.shouldNotify(trackerProgress)) return [3 /*break*/, 4];
                    return [4 /*yield*/, {
                            progress: tracker.progress
                        }];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    fillArray1D(area, this._sideSize, 0);
                    fillArray1D(areaRed, this._sideSize, 0);
                    fillArray1D(areaGreen, this._sideSize, 0);
                    fillArray1D(areaBlue, this._sideSize, 0);
                    fillArray1D(areaAlpha, this._sideSize, 0);
                    fillArray1D(area2, this._sideSize, 0);
                    for (greenIndex = 1; greenIndex <= this._maxSideIndex; ++greenIndex) {
                        line = 0;
                        lineRed = 0;
                        lineGreen = 0;
                        lineBlue = 0;
                        lineAlpha = 0;
                        line2 = 0.0;
                        for (blueIndex = 1; blueIndex <= this._maxSideIndex; ++blueIndex) {
                            line += this._weights[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineRed += this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineGreen += this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineBlue += this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex];
                            lineAlpha += this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex];
                            line2 += this._moments[alphaIndex][redIndex][greenIndex][blueIndex];
                            area[blueIndex] += line;
                            areaRed[blueIndex] += lineRed;
                            areaGreen[blueIndex] += lineGreen;
                            areaBlue[blueIndex] += lineBlue;
                            areaAlpha[blueIndex] += lineAlpha;
                            area2[blueIndex] += line2;
                            xarea[redIndex][greenIndex][blueIndex] =
                                xarea[redIndex - 1][greenIndex][blueIndex] + area[blueIndex];
                            xareaRed[redIndex][greenIndex][blueIndex] =
                                xareaRed[redIndex - 1][greenIndex][blueIndex] +
                                    areaRed[blueIndex];
                            xareaGreen[redIndex][greenIndex][blueIndex] =
                                xareaGreen[redIndex - 1][greenIndex][blueIndex] +
                                    areaGreen[blueIndex];
                            xareaBlue[redIndex][greenIndex][blueIndex] =
                                xareaBlue[redIndex - 1][greenIndex][blueIndex] +
                                    areaBlue[blueIndex];
                            xareaAlpha[redIndex][greenIndex][blueIndex] =
                                xareaAlpha[redIndex - 1][greenIndex][blueIndex] +
                                    areaAlpha[blueIndex];
                            xarea2[redIndex][greenIndex][blueIndex] =
                                xarea2[redIndex - 1][greenIndex][blueIndex] + area2[blueIndex];
                            this._weights[alphaIndex][redIndex][greenIndex][blueIndex] =
                                this._weights[alphaIndex - 1][redIndex][greenIndex][blueIndex] +
                                    xarea[redIndex][greenIndex][blueIndex];
                            this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex] =
                                this._momentsRed[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaRed[redIndex][greenIndex][blueIndex];
                            this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex] =
                                this._momentsGreen[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaGreen[redIndex][greenIndex][blueIndex];
                            this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex] =
                                this._momentsBlue[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaBlue[redIndex][greenIndex][blueIndex];
                            this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex] =
                                this._momentsAlpha[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaAlpha[redIndex][greenIndex][blueIndex];
                            this._moments[alphaIndex][redIndex][greenIndex][blueIndex] =
                                this._moments[alphaIndex - 1][redIndex][greenIndex][blueIndex] +
                                    xarea2[redIndex][greenIndex][blueIndex];
                        }
                    }
                    _a.label = 5;
                case 5:
                    ++redIndex, ++trackerProgress;
                    return [3 /*break*/, 2];
                case 6:
                    ++alphaIndex;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    };
    /**
     * Computes the volume of the cube in a specific moment.
     */
    WuQuant._volumeFloat = function (cube, moment) {
        return (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] -
            moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
            moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
            moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] +
            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
            (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
                moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
                moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
                moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] -
                moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]));
    };
    /**
     * Computes the volume of the cube in a specific moment.
     */
    WuQuant._volume = function (cube, moment) {
        return WuQuant._volumeFloat(cube, moment) | 0;
    };
    /**
     * Splits the cube in given position][and color direction.
     */
    WuQuant._top = function (cube, direction, position, moment) {
        var result;
        switch (direction) {
            case WuQuant._alpha:
                result =
                    moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] -
                        moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
                        moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
                        moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
                        (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] -
                            moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
                            moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                            moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
                break;
            case WuQuant._red:
                result =
                    moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMaximum] -
                        moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMaximum] -
                        moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMaximum] +
                        moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMaximum] -
                        (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMinimum] -
                            moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMinimum] -
                            moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMinimum] +
                            moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMinimum]);
                break;
            case WuQuant._green:
                result =
                    moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMaximum] -
                        moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMaximum] -
                        moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMaximum] +
                        moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMaximum] -
                        (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMinimum] -
                            moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMinimum] -
                            moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMinimum] +
                            moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMinimum]);
                break;
            case WuQuant._blue:
                result =
                    moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][position] -
                        moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][position] -
                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][position] +
                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][position] -
                        (moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][position] -
                            moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][position] -
                            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][position] +
                            moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][position]);
                break;
            default:
                throw new Error('impossible');
        }
        return result | 0;
    };
    /**
     * Splits the cube in a given color direction at its minimum.
     */
    WuQuant._bottom = function (cube, direction, moment) {
        switch (direction) {
            case WuQuant._alpha:
                return (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
                    (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]));
            case WuQuant._red:
                return (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
                    (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]));
            case WuQuant._green:
                return (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] +
                    moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] -
                    moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] -
                    (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]));
            case WuQuant._blue:
                return (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
                    moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                    moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] -
                    (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] +
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] -
                        moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]));
            default:
                // TODO: why here is return 0, and in this._top there is no default at all (now it is throw error)?
                return 0;
        }
    };
    /**
     * Calculates statistical variance for a given cube.
     */
    WuQuant.prototype._calculateVariance = function (cube) {
        var volumeRed = WuQuant._volume(cube, this._momentsRed);
        var volumeGreen = WuQuant._volume(cube, this._momentsGreen);
        var volumeBlue = WuQuant._volume(cube, this._momentsBlue);
        var volumeAlpha = WuQuant._volume(cube, this._momentsAlpha);
        var volumeMoment = WuQuant._volumeFloat(cube, this._moments);
        var volumeWeight = WuQuant._volume(cube, this._weights);
        var distance = volumeRed * volumeRed +
            volumeGreen * volumeGreen +
            volumeBlue * volumeBlue +
            volumeAlpha * volumeAlpha;
        return volumeMoment - distance / volumeWeight;
    };
    /**
     * Finds the optimal (maximal) position for the cut.
     */
    WuQuant.prototype._maximize = function (cube, direction, first, last, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight) {
        var bottomRed = WuQuant._bottom(cube, direction, this._momentsRed) | 0;
        var bottomGreen = WuQuant._bottom(cube, direction, this._momentsGreen) | 0;
        var bottomBlue = WuQuant._bottom(cube, direction, this._momentsBlue) | 0;
        var bottomAlpha = WuQuant._bottom(cube, direction, this._momentsAlpha) | 0;
        var bottomWeight = WuQuant._bottom(cube, direction, this._weights) | 0;
        var result = 0.0;
        var cutPosition = -1;
        for (var position = first; position < last; ++position) {
            // determines the cube cut at a certain position
            var halfRed = bottomRed + WuQuant._top(cube, direction, position, this._momentsRed);
            var halfGreen = bottomGreen +
                WuQuant._top(cube, direction, position, this._momentsGreen);
            var halfBlue = bottomBlue + WuQuant._top(cube, direction, position, this._momentsBlue);
            var halfAlpha = bottomAlpha +
                WuQuant._top(cube, direction, position, this._momentsAlpha);
            var halfWeight = bottomWeight + WuQuant._top(cube, direction, position, this._weights);
            // the cube cannot be cut at bottom (this would lead to empty cube)
            if (halfWeight !== 0) {
                var halfDistance = halfRed * halfRed +
                    halfGreen * halfGreen +
                    halfBlue * halfBlue +
                    halfAlpha * halfAlpha;
                var temp = halfDistance / halfWeight;
                halfRed = wholeRed - halfRed;
                halfGreen = wholeGreen - halfGreen;
                halfBlue = wholeBlue - halfBlue;
                halfAlpha = wholeAlpha - halfAlpha;
                halfWeight = wholeWeight - halfWeight;
                if (halfWeight !== 0) {
                    halfDistance =
                        halfRed * halfRed +
                            halfGreen * halfGreen +
                            halfBlue * halfBlue +
                            halfAlpha * halfAlpha;
                    temp += halfDistance / halfWeight;
                    if (temp > result) {
                        result = temp;
                        cutPosition = position;
                    }
                }
            }
        }
        return { max: result, position: cutPosition };
    };
    // Cuts a cube with another one.
    WuQuant.prototype._cut = function (first, second) {
        var direction;
        var wholeRed = WuQuant._volume(first, this._momentsRed);
        var wholeGreen = WuQuant._volume(first, this._momentsGreen);
        var wholeBlue = WuQuant._volume(first, this._momentsBlue);
        var wholeAlpha = WuQuant._volume(first, this._momentsAlpha);
        var wholeWeight = WuQuant._volume(first, this._weights);
        var red = this._maximize(first, WuQuant._red, first.redMinimum + 1, first.redMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        var green = this._maximize(first, WuQuant._green, first.greenMinimum + 1, first.greenMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        var blue = this._maximize(first, WuQuant._blue, first.blueMinimum + 1, first.blueMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        var alpha = this._maximize(first, WuQuant._alpha, first.alphaMinimum + 1, first.alphaMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
        if (alpha.max >= red.max &&
            alpha.max >= green.max &&
            alpha.max >= blue.max) {
            direction = WuQuant._alpha;
            // cannot split empty cube
            if (alpha.position < 0)
                return false;
        }
        else if (red.max >= alpha.max &&
            red.max >= green.max &&
            red.max >= blue.max) {
            direction = WuQuant._red;
        }
        else if (green.max >= alpha.max &&
            green.max >= red.max &&
            green.max >= blue.max) {
            direction = WuQuant._green;
        }
        else {
            direction = WuQuant._blue;
        }
        second.redMaximum = first.redMaximum;
        second.greenMaximum = first.greenMaximum;
        second.blueMaximum = first.blueMaximum;
        second.alphaMaximum = first.alphaMaximum;
        // cuts in a certain direction
        // eslint-disable-next-line default-case
        switch (direction) {
            case WuQuant._red:
                second.redMinimum = first.redMaximum = red.position;
                second.greenMinimum = first.greenMinimum;
                second.blueMinimum = first.blueMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;
            case WuQuant._green:
                second.greenMinimum = first.greenMaximum = green.position;
                second.redMinimum = first.redMinimum;
                second.blueMinimum = first.blueMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;
            case WuQuant._blue:
                second.blueMinimum = first.blueMaximum = blue.position;
                second.redMinimum = first.redMinimum;
                second.greenMinimum = first.greenMinimum;
                second.alphaMinimum = first.alphaMinimum;
                break;
            case WuQuant._alpha:
                second.alphaMinimum = first.alphaMaximum = alpha.position;
                second.blueMinimum = first.blueMinimum;
                second.redMinimum = first.redMinimum;
                second.greenMinimum = first.greenMinimum;
                break;
        }
        // determines the volumes after cut
        first.volume =
            (first.redMaximum - first.redMinimum) *
                (first.greenMaximum - first.greenMinimum) *
                (first.blueMaximum - first.blueMinimum) *
                (first.alphaMaximum - first.alphaMinimum);
        second.volume =
            (second.redMaximum - second.redMinimum) *
                (second.greenMaximum - second.greenMinimum) *
                (second.blueMaximum - second.blueMinimum) *
                (second.alphaMaximum - second.alphaMinimum);
        // the cut was successful
        return true;
    };
    WuQuant.prototype._initialize = function (colors) {
        this._colors = colors;
        // creates all the _cubes
        this._cubes = [];
        // initializes all the _cubes
        for (var cubeIndex = 0; cubeIndex < colors; cubeIndex++) {
            this._cubes[cubeIndex] = new WuColorCube();
        }
        // resets the reference minimums
        this._cubes[0].redMinimum = 0;
        this._cubes[0].greenMinimum = 0;
        this._cubes[0].blueMinimum = 0;
        this._cubes[0].alphaMinimum = 0;
        // resets the reference maximums
        this._cubes[0].redMaximum = this._maxSideIndex;
        this._cubes[0].greenMaximum = this._maxSideIndex;
        this._cubes[0].blueMaximum = this._maxSideIndex;
        this._cubes[0].alphaMaximum = this._alphaMaxSideIndex;
        this._weights = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsRed = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsGreen = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsBlue = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._momentsAlpha = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._moments = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
        this._table = [];
        for (var tableIndex = 0; tableIndex < 256; ++tableIndex) {
            this._table[tableIndex] = tableIndex * tableIndex;
        }
        this._pixels = [];
    };
    WuQuant.prototype._setQuality = function (significantBitsPerChannel) {
        if (significantBitsPerChannel === void 0) { significantBitsPerChannel = 5; }
        this._significantBitsPerChannel = significantBitsPerChannel;
        this._maxSideIndex = 1 << this._significantBitsPerChannel;
        this._alphaMaxSideIndex = this._maxSideIndex;
        this._sideSize = this._maxSideIndex + 1;
        this._alphaSideSize = this._alphaMaxSideIndex + 1;
    };
    WuQuant._alpha = 3;
    WuQuant._red = 2;
    WuQuant._green = 1;
    WuQuant._blue = 0;
    return WuQuant;
}(paletteQuantizer_1.AbstractPaletteQuantizer));
exports.WuQuant = WuQuant;
