"use strict";
/*
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */
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
exports.NeuQuant = void 0;
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */
var palette_1 = require("../../utils/palette");
var point_1 = require("../../utils/point");
var paletteQuantizer_1 = require("../paletteQuantizer");
var utils_1 = require("../../utils");
// bias for colour values
var networkBiasShift = 3;
var Neuron = /** @class */ (function () {
    function Neuron(defaultValue) {
        this.r = this.g = this.b = this.a = defaultValue;
    }
    /**
     * There is a fix in original NEUQUANT by Anthony Dekker (http://members.ozemail.com.au/~dekker/NEUQUANT.HTML)
     * @example
     * r = Math.min(255, (neuron.r + (1 << (networkBiasShift - 1))) >> networkBiasShift);
     */
    Neuron.prototype.toPoint = function () {
        return point_1.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
    };
    Neuron.prototype.subtract = function (r, g, b, a) {
        this.r -= r | 0;
        this.g -= g | 0;
        this.b -= b | 0;
        this.a -= a | 0;
    };
    return Neuron;
}());
var NeuQuant = /** @class */ (function (_super) {
    __extends(NeuQuant, _super);
    function NeuQuant(colorDistanceCalculator, colors) {
        if (colors === void 0) { colors = 256; }
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        _this._pointArray = [];
        _this._sampleFactor = 1;
        _this._networkSize = colors;
        _this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
        return _this;
    }
    NeuQuant.prototype.sample = function (pointContainer) {
        this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
    };
    NeuQuant.prototype.quantize = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this._init();
                    return [5 /*yield**/, __values(this._learn())];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, {
                            palette: this._buildPalette(),
                            progress: 100
                        }];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    NeuQuant.prototype._init = function () {
        this._freq = [];
        this._bias = [];
        this._radPower = [];
        this._network = [];
        for (var i = 0; i < this._networkSize; i++) {
            this._network[i] = new Neuron(((i << (networkBiasShift + 8)) / this._networkSize) | 0);
            // 1/this._networkSize
            this._freq[i] = (NeuQuant._initialBias / this._networkSize) | 0;
            this._bias[i] = 0;
        }
    };
    /**
     * Main Learning Loop
     */
    NeuQuant.prototype._learn = function () {
        var sampleFactor, pointsNumber, alphadec, pointsToSample, delta, alpha, radius, rad, i, step, tracker, i, pointIndex, point, b, g, r, a, neuronIndex, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sampleFactor = this._sampleFactor;
                    pointsNumber = this._pointArray.length;
                    if (pointsNumber < NeuQuant._minpicturebytes)
                        sampleFactor = 1;
                    alphadec = (30 + (sampleFactor - 1) / 3) | 0;
                    pointsToSample = (pointsNumber / sampleFactor) | 0;
                    delta = (pointsToSample / NeuQuant._nCycles) | 0;
                    alpha = NeuQuant._initAlpha;
                    radius = (this._networkSize >> 3) * NeuQuant._radiusBias;
                    rad = radius >> NeuQuant._radiusBiasShift;
                    if (rad <= 1)
                        rad = 0;
                    for (i = 0; i < rad; i++) {
                        this._radPower[i] =
                            (alpha * (((rad * rad - i * i) * NeuQuant._radBias) / (rad * rad))) >>>
                                0;
                    }
                    if (pointsNumber < NeuQuant._minpicturebytes) {
                        step = 1;
                    }
                    else if (pointsNumber % NeuQuant._prime1 !== 0) {
                        step = NeuQuant._prime1;
                    }
                    else if (pointsNumber % NeuQuant._prime2 !== 0) {
                        step = NeuQuant._prime2;
                    }
                    else if (pointsNumber % NeuQuant._prime3 !== 0) {
                        step = NeuQuant._prime3;
                    }
                    else {
                        step = NeuQuant._prime4;
                    }
                    tracker = new utils_1.ProgressTracker(pointsToSample, 99);
                    i = 0, pointIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < pointsToSample)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(i)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress
                        }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    point = this._pointArray[pointIndex];
                    b = point.b << networkBiasShift;
                    g = point.g << networkBiasShift;
                    r = point.r << networkBiasShift;
                    a = point.a << networkBiasShift;
                    neuronIndex = this._contest(b, g, r, a);
                    this._alterSingle(alpha, neuronIndex, b, g, r, a);
                    if (rad !== 0)
                        this._alterNeighbour(rad, neuronIndex, b, g, r, a);
                    /* alter neighbours */
                    pointIndex += step;
                    if (pointIndex >= pointsNumber)
                        pointIndex -= pointsNumber;
                    i++;
                    if (delta === 0)
                        delta = 1;
                    if (i % delta === 0) {
                        alpha -= (alpha / alphadec) | 0;
                        radius -= (radius / NeuQuant._radiusDecrease) | 0;
                        rad = radius >> NeuQuant._radiusBiasShift;
                        if (rad <= 1)
                            rad = 0;
                        for (j = 0; j < rad; j++) {
                            this._radPower[j] =
                                (alpha *
                                    (((rad * rad - j * j) * NeuQuant._radBias) / (rad * rad))) >>>
                                    0;
                        }
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    NeuQuant.prototype._buildPalette = function () {
        var palette = new palette_1.Palette();
        this._network.forEach(function (neuron) {
            palette.add(neuron.toPoint());
        });
        palette.sort();
        return palette;
    };
    /**
     * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in radpower[|i-j|]
     */
    NeuQuant.prototype._alterNeighbour = function (rad, i, b, g, r, al) {
        var lo = i - rad;
        if (lo < -1)
            lo = -1;
        var hi = i + rad;
        if (hi > this._networkSize)
            hi = this._networkSize;
        var j = i + 1;
        var k = i - 1;
        var m = 1;
        while (j < hi || k > lo) {
            var a = this._radPower[m++] / NeuQuant._alphaRadBias;
            if (j < hi) {
                var p = this._network[j++];
                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
            }
            if (k > lo) {
                var p = this._network[k--];
                p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
            }
        }
    };
    /**
     * Move neuron i towards biased (b,g,r) by factor alpha
     */
    NeuQuant.prototype._alterSingle = function (alpha, i, b, g, r, a) {
        alpha /= NeuQuant._initAlpha;
        /* alter hit neuron */
        var n = this._network[i];
        n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
    };
    /**
     * Search for biased BGR values
     * description:
     *    finds closest neuron (min dist) and updates freq
     *    finds best neuron (min dist-bias) and returns position
     *    for frequently chosen neurons, freq[i] is high and bias[i] is negative
     *    bias[i] = _gamma*((1/this._networkSize)-freq[i])
     *
     * Original distance equation:
     *        dist = abs(dR) + abs(dG) + abs(dB)
     */
    NeuQuant.prototype._contest = function (b, g, r, a) {
        var multiplier = (255 * 4) << networkBiasShift;
        var bestd = ~(1 << 31);
        var bestbiasd = bestd;
        var bestpos = -1;
        var bestbiaspos = bestpos;
        for (var i = 0; i < this._networkSize; i++) {
            var n = this._network[i];
            var dist = (this._distance.calculateNormalized(n, { r: r, g: g, b: b, a: a }) * multiplier) |
                0;
            if (dist < bestd) {
                bestd = dist;
                bestpos = i;
            }
            var biasdist = dist -
                (this._bias[i] >> (NeuQuant._initialBiasShift - networkBiasShift));
            if (biasdist < bestbiasd) {
                bestbiasd = biasdist;
                bestbiaspos = i;
            }
            var betafreq = this._freq[i] >> NeuQuant._betaShift;
            this._freq[i] -= betafreq;
            this._bias[i] += betafreq << NeuQuant._gammaShift;
        }
        this._freq[bestpos] += NeuQuant._beta;
        this._bias[bestpos] -= NeuQuant._betaGamma;
        return bestbiaspos;
    };
    /*
     four primes near 500 - assume no image has a length so large
     that it is divisible by all four primes
     */
    NeuQuant._prime1 = 499;
    NeuQuant._prime2 = 491;
    NeuQuant._prime3 = 487;
    NeuQuant._prime4 = 503;
    NeuQuant._minpicturebytes = NeuQuant._prime4;
    // no. of learning cycles
    NeuQuant._nCycles = 100;
    // defs for freq and bias
    NeuQuant._initialBiasShift = 16;
    // bias for fractions
    NeuQuant._initialBias = 1 << NeuQuant._initialBiasShift;
    NeuQuant._gammaShift = 10;
    // gamma = 1024
    // TODO: why gamma is never used?
    // private static _gamma : number     = (1 << NeuQuant._gammaShift);
    NeuQuant._betaShift = 10;
    NeuQuant._beta = NeuQuant._initialBias >> NeuQuant._betaShift;
    // beta = 1/1024
    NeuQuant._betaGamma = NeuQuant._initialBias << (NeuQuant._gammaShift - NeuQuant._betaShift);
    /*
     * for 256 cols, radius starts
     */
    NeuQuant._radiusBiasShift = 6;
    // at 32.0 biased by 6 bits
    NeuQuant._radiusBias = 1 << NeuQuant._radiusBiasShift;
    // and decreases by a factor of 1/30 each cycle
    NeuQuant._radiusDecrease = 30;
    /* defs for decreasing alpha factor */
    // alpha starts at 1.0
    NeuQuant._alphaBiasShift = 10;
    // biased by 10 bits
    NeuQuant._initAlpha = 1 << NeuQuant._alphaBiasShift;
    /* radBias and alphaRadBias used for radpower calculation */
    NeuQuant._radBiasShift = 8;
    NeuQuant._radBias = 1 << NeuQuant._radBiasShift;
    NeuQuant._alphaRadBiasShift = NeuQuant._alphaBiasShift + NeuQuant._radBiasShift;
    NeuQuant._alphaRadBias = 1 << NeuQuant._alphaRadBiasShift;
    return NeuQuant;
}(paletteQuantizer_1.AbstractPaletteQuantizer));
exports.NeuQuant = NeuQuant;
