"use strict";
/*
 * Copyright (c) 2015, Leon Sorokin
 * All rights reserved. (MIT Licensed)
 *
 * ColorHistogram.js - an image quantization lib
 */
exports.__esModule = true;
exports.ColorHistogram = void 0;
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * colorHistogram.ts - part of Image Quantization Library
 */
var hueStatistics_1 = require("../../utils/hueStatistics");
var arithmetic_1 = require("../../utils/arithmetic");
var ColorHistogram = /** @class */ (function () {
    function ColorHistogram(method, colors) {
        // 1 = by global population, 2 = subregion population threshold
        this._method = method;
        // if > 0, enables hues stats and min-color retention per group
        this._minHueCols = colors << 2; // opts.minHueCols || 0;
        // # of highest-frequency colors to start with for palette reduction
        this._initColors = colors << 2;
        // HueStatistics instance
        this._hueStats = new hueStatistics_1.HueStatistics(ColorHistogram._hueGroups, this._minHueCols);
        this._histogram = Object.create(null); // tslint:disable-line:no-null-keyword
    }
    ColorHistogram.prototype.sample = function (pointContainer) {
        // eslint-disable-next-line default-case
        switch (this._method) {
            case 1:
                this._colorStats1D(pointContainer);
                break;
            case 2:
                this._colorStats2D(pointContainer);
                break;
        }
    };
    ColorHistogram.prototype.getImportanceSortedColorsIDXI32 = function () {
        var _this = this;
        // TODO: fix typing issue in stableSort func
        var sorted = (0, arithmetic_1.stableSort)(Object.keys(this._histogram), function (a, b) { return _this._histogram[b] - _this._histogram[a]; });
        if (sorted.length === 0) {
            return [];
        }
        var idxi32;
        switch (this._method) {
            case 1:
                var initialColorsLimit = Math.min(sorted.length, this._initColors);
                var last = sorted[initialColorsLimit - 1];
                var freq = this._histogram[last];
                idxi32 = sorted.slice(0, initialColorsLimit);
                // add any cut off colors with same freq as last
                var pos = initialColorsLimit;
                var len = sorted.length;
                while (pos < len && this._histogram[sorted[pos]] === freq) {
                    idxi32.push(sorted[pos++]);
                }
                // inject min huegroup colors
                this._hueStats.injectIntoArray(idxi32);
                break;
            case 2:
                idxi32 = sorted;
                break;
            default:
                // TODO: rethink errors
                throw new Error('Incorrect method');
        }
        // int32-ify values
        return idxi32.map(function (v) { return +v; });
    };
    // global top-population
    ColorHistogram.prototype._colorStats1D = function (pointContainer) {
        var histG = this._histogram;
        var pointArray = pointContainer.getPointArray();
        var len = pointArray.length;
        for (var i = 0; i < len; i++) {
            var col = pointArray[i].uint32;
            // collect hue stats
            this._hueStats.check(col);
            if (col in histG) {
                histG[col]++;
            }
            else {
                histG[col] = 1;
            }
        }
    };
    // population threshold within subregions
    // FIXME: this can over-reduce (few/no colors same?), need a way to keep
    // important colors that dont ever reach local thresholds (gradients?)
    ColorHistogram.prototype._colorStats2D = function (pointContainer) {
        var _this = this;
        var width = pointContainer.getWidth();
        var height = pointContainer.getHeight();
        var pointArray = pointContainer.getPointArray();
        var boxW = ColorHistogram._boxSize[0];
        var boxH = ColorHistogram._boxSize[1];
        var area = boxW * boxH;
        var boxes = this._makeBoxes(width, height, boxW, boxH);
        var histG = this._histogram;
        boxes.forEach(function (box) {
            var effc = Math.round((box.w * box.h) / area) * ColorHistogram._boxPixels;
            if (effc < 2)
                effc = 2;
            var histL = {};
            _this._iterateBox(box, width, function (i) {
                var col = pointArray[i].uint32;
                // collect hue stats
                _this._hueStats.check(col);
                if (col in histG) {
                    histG[col]++;
                }
                else if (col in histL) {
                    if (++histL[col] >= effc) {
                        histG[col] = histL[col];
                    }
                }
                else {
                    histL[col] = 1;
                }
            });
        });
        // inject min huegroup colors
        this._hueStats.injectIntoDictionary(histG);
    };
    // iterates @bbox within a parent rect of width @wid; calls @fn, passing index within parent
    ColorHistogram.prototype._iterateBox = function (bbox, wid, fn) {
        var b = bbox;
        var i0 = b.y * wid + b.x;
        var i1 = (b.y + b.h - 1) * wid + (b.x + b.w - 1);
        var incr = wid - b.w + 1;
        var cnt = 0;
        var i = i0;
        do {
            fn.call(this, i);
            i += ++cnt % b.w === 0 ? incr : 1;
        } while (i <= i1);
    };
    /**
     *    partitions a rectangle of width x height into
     *    array of boxes stepX x stepY (or less)
     */
    ColorHistogram.prototype._makeBoxes = function (width, height, stepX, stepY) {
        var wrem = width % stepX;
        var hrem = height % stepY;
        var xend = width - wrem;
        var yend = height - hrem;
        var boxesArray = [];
        for (var y = 0; y < height; y += stepY) {
            for (var x = 0; x < width; x += stepX) {
                boxesArray.push({
                    x: x,
                    y: y,
                    w: x === xend ? wrem : stepX,
                    h: y === yend ? hrem : stepY
                });
            }
        }
        return boxesArray;
    };
    ColorHistogram._boxSize = [64, 64];
    ColorHistogram._boxPixels = 2;
    ColorHistogram._hueGroups = 10;
    return ColorHistogram;
}());
exports.ColorHistogram = ColorHistogram;
