"use strict";
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
exports.ssim = void 0;
var bt709_1 = require("../constants/bt709");
// based on https://github.com/rhys-e/structural-similarity
// http://en.wikipedia.org/wiki/Structural_similarity
var K1 = 0.01; // tslint:disable-line:naming-convention
var K2 = 0.03; // tslint:disable-line:naming-convention
function ssim(image1, image2) {
    if (image1.getHeight() !== image2.getHeight() ||
        image1.getWidth() !== image2.getWidth()) {
        throw new Error('Images have different sizes!');
    }
    var bitsPerComponent = 8;
    var L = (1 << bitsPerComponent) - 1; // tslint:disable-line:naming-convention
    var c1 = Math.pow((K1 * L), 2);
    var c2 = Math.pow((K2 * L), 2);
    var numWindows = 0;
    var mssim = 0.0;
    // calculate ssim for each window
    iterate(image1, image2, function (lumaValues1, lumaValues2, averageLumaValue1, averageLumaValue2) {
        // calculate variance and covariance
        var sigxy = 0.0;
        var sigsqx = 0.0;
        var sigsqy = 0.0;
        for (var i = 0; i < lumaValues1.length; i++) {
            sigsqx += Math.pow((lumaValues1[i] - averageLumaValue1), 2);
            sigsqy += Math.pow((lumaValues2[i] - averageLumaValue2), 2);
            sigxy +=
                (lumaValues1[i] - averageLumaValue1) *
                    (lumaValues2[i] - averageLumaValue2);
        }
        var numPixelsInWin = lumaValues1.length - 1;
        sigsqx /= numPixelsInWin;
        sigsqy /= numPixelsInWin;
        sigxy /= numPixelsInWin;
        // perform ssim calculation on window
        var numerator = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2);
        var denominator = (Math.pow(averageLumaValue1, 2) + Math.pow(averageLumaValue2, 2) + c1) *
            (sigsqx + sigsqy + c2);
        var ssim = numerator / denominator;
        mssim += ssim;
        numWindows++;
    });
    return mssim / numWindows;
}
exports.ssim = ssim;
function iterate(image1, image2, callback) {
    var windowSize = 8;
    var width = image1.getWidth();
    var height = image1.getHeight();
    for (var y = 0; y < height; y += windowSize) {
        for (var x = 0; x < width; x += windowSize) {
            // avoid out-of-width/height
            var windowWidth = Math.min(windowSize, width - x);
            var windowHeight = Math.min(windowSize, height - y);
            var lumaValues1 = calculateLumaValuesForWindow(image1, x, y, windowWidth, windowHeight);
            var lumaValues2 = calculateLumaValuesForWindow(image2, x, y, windowWidth, windowHeight);
            var averageLuma1 = calculateAverageLuma(lumaValues1);
            var averageLuma2 = calculateAverageLuma(lumaValues2);
            callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
        }
    }
}
function calculateLumaValuesForWindow(image, x, y, width, height) {
    var pointArray = image.getPointArray();
    var lumaValues = [];
    var counter = 0;
    for (var j = y; j < y + height; j++) {
        var offset = j * image.getWidth();
        for (var i = x; i < x + width; i++) {
            var point = pointArray[offset + i];
            lumaValues[counter] =
                point.r * bt709_1.Y.RED + point.g * bt709_1.Y.GREEN + point.b * bt709_1.Y.BLUE;
            counter++;
        }
    }
    return lumaValues;
}
function calculateAverageLuma(lumaValues) {
    var e_1, _a;
    var sumLuma = 0.0;
    try {
        for (var lumaValues_1 = __values(lumaValues), lumaValues_1_1 = lumaValues_1.next(); !lumaValues_1_1.done; lumaValues_1_1 = lumaValues_1.next()) {
            var luma = lumaValues_1_1.value;
            sumLuma += luma;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lumaValues_1_1 && !lumaValues_1_1.done && (_a = lumaValues_1["return"])) _a.call(lumaValues_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return sumLuma / lumaValues.length;
}
