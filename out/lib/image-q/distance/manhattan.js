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
exports.ManhattanBT709 = exports.ManhattanNommyde = exports.Manhattan = exports.AbstractManhattan = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * manhattanNeuQuant.ts - part of Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
var bt709_1 = require("../constants/bt709");
/**
 * Manhattan distance (NeuQuant modification) - w/o sRGB coefficients
 */
var AbstractManhattan = /** @class */ (function (_super) {
    __extends(AbstractManhattan, _super);
    function AbstractManhattan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractManhattan.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var dR = r2 - r1;
        var dG = g2 - g1;
        var dB = b2 - b1;
        var dA = a2 - a1;
        if (dR < 0)
            dR = 0 - dR;
        if (dG < 0)
            dG = 0 - dG;
        if (dB < 0)
            dB = 0 - dB;
        if (dA < 0)
            dA = 0 - dA;
        return this._kR * dR + this._kG * dG + this._kB * dB + this._kA * dA;
    };
    return AbstractManhattan;
}(distanceCalculator_1.AbstractDistanceCalculator));
exports.AbstractManhattan = AbstractManhattan;
var Manhattan = /** @class */ (function (_super) {
    __extends(Manhattan, _super);
    function Manhattan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manhattan.prototype._setDefaults = function () {
        this._kR = 1;
        this._kG = 1;
        this._kB = 1;
        this._kA = 1;
    };
    return Manhattan;
}(AbstractManhattan));
exports.Manhattan = Manhattan;
/**
 * Manhattan distance (Nommyde modification)
 * https://github.com/igor-bezkrovny/image-quantization/issues/4#issuecomment-235155320
 */
var ManhattanNommyde = /** @class */ (function (_super) {
    __extends(ManhattanNommyde, _super);
    function ManhattanNommyde() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManhattanNommyde.prototype._setDefaults = function () {
        this._kR = 0.4984;
        this._kG = 0.8625;
        this._kB = 0.2979;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    };
    return ManhattanNommyde;
}(AbstractManhattan));
exports.ManhattanNommyde = ManhattanNommyde;
/**
 * Manhattan distance (sRGB coefficients)
 */
var ManhattanBT709 = /** @class */ (function (_super) {
    __extends(ManhattanBT709, _super);
    function ManhattanBT709() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManhattanBT709.prototype._setDefaults = function () {
        this._kR = bt709_1.Y.RED;
        this._kG = bt709_1.Y.GREEN;
        this._kB = bt709_1.Y.BLUE;
        // TODO: what is the best coefficient below?
        this._kA = 1;
    };
    return ManhattanBT709;
}(AbstractManhattan));
exports.ManhattanBT709 = ManhattanBT709;
