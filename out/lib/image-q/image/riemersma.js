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
exports.ErrorDiffusionRiemersma = void 0;
/**
 * @preserve
 * MIT License
 *
 * Copyright 2015-2018 Igor Bezkrovnyi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * riemersma.ts - part of Image Quantization Library
 */
var imageQuantizer_1 = require("./imageQuantizer");
var hilbertCurve_1 = require("./spaceFillingCurves/hilbertCurve");
var point_1 = require("../utils/point");
var arithmetic_1 = require("../utils/arithmetic");
var ErrorDiffusionRiemersma = /** @class */ (function (_super) {
    __extends(ErrorDiffusionRiemersma, _super);
    function ErrorDiffusionRiemersma(colorDistanceCalculator, errorQueueSize, errorPropagation) {
        if (errorQueueSize === void 0) { errorQueueSize = 16; }
        if (errorPropagation === void 0) { errorPropagation = 1; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._errorQueueSize = errorQueueSize;
        _this._weights = ErrorDiffusionRiemersma._createWeights(errorPropagation, errorQueueSize);
        return _this;
    }
    /**
     * Mutates pointContainer
     */
    ErrorDiffusionRiemersma.prototype.quantize = function (pointContainer, palette) {
        var pointArray, width, height, errorQueue, head, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pointArray = pointContainer.getPointArray();
                    width = pointContainer.getWidth();
                    height = pointContainer.getHeight();
                    errorQueue = [];
                    head = 0;
                    for (i = 0; i < this._errorQueueSize; i++) {
                        errorQueue[i] = { r: 0, g: 0, b: 0, a: 0 };
                    }
                    return [5 /*yield**/, __values((0, hilbertCurve_1.hilbertCurve)(width, height, function (x, y) {
                            var p = pointArray[x + y * width];
                            var r = p.r, g = p.g, b = p.b, a = p.a;
                            for (var i = 0; i < _this._errorQueueSize; i++) {
                                var weight = _this._weights[i];
                                var e = errorQueue[(i + head) % _this._errorQueueSize];
                                r += e.r * weight;
                                g += e.g * weight;
                                b += e.b * weight;
                                a += e.a * weight;
                            }
                            var correctedPoint = point_1.Point.createByRGBA((0, arithmetic_1.inRange0to255Rounded)(r), (0, arithmetic_1.inRange0to255Rounded)(g), (0, arithmetic_1.inRange0to255Rounded)(b), (0, arithmetic_1.inRange0to255Rounded)(a));
                            var quantizedPoint = palette.getNearestColor(_this._distance, correctedPoint);
                            // update head and calculate tail
                            head = (head + 1) % _this._errorQueueSize;
                            var tail = (head + _this._errorQueueSize - 1) % _this._errorQueueSize;
                            // update error with new value
                            errorQueue[tail].r = p.r - quantizedPoint.r;
                            errorQueue[tail].g = p.g - quantizedPoint.g;
                            errorQueue[tail].b = p.b - quantizedPoint.b;
                            errorQueue[tail].a = p.a - quantizedPoint.a;
                            // update point
                            p.from(quantizedPoint);
                        }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, {
                            pointContainer: pointContainer,
                            progress: 100
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    ErrorDiffusionRiemersma._createWeights = function (errorPropagation, errorQueueSize) {
        var weights = [];
        var multiplier = Math.exp(Math.log(errorQueueSize) / (errorQueueSize - 1));
        for (var i = 0, next = 1; i < errorQueueSize; i++) {
            weights[i] = (((next + 0.5) | 0) / errorQueueSize) * errorPropagation;
            next *= multiplier;
        }
        return weights;
    };
    return ErrorDiffusionRiemersma;
}(imageQuantizer_1.AbstractImageQuantizer));
exports.ErrorDiffusionRiemersma = ErrorDiffusionRiemersma;
