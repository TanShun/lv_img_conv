"use strict";
exports.__esModule = true;
exports.AbstractDistanceCalculator = void 0;
var AbstractDistanceCalculator = /** @class */ (function () {
    function AbstractDistanceCalculator() {
        this._setDefaults();
        // set default maximal color component deltas (255 - 0 = 255)
        this.setWhitePoint(255, 255, 255, 255);
    }
    AbstractDistanceCalculator.prototype.setWhitePoint = function (r, g, b, a) {
        this._whitePoint = {
            r: r > 0 ? 255 / r : 0,
            g: g > 0 ? 255 / g : 0,
            b: b > 0 ? 255 / b : 0,
            a: a > 0 ? 255 / a : 0
        };
        this._maxDistance = this.calculateRaw(r, g, b, a, 0, 0, 0, 0);
    };
    AbstractDistanceCalculator.prototype.calculateNormalized = function (colorA, colorB) {
        return (this.calculateRaw(colorA.r, colorA.g, colorA.b, colorA.a, colorB.r, colorB.g, colorB.b, colorB.a) / this._maxDistance);
    };
    return AbstractDistanceCalculator;
}());
exports.AbstractDistanceCalculator = AbstractDistanceCalculator;
