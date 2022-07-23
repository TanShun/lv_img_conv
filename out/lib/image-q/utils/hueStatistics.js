"use strict";
exports.__esModule = true;
exports.HueStatistics = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * hueStatistics.ts - part of Image Quantization Library
 */
var rgb2hsl_1 = require("../conversion/rgb2hsl");
var palette_1 = require("./palette");
var HueGroup = /** @class */ (function () {
    function HueGroup() {
        this.num = 0;
        this.cols = [];
    }
    return HueGroup;
}());
var HueStatistics = /** @class */ (function () {
    function HueStatistics(numGroups, minCols) {
        this._numGroups = numGroups;
        this._minCols = minCols;
        this._stats = [];
        for (var i = 0; i <= numGroups; i++) {
            this._stats[i] = new HueGroup();
        }
        this._groupsFull = 0;
    }
    HueStatistics.prototype.check = function (i32) {
        if (this._groupsFull === this._numGroups + 1) {
            this.check = function () { };
        }
        var r = i32 & 0xff;
        var g = (i32 >>> 8) & 0xff;
        var b = (i32 >>> 16) & 0xff;
        var hg = r === g && g === b
            ? 0
            : 1 + (0, palette_1.hueGroup)((0, rgb2hsl_1.rgb2hsl)(r, g, b).h, this._numGroups);
        var gr = this._stats[hg];
        var min = this._minCols;
        gr.num++;
        if (gr.num > min) {
            return;
        }
        if (gr.num === min) {
            this._groupsFull++;
        }
        if (gr.num <= min) {
            this._stats[hg].cols.push(i32);
        }
    };
    HueStatistics.prototype.injectIntoDictionary = function (histG) {
        for (var i = 0; i <= this._numGroups; i++) {
            if (this._stats[i].num <= this._minCols) {
                this._stats[i].cols.forEach(function (col) {
                    if (!histG[col]) {
                        histG[col] = 1;
                    }
                    else {
                        histG[col]++;
                    }
                });
            }
        }
    };
    HueStatistics.prototype.injectIntoArray = function (histG) {
        for (var i = 0; i <= this._numGroups; i++) {
            if (this._stats[i].num <= this._minCols) {
                this._stats[i].cols.forEach(function (col) {
                    if (histG.indexOf(col) === -1) {
                        histG.push(col);
                    }
                });
            }
        }
    };
    return HueStatistics;
}());
exports.HueStatistics = HueStatistics;
