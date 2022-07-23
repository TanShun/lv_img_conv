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
exports.__esModule = true;
exports.EuclideanBT709NoAlpha = exports.EuclideanBT709 = exports.Euclidean = exports.AbstractEuclidean = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * euclidean.ts - part of Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
var bt709_1 = require("../constants/bt709");
/**
 * Euclidean color distance
 */
var AbstractEuclidean = /** @class */ (function (_super) {
    __extends(AbstractEuclidean, _super);
    function AbstractEuclidean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractEuclidean.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var dR = r2 - r1;
        var dG = g2 - g1;
        var dB = b2 - b1;
        var dA = a2 - a1;
        return Math.sqrt(this._kR * dR * dR +
            this._kG * dG * dG +
            this._kB * dB * dB +
            this._kA * dA * dA);
    };
    return AbstractEuclidean;
}(distanceCalculator_1.AbstractDistanceCalculator));
exports.AbstractEuclidean = AbstractEuclidean;
var Euclidean = /** @class */ (function (_super) {
    __extends(Euclidean, _super);
    function Euclidean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Euclidean.prototype._setDefaults = function () {
        this._kR = 1;
        this._kG = 1;
        this._kB = 1;
        this._kA = 1;
    };
    return Euclidean;
}(AbstractEuclidean));
exports.Euclidean = Euclidean;
/**
 * Euclidean color distance (RGBQuant modification w Alpha)
 */
var EuclideanBT709 = /** @class */ (function (_super) {
    __extends(EuclideanBT709, _super);
    function EuclideanBT709() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EuclideanBT709.prototype._setDefaults = function () {
        this._kR = bt709_1.Y.RED;
        this._kG = bt709_1.Y.GREEN;
        this._kB = bt709_1.Y.BLUE;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    };
    return EuclideanBT709;
}(AbstractEuclidean));
exports.EuclideanBT709 = EuclideanBT709;
/**
 * Euclidean color distance (RGBQuant modification w/o Alpha)
 */
var EuclideanBT709NoAlpha = /** @class */ (function (_super) {
    __extends(EuclideanBT709NoAlpha, _super);
    function EuclideanBT709NoAlpha() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EuclideanBT709NoAlpha.prototype._setDefaults = function () {
        this._kR = bt709_1.Y.RED;
        this._kG = bt709_1.Y.GREEN;
        this._kB = bt709_1.Y.BLUE;
        this._kA = 0;
    };
    return EuclideanBT709NoAlpha;
}(AbstractEuclidean));
exports.EuclideanBT709NoAlpha = EuclideanBT709NoAlpha;
