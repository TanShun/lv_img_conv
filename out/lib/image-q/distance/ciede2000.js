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
exports.CIEDE2000 = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ciede2000.ts - part of Image Quantization Library
 */
var distanceCalculator_1 = require("./distanceCalculator");
var rgb2lab_1 = require("../conversion/rgb2lab");
var arithmetic_1 = require("../utils/arithmetic");
// tslint:disable:variable-name
// tslint:disable:naming-convention
/**
 * CIEDE2000 algorithm - Adapted from Sharma et al's MATLAB implementation at
 * http://www.ece.rochester.edu/~gsharma/ciede2000/
 */
var CIEDE2000 = /** @class */ (function (_super) {
    __extends(CIEDE2000, _super);
    function CIEDE2000() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CIEDE2000.prototype._setDefaults = function () { };
    CIEDE2000._calculatehp = function (b, ap) {
        var hp = Math.atan2(b, ap);
        if (hp >= 0)
            return hp;
        return hp + CIEDE2000._deg360InRad;
    };
    CIEDE2000._calculateRT = function (ahp, aCp) {
        var aCp_to_7 = Math.pow(aCp, 7.0);
        var R_C = 2.0 * Math.sqrt(aCp_to_7 / (aCp_to_7 + CIEDE2000._pow25to7)); // 25^7
        var delta_theta = CIEDE2000._deg30InRad *
            Math.exp(-(Math.pow(((ahp - CIEDE2000._deg275InRad) / CIEDE2000._deg25InRad), 2.0)));
        return -Math.sin(2.0 * delta_theta) * R_C;
    };
    CIEDE2000._calculateT = function (ahp) {
        return (1.0 -
            0.17 * Math.cos(ahp - CIEDE2000._deg30InRad) +
            0.24 * Math.cos(ahp * 2.0) +
            0.32 * Math.cos(ahp * 3.0 + CIEDE2000._deg6InRad) -
            0.2 * Math.cos(ahp * 4.0 - CIEDE2000._deg63InRad));
    };
    CIEDE2000._calculate_ahp = function (C1pC2p, h_bar, h1p, h2p) {
        var hpSum = h1p + h2p;
        if (C1pC2p === 0)
            return hpSum;
        if (h_bar <= CIEDE2000._deg180InRad)
            return hpSum / 2.0;
        if (hpSum < CIEDE2000._deg360InRad) {
            return (hpSum + CIEDE2000._deg360InRad) / 2.0;
        }
        return (hpSum - CIEDE2000._deg360InRad) / 2.0;
    };
    CIEDE2000._calculate_dHp = function (C1pC2p, h_bar, h2p, h1p) {
        var dhp;
        if (C1pC2p === 0) {
            dhp = 0;
        }
        else if (h_bar <= CIEDE2000._deg180InRad) {
            dhp = h2p - h1p;
        }
        else if (h2p <= h1p) {
            dhp = h2p - h1p + CIEDE2000._deg360InRad;
        }
        else {
            dhp = h2p - h1p - CIEDE2000._deg360InRad;
        }
        return 2.0 * Math.sqrt(C1pC2p) * Math.sin(dhp / 2.0);
    };
    CIEDE2000.prototype.calculateRaw = function (r1, g1, b1, a1, r2, g2, b2, a2) {
        var lab1 = (0, rgb2lab_1.rgb2lab)((0, arithmetic_1.inRange0to255)(r1 * this._whitePoint.r), (0, arithmetic_1.inRange0to255)(g1 * this._whitePoint.g), (0, arithmetic_1.inRange0to255)(b1 * this._whitePoint.b));
        var lab2 = (0, rgb2lab_1.rgb2lab)((0, arithmetic_1.inRange0to255)(r2 * this._whitePoint.r), (0, arithmetic_1.inRange0to255)(g2 * this._whitePoint.g), (0, arithmetic_1.inRange0to255)(b2 * this._whitePoint.b));
        var dA = (a2 - a1) * this._whitePoint.a * CIEDE2000._kA;
        var dE2 = this.calculateRawInLab(lab1, lab2);
        return Math.sqrt(dE2 + dA * dA);
    };
    CIEDE2000.prototype.calculateRawInLab = function (Lab1, Lab2) {
        // Get L,a,b values for color 1
        var L1 = Lab1.L;
        var a1 = Lab1.a;
        var b1 = Lab1.b;
        // Get L,a,b values for color 2
        var L2 = Lab2.L;
        var a2 = Lab2.a;
        var b2 = Lab2.b;
        // Calculate Cprime1, Cprime2, Cabbar
        var C1 = Math.sqrt(a1 * a1 + b1 * b1);
        var C2 = Math.sqrt(a2 * a2 + b2 * b2);
        var pow_a_C1_C2_to_7 = Math.pow(((C1 + C2) / 2.0), 7.0);
        var G = 0.5 *
            (1.0 -
                Math.sqrt(pow_a_C1_C2_to_7 / (pow_a_C1_C2_to_7 + CIEDE2000._pow25to7))); // 25^7
        var a1p = (1.0 + G) * a1;
        var a2p = (1.0 + G) * a2;
        var C1p = Math.sqrt(a1p * a1p + b1 * b1);
        var C2p = Math.sqrt(a2p * a2p + b2 * b2);
        var C1pC2p = C1p * C2p;
        // Angles in Degree.
        var h1p = CIEDE2000._calculatehp(b1, a1p);
        var h2p = CIEDE2000._calculatehp(b2, a2p);
        var h_bar = Math.abs(h1p - h2p);
        var dLp = L2 - L1;
        var dCp = C2p - C1p;
        var dHp = CIEDE2000._calculate_dHp(C1pC2p, h_bar, h2p, h1p);
        var ahp = CIEDE2000._calculate_ahp(C1pC2p, h_bar, h1p, h2p);
        var T = CIEDE2000._calculateT(ahp);
        var aCp = (C1p + C2p) / 2.0;
        var aLp_minus_50_square = Math.pow(((L1 + L2) / 2.0 - 50.0), 2.0);
        var S_L = 1.0 +
            (0.015 * aLp_minus_50_square) / Math.sqrt(20.0 + aLp_minus_50_square);
        var S_C = 1.0 + 0.045 * aCp;
        var S_H = 1.0 + 0.015 * T * aCp;
        var R_T = CIEDE2000._calculateRT(ahp, aCp);
        var dLpSL = dLp / S_L; // S_L * kL, where kL is 1.0
        var dCpSC = dCp / S_C; // S_C * kC, where kC is 1.0
        var dHpSH = dHp / S_H; // S_H * kH, where kH is 1.0
        return Math.pow(dLpSL, 2) + Math.pow(dCpSC, 2) + Math.pow(dHpSH, 2) + R_T * dCpSC * dHpSH;
    };
    /**
     * Weight in distance: 0.25
     * Max DeltaE: 100
     * Max DeltaA: 255
     */
    CIEDE2000._kA = (0.25 * 100) / 255;
    CIEDE2000._pow25to7 = Math.pow(25, 7); // 1Math.pow(25, 7);
    CIEDE2000._deg360InRad = (0, arithmetic_1.degrees2radians)(360);
    CIEDE2000._deg180InRad = (0, arithmetic_1.degrees2radians)(180);
    CIEDE2000._deg30InRad = (0, arithmetic_1.degrees2radians)(30);
    CIEDE2000._deg6InRad = (0, arithmetic_1.degrees2radians)(6);
    CIEDE2000._deg63InRad = (0, arithmetic_1.degrees2radians)(63);
    CIEDE2000._deg275InRad = (0, arithmetic_1.degrees2radians)(275);
    CIEDE2000._deg25InRad = (0, arithmetic_1.degrees2radians)(25);
    return CIEDE2000;
}(distanceCalculator_1.AbstractDistanceCalculator));
exports.CIEDE2000 = CIEDE2000;
