"use strict";
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * palette.ts - part of Image Quantization Library
 */
exports.__esModule = true;
exports.Palette = exports.hueGroup = void 0;
var pointContainer_1 = require("./pointContainer");
var rgb2hsl_1 = require("../conversion/rgb2hsl");
// TODO: make paletteArray via pointContainer, so, export will be available via pointContainer.exportXXX
var hueGroups = 10;
function hueGroup(hue, segmentsNumber) {
    var maxHue = 360;
    var seg = maxHue / segmentsNumber;
    var half = seg / 2;
    for (var i = 1, mid = seg - half; i < segmentsNumber; i++, mid += seg) {
        if (hue >= mid && hue < mid + seg)
            return i;
    }
    return 0;
}
exports.hueGroup = hueGroup;
var Palette = /** @class */ (function () {
    function Palette() {
        this._pointArray = [];
        this._i32idx = {};
        this._pointContainer = new pointContainer_1.PointContainer();
        this._pointContainer.setHeight(1);
        this._pointArray = this._pointContainer.getPointArray();
    }
    Palette.prototype.add = function (color) {
        this._pointArray.push(color);
        this._pointContainer.setWidth(this._pointArray.length);
    };
    Palette.prototype.has = function (color) {
        for (var i = this._pointArray.length - 1; i >= 0; i--) {
            if (color.uint32 === this._pointArray[i].uint32)
                return true;
        }
        return false;
    };
    // TOTRY: use HUSL - http://boronine.com/husl/ http://www.husl-colors.org/ https://github.com/husl-colors/husl
    Palette.prototype.getNearestColor = function (colorDistanceCalculator, color) {
        return this._pointArray[this._getNearestIndex(colorDistanceCalculator, color) | 0];
    };
    Palette.prototype.getPointContainer = function () {
        return this._pointContainer;
    };
    // TOTRY: use HUSL - http://boronine.com/husl/
    /*
     public nearestIndexByUint32(i32) {
     var idx : number = this._nearestPointFromCache("" + i32);
     if (idx >= 0) return idx;
  
     var min = 1000,
     rgb = [
     (i32 & 0xff),
     (i32 >>> 8) & 0xff,
     (i32 >>> 16) & 0xff,
     (i32 >>> 24) & 0xff
     ],
     len = this._pointArray.length;
  
     idx = 0;
     for (var i = 0; i < len; i++) {
     var dist = Utils.distEuclidean(rgb, this._pointArray[i].rgba);
  
     if (dist < min) {
     min = dist;
     idx = i;
     }
     }
  
     this._i32idx[i32] = idx;
     return idx;
     }
     */
    Palette.prototype._nearestPointFromCache = function (key) {
        return typeof this._i32idx[key] === 'number' ? this._i32idx[key] : -1;
    };
    Palette.prototype._getNearestIndex = function (colorDistanceCalculator, point) {
        var idx = this._nearestPointFromCache('' + point.uint32); // eslint-disable-line prefer-template
        if (idx >= 0)
            return idx;
        var minimalDistance = Number.MAX_VALUE;
        idx = 0;
        for (var i = 0, l = this._pointArray.length; i < l; i++) {
            var p = this._pointArray[i];
            var distance = colorDistanceCalculator.calculateRaw(point.r, point.g, point.b, point.a, p.r, p.g, p.b, p.a);
            if (distance < minimalDistance) {
                minimalDistance = distance;
                idx = i;
            }
        }
        this._i32idx[point.uint32] = idx;
        return idx;
    };
    /*
     public reduce(histogram : ColorHistogram, colors : number) {
     if (this._pointArray.length > colors) {
     var idxi32 = histogram.getImportanceSortedColorsIDXI32();
  
     // quantize histogram to existing palette
     var keep = [], uniqueColors = 0, idx, pruned = false;
  
     for (var i = 0, len = idxi32.length; i < len; i++) {
     // palette length reached, unset all remaining colors (sparse palette)
     if (uniqueColors >= colors) {
     this.prunePal(keep);
     pruned = true;
     break;
     } else {
     idx = this.nearestIndexByUint32(idxi32[i]);
     if (keep.indexOf(idx) < 0) {
     keep.push(idx);
     uniqueColors++;
     }
     }
     }
  
     if (!pruned) {
     this.prunePal(keep);
     }
     }
     }
  
     // TODO: check usage, not tested!
     public prunePal(keep : number[]) {
     var colors = this._pointArray.length;
     for (var colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
     if (keep.indexOf(colorIndex) < 0) {
  
     if(colorIndex + 1 < colors) {
     this._pointArray[ colorIndex ] = this._pointArray [ colors - 1 ];
     }
     --colors;
     //this._pointArray[colorIndex] = null;
     }
     }
     console.log("colors pruned: " + (this._pointArray.length - colors));
     this._pointArray.length = colors;
     this._i32idx = {};
     }
     */
    // TODO: group very low lum and very high lum colors
    // TODO: pass custom sort order
    // TODO: sort criteria function should be placed to HueStats class
    Palette.prototype.sort = function () {
        this._i32idx = {};
        this._pointArray.sort(function (a, b) {
            var hslA = (0, rgb2hsl_1.rgb2hsl)(a.r, a.g, a.b);
            var hslB = (0, rgb2hsl_1.rgb2hsl)(b.r, b.g, b.b);
            // sort all grays + whites together
            var hueA = a.r === a.g && a.g === a.b ? 0 : 1 + hueGroup(hslA.h, hueGroups);
            var hueB = b.r === b.g && b.g === b.b ? 0 : 1 + hueGroup(hslB.h, hueGroups);
            /*
             var hueA = (a.r === a.g && a.g === a.b) ? 0 : 1 + Utils.hueGroup(hslA.h, hueGroups);
             var hueB = (b.r === b.g && b.g === b.b) ? 0 : 1 + Utils.hueGroup(hslB.h, hueGroups);
             */
            var hueDiff = hueB - hueA;
            if (hueDiff)
                return -hueDiff;
            /*
             var lumDiff = Utils.lumGroup(+hslB.l.toFixed(2)) - Utils.lumGroup(+hslA.l.toFixed(2));
             if (lumDiff) return -lumDiff;
             */
            var lA = a.getLuminosity(true);
            var lB = b.getLuminosity(true);
            if (lB - lA !== 0)
                return lB - lA;
            var satDiff = ((hslB.s * 100) | 0) - ((hslA.s * 100) | 0);
            if (satDiff)
                return -satDiff;
            return 0;
        });
    };
    return Palette;
}());
exports.Palette = Palette;
