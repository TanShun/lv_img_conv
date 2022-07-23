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
exports.CMetric = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cmetric.ts - part of Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
/**
 * TODO: Name it: http://www.compuphase.com/cmetric.htm
 */
var CMetric = /** @class */ (function (_super) {
    __extends(CMetric, _super);
    function CMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CMetric.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var rmean = ((r1 + r2) / 2) * this._whitePoint.r;
        var r = (r1 - r2) * this._whitePoint.r;
        var g = (g1 - g2) * this._whitePoint.g;
        var b = (b1 - b2) * this._whitePoint.b;
        var dE = (((512 + rmean) * r * r) >> 8) +
            4 * g * g +
            (((767 - rmean) * b * b) >> 8);
        var dA = (a2 - a1) * this._whitePoint.a;
        return Math.sqrt(dE + dA * dA);
    };
    CMetric.prototype._setDefaults = function () { };
    return CMetric;
}(distanceCalculator_1.AbstractDistanceCalculator));
exports.CMetric = CMetric;
