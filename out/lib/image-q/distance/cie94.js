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
exports.CIE94GraphicArts = exports.CIE94Textiles = exports.AbstractCIE94 = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cie94.ts - part of Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
var rgb2lab_1 = require("../conversion/rgb2lab");
var arithmetic_1 = require("../utils/arithmetic");
/**
 * CIE94 method of delta-e
 * http://en.wikipedia.org/wiki/Color_difference#CIE94
 */
var AbstractCIE94 = /** @class */ (function (_super) {
    __extends(AbstractCIE94, _super);
    function AbstractCIE94() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractCIE94.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var lab1 = (0, rgb2lab_1.rgb2lab)((0, arithmetic_1.inRange0to255)(r1 * this._whitePoint.r), (0, arithmetic_1.inRange0to255)(g1 * this._whitePoint.g), (0, arithmetic_1.inRange0to255)(b1 * this._whitePoint.b));
        var lab2 = (0, rgb2lab_1.rgb2lab)((0, arithmetic_1.inRange0to255)(r2 * this._whitePoint.r), (0, arithmetic_1.inRange0to255)(g2 * this._whitePoint.g), (0, arithmetic_1.inRange0to255)(b2 * this._whitePoint.b));
        var dL = lab1.L - lab2.L;
        var dA = lab1.a - lab2.a;
        var dB = lab1.b - lab2.b;
        var c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
        var c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
        var dC = c1 - c2;
        var deltaH = dA * dA + dB * dB - dC * dC;
        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
        var dAlpha = (a2 - a1) * this._whitePoint.a * this._kA;
        // TODO: add alpha channel support
        return Math.sqrt(Math.pow((dL / this._Kl), 2) +
            Math.pow((dC / (1.0 + this._K1 * c1)), 2) +
            Math.pow((deltaH / (1.0 + this._K2 * c1)), 2) +
            Math.pow(dAlpha, 2));
    };
    return AbstractCIE94;
}(distanceCalculator_1.AbstractDistanceCalculator));
exports.AbstractCIE94 = AbstractCIE94;
var CIE94Textiles = /** @class */ (function (_super) {
    __extends(CIE94Textiles, _super);
    function CIE94Textiles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CIE94Textiles.prototype._setDefaults = function () {
        this._Kl = 2.0;
        this._K1 = 0.048;
        this._K2 = 0.014;
        this._kA = (0.25 * 50) / 255;
    };
    return CIE94Textiles;
}(AbstractCIE94));
exports.CIE94Textiles = CIE94Textiles;
var CIE94GraphicArts = /** @class */ (function (_super) {
    __extends(CIE94GraphicArts, _super);
    function CIE94GraphicArts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CIE94GraphicArts.prototype._setDefaults = function () {
        this._Kl = 1.0;
        this._K1 = 0.045;
        this._K2 = 0.015;
        this._kA = (0.25 * 100) / 255;
    };
    return CIE94GraphicArts;
}(AbstractCIE94));
exports.CIE94GraphicArts = CIE94GraphicArts;
