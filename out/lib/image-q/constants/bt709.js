"use strict";
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */
exports.__esModule = true;
exports.y = exports.x = exports.Y = void 0;
/**
 * sRGB (based on ITU-R Recommendation BT.709)
 * http://en.wikipedia.org/wiki/SRGB
 */
var Y;
(function (Y) {
    Y[Y["RED"] = 0.2126] = "RED";
    Y[Y["GREEN"] = 0.7152] = "GREEN";
    Y[Y["BLUE"] = 0.0722] = "BLUE";
    Y[Y["WHITE"] = 1] = "WHITE";
})(Y = exports.Y || (exports.Y = {}));
// tslint:disable-next-line:naming-convention
var x;
(function (x) {
    x[x["RED"] = 0.64] = "RED";
    x[x["GREEN"] = 0.3] = "GREEN";
    x[x["BLUE"] = 0.15] = "BLUE";
    x[x["WHITE"] = 0.3127] = "WHITE";
})(x = exports.x || (exports.x = {}));
// tslint:disable-next-line:naming-convention
var y;
(function (y) {
    y[y["RED"] = 0.33] = "RED";
    y[y["GREEN"] = 0.6] = "GREEN";
    y[y["BLUE"] = 0.06] = "BLUE";
    y[y["WHITE"] = 0.329] = "WHITE";
})(y = exports.y || (exports.y = {}));
