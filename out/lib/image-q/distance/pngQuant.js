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
exports.PNGQuant = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pngQuant.ts - part of Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
/**
 * TODO: check quality of this distance equation
 * TODO: ask author for usage rights
 * taken from:
 * {@link http://stackoverflow.com/questions/4754506/color-similarity-distance-in-rgba-color-space/8796867#8796867}
 * {@link https://github.com/pornel/pngquant/blob/cc39b47799a7ff2ef17b529f9415ff6e6b213b8f/lib/pam.h#L148}
 */
var PNGQuant = /** @class */ (function (_super) {
    __extends(PNGQuant, _super);
    function PNGQuant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Author's comments
     * px_b.rgb = px.rgb + 0*(1-px.a) // blend px on black
     * px_b.a   = px.a   + 1*(1-px.a)
     * px_w.rgb = px.rgb + 1*(1-px.a) // blend px on white
     * px_w.a   = px.a   + 1*(1-px.a)
     *
     * px_b.rgb = px.rgb              // difference same as in opaque RGB
     * px_b.a   = 1
     * px_w.rgb = px.rgb - px.a       // difference simplifies to formula below
     * px_w.a   = 1
     *
     * (px.rgb - px.a) - (py.rgb - py.a)
     * (px.rgb - py.rgb) + (py.a - px.a)
     *
     */
    PNGQuant.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var alphas = (a2 - a1) * this._whitePoint.a;
        return (this._colordifferenceCh(r1 * this._whitePoint.r, r2 * this._whitePoint.r, alphas) +
            this._colordifferenceCh(g1 * this._whitePoint.g, g2 * this._whitePoint.g, alphas) +
            this._colordifferenceCh(b1 * this._whitePoint.b, b2 * this._whitePoint.b, alphas));
    };
    PNGQuant.prototype._colordifferenceCh = function (x, y, alphas) {
        // maximum of channel blended on white, and blended on black
        // premultiplied alpha and backgrounds 0/1 shorten the formula
        var black = x - y;
        var white = black + alphas;
        return black * black + white * white;
    };
    PNGQuant.prototype._setDefaults = function () { };
    return PNGQuant;
}(distanceCalculator_1.AbstractDistanceCalculator));
exports.PNGQuant = PNGQuant;
