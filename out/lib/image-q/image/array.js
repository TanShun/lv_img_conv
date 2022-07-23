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
exports.ErrorDiffusionArray = exports.ErrorDiffusionArrayKernel = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ditherErrorDiffusionArray.ts - part of Image Quantization Library
 */
var imageQuantizer_1 = require("./imageQuantizer");
var point_1 = require("../utils/point");
var arithmetic_1 = require("../utils/arithmetic");
var progressTracker_1 = require("../utils/progressTracker");
// TODO: is it the best name for this enum "kernel"?
var ErrorDiffusionArrayKernel;
(function (ErrorDiffusionArrayKernel) {
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FloydSteinberg"] = 0] = "FloydSteinberg";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["FalseFloydSteinberg"] = 1] = "FalseFloydSteinberg";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Stucki"] = 2] = "Stucki";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Atkinson"] = 3] = "Atkinson";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Jarvis"] = 4] = "Jarvis";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Burkes"] = 5] = "Burkes";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["Sierra"] = 6] = "Sierra";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["TwoSierra"] = 7] = "TwoSierra";
    ErrorDiffusionArrayKernel[ErrorDiffusionArrayKernel["SierraLite"] = 8] = "SierraLite";
})(ErrorDiffusionArrayKernel = exports.ErrorDiffusionArrayKernel || (exports.ErrorDiffusionArrayKernel = {}));
// http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
var ErrorDiffusionArray = /** @class */ (function (_super) {
    __extends(ErrorDiffusionArray, _super);
    function ErrorDiffusionArray(colorDistanceCalculator, kernel, serpentine, minimumColorDistanceToDither, calculateErrorLikeGIMP) {
        if (serpentine === void 0) { serpentine = true; }
        if (minimumColorDistanceToDither === void 0) { minimumColorDistanceToDither = 0; }
        if (calculateErrorLikeGIMP === void 0) { calculateErrorLikeGIMP = false; }
        var _this = _super.call(this) || this;
        _this._setKernel(kernel);
        _this._distance = colorDistanceCalculator;
        _this._minColorDistance = minimumColorDistanceToDither;
        _this._serpentine = serpentine;
        _this._calculateErrorLikeGIMP = calculateErrorLikeGIMP;
        return _this;
    }
    /**
     * adapted from http://jsbin.com/iXofIji/2/edit by PAEz
     * fixed version. it doesn't use image pixels as error storage, also it doesn't have 0.3 + 0.3 + 0.3 + 0.3 = 0 error
     * Mutates pointContainer
     */
    ErrorDiffusionArray.prototype.quantize = function (pointContainer, palette) {
        var pointArray, originalPoint, width, height, errorLines, dir, maxErrorLines, _a, _b, kernel, kernelErrorLines, i, tracker, y, lni, xStart, xEnd, errorLine, x, idx, point, error, correctedPoint, palettePoint, dist, er, eg, eb, ea, dStart, dEnd, i, x1, y1, d, e;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    pointArray = pointContainer.getPointArray();
                    originalPoint = new point_1.Point();
                    width = pointContainer.getWidth();
                    height = pointContainer.getHeight();
                    errorLines = [];
                    dir = 1;
                    maxErrorLines = 1;
                    try {
                        // initial error lines (number is taken from dithering kernel)
                        for (_a = __values(this._kernel), _b = _a.next(); !_b.done; _b = _a.next()) {
                            kernel = _b.value;
                            kernelErrorLines = kernel[2] + 1;
                            if (maxErrorLines < kernelErrorLines)
                                maxErrorLines = kernelErrorLines;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    for (i = 0; i < maxErrorLines; i++) {
                        this._fillErrorLine((errorLines[i] = []), width);
                    }
                    tracker = new progressTracker_1.ProgressTracker(height, 99);
                    y = 0;
                    _d.label = 1;
                case 1:
                    if (!(y < height)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(y)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress
                        }];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    // always serpentine
                    if (this._serpentine)
                        dir *= -1;
                    lni = y * width;
                    xStart = dir === 1 ? 0 : width - 1;
                    xEnd = dir === 1 ? width : -1;
                    // cyclic shift with erasing
                    this._fillErrorLine(errorLines[0], width);
                    // TODO: why it is needed to cast types here?
                    errorLines.push(errorLines.shift());
                    errorLine = errorLines[0];
                    for (x = xStart, idx = lni + xStart; x !== xEnd; x += dir, idx += dir) {
                        point = pointArray[idx];
                        error = errorLine[x];
                        originalPoint.from(point);
                        correctedPoint = point_1.Point.createByRGBA((0, arithmetic_1.inRange0to255Rounded)(point.r + error[0]), (0, arithmetic_1.inRange0to255Rounded)(point.g + error[1]), (0, arithmetic_1.inRange0to255Rounded)(point.b + error[2]), (0, arithmetic_1.inRange0to255Rounded)(point.a + error[3]));
                        palettePoint = palette.getNearestColor(this._distance, correctedPoint);
                        point.from(palettePoint);
                        // dithering strength
                        if (this._minColorDistance) {
                            dist = this._distance.calculateNormalized(point, palettePoint);
                            if (dist < this._minColorDistance)
                                continue;
                        }
                        er = void 0;
                        eg = void 0;
                        eb = void 0;
                        ea = void 0;
                        if (this._calculateErrorLikeGIMP) {
                            er = correctedPoint.r - palettePoint.r;
                            eg = correctedPoint.g - palettePoint.g;
                            eb = correctedPoint.b - palettePoint.b;
                            ea = correctedPoint.a - palettePoint.a;
                        }
                        else {
                            er = originalPoint.r - palettePoint.r;
                            eg = originalPoint.g - palettePoint.g;
                            eb = originalPoint.b - palettePoint.b;
                            ea = originalPoint.a - palettePoint.a;
                        }
                        dStart = dir === 1 ? 0 : this._kernel.length - 1;
                        dEnd = dir === 1 ? this._kernel.length : -1;
                        for (i = dStart; i !== dEnd; i += dir) {
                            x1 = this._kernel[i][1] * dir;
                            y1 = this._kernel[i][2];
                            if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
                                d = this._kernel[i][0];
                                e = errorLines[y1][x1 + x];
                                e[0] += er * d;
                                e[1] += eg * d;
                                e[2] += eb * d;
                                e[3] += ea * d;
                            }
                        }
                    }
                    _d.label = 4;
                case 4:
                    y++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, {
                        pointContainer: pointContainer,
                        progress: 100
                    }];
                case 6:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    };
    ErrorDiffusionArray.prototype._fillErrorLine = function (errorLine, width) {
        // shrink
        if (errorLine.length > width) {
            errorLine.length = width;
        }
        // reuse existing arrays
        var l = errorLine.length;
        for (var i = 0; i < l; i++) {
            var error = errorLine[i];
            error[0] = error[1] = error[2] = error[3] = 0;
        }
        // create missing arrays
        for (var i = l; i < width; i++) {
            errorLine[i] = [0.0, 0.0, 0.0, 0.0];
        }
    };
    ErrorDiffusionArray.prototype._setKernel = function (kernel) {
        switch (kernel) {
            case ErrorDiffusionArrayKernel.FloydSteinberg:
                this._kernel = [
                    [7 / 16, 1, 0],
                    [3 / 16, -1, 1],
                    [5 / 16, 0, 1],
                    [1 / 16, 1, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.FalseFloydSteinberg:
                this._kernel = [[3 / 8, 1, 0], [3 / 8, 0, 1], [2 / 8, 1, 1]];
                break;
            case ErrorDiffusionArrayKernel.Stucki:
                this._kernel = [
                    [8 / 42, 1, 0],
                    [4 / 42, 2, 0],
                    [2 / 42, -2, 1],
                    [4 / 42, -1, 1],
                    [8 / 42, 0, 1],
                    [4 / 42, 1, 1],
                    [2 / 42, 2, 1],
                    [1 / 42, -2, 2],
                    [2 / 42, -1, 2],
                    [4 / 42, 0, 2],
                    [2 / 42, 1, 2],
                    [1 / 42, 2, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.Atkinson:
                this._kernel = [
                    [1 / 8, 1, 0],
                    [1 / 8, 2, 0],
                    [1 / 8, -1, 1],
                    [1 / 8, 0, 1],
                    [1 / 8, 1, 1],
                    [1 / 8, 0, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.Jarvis:
                this._kernel = [
                    // Jarvis, Judice, and Ninke / JJN?
                    [7 / 48, 1, 0],
                    [5 / 48, 2, 0],
                    [3 / 48, -2, 1],
                    [5 / 48, -1, 1],
                    [7 / 48, 0, 1],
                    [5 / 48, 1, 1],
                    [3 / 48, 2, 1],
                    [1 / 48, -2, 2],
                    [3 / 48, -1, 2],
                    [5 / 48, 0, 2],
                    [3 / 48, 1, 2],
                    [1 / 48, 2, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.Burkes:
                this._kernel = [
                    [8 / 32, 1, 0],
                    [4 / 32, 2, 0],
                    [2 / 32, -2, 1],
                    [4 / 32, -1, 1],
                    [8 / 32, 0, 1],
                    [4 / 32, 1, 1],
                    [2 / 32, 2, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.Sierra:
                this._kernel = [
                    [5 / 32, 1, 0],
                    [3 / 32, 2, 0],
                    [2 / 32, -2, 1],
                    [4 / 32, -1, 1],
                    [5 / 32, 0, 1],
                    [4 / 32, 1, 1],
                    [2 / 32, 2, 1],
                    [2 / 32, -1, 2],
                    [3 / 32, 0, 2],
                    [2 / 32, 1, 2],
                ];
                break;
            case ErrorDiffusionArrayKernel.TwoSierra:
                this._kernel = [
                    [4 / 16, 1, 0],
                    [3 / 16, 2, 0],
                    [1 / 16, -2, 1],
                    [2 / 16, -1, 1],
                    [3 / 16, 0, 1],
                    [2 / 16, 1, 1],
                    [1 / 16, 2, 1],
                ];
                break;
            case ErrorDiffusionArrayKernel.SierraLite:
                this._kernel = [[2 / 4, 1, 0], [1 / 4, -1, 1], [1 / 4, 0, 1]];
                break;
            default:
                throw new Error("ErrorDiffusionArray: unknown kernel = ".concat(kernel));
        }
    };
    return ErrorDiffusionArray;
}(imageQuantizer_1.AbstractImageQuantizer));
exports.ErrorDiffusionArray = ErrorDiffusionArray;
