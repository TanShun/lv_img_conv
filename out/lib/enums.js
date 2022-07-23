"use strict";
exports.__esModule = true;
exports.BINARY_FORMAT_PREFIX = exports.OutputMode = exports.ImageModeUtil = exports.ImageMode = void 0;
var ImageMode;
(function (ImageMode) {
    /*Helper ARGB formats. Used internally*/
    ImageMode[ImageMode["ICF_TRUE_COLOR_ARGB8332"] = 0] = "ICF_TRUE_COLOR_ARGB8332";
    ImageMode[ImageMode["ICF_TRUE_COLOR_ARGB8565"] = 1] = "ICF_TRUE_COLOR_ARGB8565";
    ImageMode[ImageMode["ICF_TRUE_COLOR_ARGB8565_RBSWAP"] = 2] = "ICF_TRUE_COLOR_ARGB8565_RBSWAP";
    ImageMode[ImageMode["ICF_TRUE_COLOR_ARGB8888"] = 3] = "ICF_TRUE_COLOR_ARGB8888";
    ImageMode[ImageMode["CF_ALPHA_1_BIT"] = 4] = "CF_ALPHA_1_BIT";
    ImageMode[ImageMode["CF_ALPHA_2_BIT"] = 5] = "CF_ALPHA_2_BIT";
    ImageMode[ImageMode["CF_ALPHA_4_BIT"] = 6] = "CF_ALPHA_4_BIT";
    ImageMode[ImageMode["CF_ALPHA_8_BIT"] = 7] = "CF_ALPHA_8_BIT";
    ImageMode[ImageMode["CF_INDEXED_1_BIT"] = 8] = "CF_INDEXED_1_BIT";
    ImageMode[ImageMode["CF_INDEXED_2_BIT"] = 9] = "CF_INDEXED_2_BIT";
    ImageMode[ImageMode["CF_INDEXED_4_BIT"] = 10] = "CF_INDEXED_4_BIT";
    ImageMode[ImageMode["CF_INDEXED_8_BIT"] = 11] = "CF_INDEXED_8_BIT";
    ImageMode[ImageMode["CF_RAW"] = 12] = "CF_RAW";
    ImageMode[ImageMode["CF_RAW_CHROMA"] = 12] = "CF_RAW_CHROMA";
    ImageMode[ImageMode["CF_RAW_ALPHA"] = 13] = "CF_RAW_ALPHA";
    /*Helper formats if C arrays contains all true color formats (used in "download")*/
    ImageMode[ImageMode["CF_TRUE_COLOR"] = 14] = "CF_TRUE_COLOR";
    ImageMode[ImageMode["CF_TRUE_COLOR_ALPHA"] = 15] = "CF_TRUE_COLOR_ALPHA";
    ImageMode[ImageMode["CF_TRUE_COLOR_CHROMA"] = 16] = "CF_TRUE_COLOR_CHROMA";
    /*New formats in v8.3+*/
    ImageMode[ImageMode["CF_RGB565A8"] = 17] = "CF_RGB565A8";
})(ImageMode || (ImageMode = {}));
exports.ImageMode = ImageMode;
;
var ImageModeUtil = /** @class */ (function () {
    function ImageModeUtil() {
    }
    ImageModeUtil.isTrueColor = function (mode) {
        if (typeof mode != 'string')
            mode = ImageMode[mode];
        return mode.startsWith("CF_TRUE_COLOR");
    };
    return ImageModeUtil;
}());
exports.ImageModeUtil = ImageModeUtil;
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["C"] = 0] = "C";
    OutputMode[OutputMode["BIN"] = 1] = "BIN";
})(OutputMode || (OutputMode = {}));
exports.OutputMode = OutputMode;
var BINARY_FORMAT_PREFIX = "ICF_TRUE_COLOR_";
exports.BINARY_FORMAT_PREFIX = BINARY_FORMAT_PREFIX;
