"use strict";
exports.__esModule = true;
exports.rgb2hsl = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2hsl.ts - part of Image Quantization Library
 */
var arithmetic_1 = require("../utils/arithmetic");
/**
 * Calculate HSL from RGB
 * Hue is in degrees [0..360]
 * Lightness: [0..1]
 * Saturation: [0..1]
 * http://web.archive.org/web/20060914040436/http://local.wasp.uwa.edu.au/~pbourke/colour/hsl/
 */
function rgb2hsl(r, g, b) {
    var min = (0, arithmetic_1.min3)(r, g, b);
    var max = (0, arithmetic_1.max3)(r, g, b);
    var delta = max - min;
    var l = (min + max) / 510;
    var s = 0;
    if (l > 0 && l < 1)
        s = delta / (l < 0.5 ? max + min : 510 - max - min);
    var h = 0;
    if (delta > 0) {
        if (max === r) {
            h = (g - b) / delta;
        }
        else if (max === g) {
            h = 2 + (b - r) / delta;
        }
        else {
            h = 4 + (r - g) / delta;
        }
        h *= 60;
        if (h < 0)
            h += 360;
    }
    return { h: h, s: s, l: l };
}
exports.rgb2hsl = rgb2hsl;
