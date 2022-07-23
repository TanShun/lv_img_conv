"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.__esModule = true;
exports.Converter = exports.convertImageBlob = exports.isNotRaw = void 0;
var canvas_1 = require("./canvas");
var enums_1 = require("./enums");
var image_q_1 = require("./image-q/image-q");
var helpers_1 = require("./helpers");
var Converter = /** @class */ (function () {
    function Converter(w, h, imageData, alpha, options) {
        this.w = 0; /*Image width*/
        this.h = 0; /*Image height*/
        this.raw_len = 0; /* RAW image data size */
        this.alpha = false; /*Add alpha byte or not*/
        this.chroma = false; /*Chroma keyed?*/
        this.w = w;
        this.h = h;
        this.imageData = imageData;
        this.r_earr = []; /*Classification error for next row of pixels*/
        this.g_earr = [];
        this.b_earr = [];
        if (options.dith) {
            for (var i = 0; i < this.w + 2; ++i) {
                this.r_earr[i] = 0;
                this.g_earr[i] = 0;
                this.b_earr[i] = 0;
            }
        }
        this.r_nerr = 0; /*Classification error for next pixel*/
        this.g_nerr = 0;
        this.b_nerr = 0;
        this.pass = 0;
        this.cf = options.cf;
        this.alpha = alpha;
        this.outputFormat = options.outputFormat;
        this.options = options;
    }
    /**
     * Get the number of passes being made over an image to output it.
     */
    Converter.prototype.getNumPasses = function () {
        if (this.cf == enums_1.ImageMode.CF_RGB565A8)
            return 2;
        else
            return 1;
    };
    Converter.prototype.convert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var d_array, indent_1, numValuesPerRow_1, str, palette_size, bits_per_value, pointContainer, palette, color_arr, palettePointArray, paletteColors_1, i, outPointContainer, currentValue, numBitsShifted, outPointArray, oldColorFormat, needsFormatSwap, y, x, $content, $cf, $lv_cf, $header_32bit, finalBinary, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cf == enums_1.ImageMode.CF_RAW || this.cf == enums_1.ImageMode.CF_RAW_ALPHA) {
                            d_array = Array.from(this.imageData);
                            this.raw_len = d_array.length;
                            indent_1 = this.options.useLegacyFooterOrder ? "  " : "    ";
                            numValuesPerRow_1 = this.options.useLegacyFooterOrder ? 15 : 12;
                            str = "\n" + indent_1 + d_array.map(function (val, i) { return "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(val), 2, '0', true) + ((i % (numValuesPerRow_1 + 1)) == numValuesPerRow_1 ? (", \n" + indent_1) : ", "); }).join("");
                            str = str.substr(0, str.length - 2);
                            return [2 /*return*/, str];
                        }
                        palette_size = 0, bits_per_value = 0;
                        if (this.cf == enums_1.ImageMode.CF_INDEXED_1_BIT) {
                            palette_size = 2;
                            bits_per_value = 1;
                        }
                        else if (this.cf == enums_1.ImageMode.CF_INDEXED_2_BIT) {
                            palette_size = 4;
                            bits_per_value = 2;
                        }
                        else if (this.cf == enums_1.ImageMode.CF_INDEXED_4_BIT) {
                            palette_size = 16;
                            bits_per_value = 4;
                        }
                        else if (this.cf == enums_1.ImageMode.CF_INDEXED_8_BIT) {
                            palette_size = 256;
                            bits_per_value = 8;
                        }
                        this.d_out = [];
                        if (!palette_size) return [3 /*break*/, 3];
                        pointContainer = image_q_1.utils.PointContainer.fromUint8Array(this.imageData, this.w, this.h);
                        return [4 /*yield*/, (0, image_q_1.buildPalette)([pointContainer], {
                                colors: palette_size
                            })];
                    case 1:
                        palette = _a.sent();
                        color_arr = this.d_out;
                        palettePointArray = palette.getPointContainer().getPointArray();
                        paletteColors_1 = palettePointArray.map(function (point) {
                            return point.uint32;
                        });
                        for (i = 0; i < palette_size; i++) {
                            if (i < palettePointArray.length) {
                                color_arr.push(palettePointArray[i].b, palettePointArray[i].g, palettePointArray[i].r, palettePointArray[i].a);
                            }
                            else {
                                color_arr.push(0, 0, 0, 0);
                            }
                        }
                        return [4 /*yield*/, (0, image_q_1.applyPalette)(pointContainer, palette, {})];
                    case 2:
                        outPointContainer = _a.sent();
                        currentValue = 0;
                        numBitsShifted = 0;
                        outPointArray = outPointContainer.getPointArray();
                        this.imageData = [];
                        outPointArray.forEach(function (point, arrayIndex) {
                            var index = paletteColors_1.indexOf(point.uint32);
                            if (index == -1)
                                throw new Error("Unknown color??");
                            _this.imageData.push(index);
                        });
                        _a.label = 3;
                    case 3:
                        needsFormatSwap = this.outputFormat == enums_1.OutputMode.BIN && enums_1.ImageModeUtil.isTrueColor(this.cf);
                        if (needsFormatSwap) {
                            oldColorFormat = this.cf;
                            this.cf = this.options.binaryFormat;
                        }
                        for (this.pass = 0; this.pass < this.getNumPasses(); this.pass++) {
                            /*Convert all the pixels*/
                            for (y = 0; y < this.h; y++) {
                                this.dith_reset();
                                for (x = 0; x < this.w; ++x) {
                                    this.conv_px(x, y);
                                }
                            }
                        }
                        if (needsFormatSwap) {
                            this.cf = oldColorFormat;
                        }
                        if (this.outputFormat == enums_1.OutputMode.C)
                            return [2 /*return*/, this.format_to_c_array()];
                        else {
                            $content = this.d_out;
                            $cf = this.cf;
                            $lv_cf = 4;
                            switch ($cf) {
                                case enums_1.ImageMode.CF_TRUE_COLOR:
                                    $lv_cf = 4;
                                    break;
                                case enums_1.ImageMode.CF_TRUE_COLOR_ALPHA:
                                    $lv_cf = 5;
                                    break;
                                case enums_1.ImageMode.CF_TRUE_COLOR_CHROMA:
                                    $lv_cf = 6;
                                    break;
                                case enums_1.ImageMode.CF_INDEXED_1_BIT:
                                    $lv_cf = 7;
                                    break;
                                case enums_1.ImageMode.CF_INDEXED_2_BIT:
                                    $lv_cf = 8;
                                    break;
                                case enums_1.ImageMode.CF_INDEXED_4_BIT:
                                    $lv_cf = 9;
                                    break;
                                case enums_1.ImageMode.CF_INDEXED_8_BIT:
                                    $lv_cf = 10;
                                    break;
                                case enums_1.ImageMode.CF_ALPHA_1_BIT:
                                    $lv_cf = 11;
                                    break;
                                case enums_1.ImageMode.CF_ALPHA_2_BIT:
                                    $lv_cf = 12;
                                    break;
                                case enums_1.ImageMode.CF_ALPHA_4_BIT:
                                    $lv_cf = 13;
                                    break;
                                case enums_1.ImageMode.CF_ALPHA_8_BIT:
                                    $lv_cf = 14;
                                    break;
                            }
                            $header_32bit = ($lv_cf | (this.w << 10) | (this.h << 21)) >>> 0;
                            finalBinary = new Uint8Array(this.d_out.length + 4);
                            finalBinary[0] = ($header_32bit & 0xFF);
                            finalBinary[1] = ($header_32bit & 0xFF00) >> 8;
                            finalBinary[2] = ($header_32bit & 0xFF0000) >> 16;
                            finalBinary[3] = ($header_32bit & 0xFF000000) >> 24;
                            for (i = 0; i < this.d_out.length; i++) {
                                finalBinary[i + 4] = this.d_out[i];
                            }
                            return [2 /*return*/, finalBinary.buffer];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Converter.prototype.get_c_header = function (out_name) {
        var $c_header = "#if defined(LV_LVGL_H_INCLUDE_SIMPLE)\n#include \"lvgl.h\"\n#else\n#include \"lvgl/lvgl.h\"\n#endif\n\n\n#ifndef LV_ATTRIBUTE_MEM_ALIGN\n#define LV_ATTRIBUTE_MEM_ALIGN\n#endif\n\n";
        var $attr_name = "LV_ATTRIBUTE_IMG_" + out_name.toUpperCase();
        $c_header +=
            "#ifndef ".concat($attr_name, "\n#define ").concat($attr_name, "\n#endif\n\nconst LV_ATTRIBUTE_MEM_ALIGN LV_ATTRIBUTE_LARGE_CONST ").concat($attr_name, " uint8_t ") + out_name + "_map[] = {";
        return $c_header;
    };
    Converter.imagemode_to_enum_name = function ($cf) {
        switch ($cf) {
            case enums_1.ImageMode.CF_TRUE_COLOR:
            case enums_1.ImageMode.CF_TRUE_COLOR_ALPHA:
            case enums_1.ImageMode.CF_RAW_ALPHA:
            case enums_1.ImageMode.CF_RGB565A8:
                return "LV_IMG_" + enums_1.ImageMode[$cf];
            case enums_1.ImageMode.CF_TRUE_COLOR_CHROMA:
                return "LV_IMG_CF_TRUE_COLOR_CHROMA_KEYED";
            case enums_1.ImageMode.CF_RAW_CHROMA: /* and CF_RAW due to it having the same value */
                return "LV_IMG_CF_RAW_CHROMA_KEYED";
            case enums_1.ImageMode.CF_ALPHA_1_BIT:
            case enums_1.ImageMode.CF_ALPHA_2_BIT:
            case enums_1.ImageMode.CF_ALPHA_4_BIT:
            case enums_1.ImageMode.CF_ALPHA_8_BIT:
            case enums_1.ImageMode.CF_INDEXED_1_BIT:
            case enums_1.ImageMode.CF_INDEXED_2_BIT:
            case enums_1.ImageMode.CF_INDEXED_4_BIT:
            case enums_1.ImageMode.CF_INDEXED_8_BIT:
                return "LV_IMG_" + enums_1.ImageMode[$cf].replace("_BIT", "BIT");
            default:
                throw new Error("unexpected color format " + $cf);
        }
    };
    Converter.prototype.get_c_footer = function ($cf, out_name) {
        var header_cf = Converter.imagemode_to_enum_name($cf);
        var data_size;
        switch ($cf) {
            case enums_1.ImageMode.CF_TRUE_COLOR:
            case enums_1.ImageMode.CF_TRUE_COLOR_ALPHA:
            case enums_1.ImageMode.CF_TRUE_COLOR_CHROMA:
                data_size = this.w * this.h + " * " + ($cf == enums_1.ImageMode.CF_TRUE_COLOR_ALPHA ? "LV_IMG_PX_SIZE_ALPHA_BYTE" : "LV_COLOR_SIZE / 8");
                break;
            case enums_1.ImageMode.CF_ALPHA_1_BIT:
            case enums_1.ImageMode.CF_ALPHA_2_BIT:
            case enums_1.ImageMode.CF_ALPHA_4_BIT:
            case enums_1.ImageMode.CF_ALPHA_8_BIT:
            case enums_1.ImageMode.CF_INDEXED_1_BIT:
            case enums_1.ImageMode.CF_INDEXED_2_BIT:
            case enums_1.ImageMode.CF_INDEXED_4_BIT:
            case enums_1.ImageMode.CF_INDEXED_8_BIT:
            case enums_1.ImageMode.CF_RGB565A8:
                data_size = this.d_out.length;
                break;
            case enums_1.ImageMode.CF_RAW:
            case enums_1.ImageMode.CF_RAW_ALPHA:
            case enums_1.ImageMode.CF_RAW_CHROMA:
                data_size = this.raw_len;
                break;
            default:
                throw new Error("unexpected color format " + enums_1.ImageMode[$cf]);
        }
        var $c_footer;
        if (!this.options.useLegacyFooterOrder) {
            $c_footer = "\n};\n\nconst lv_img_dsc_t ".concat(out_name, " = {\n  .header.cf = ").concat(header_cf, ",\n  .header.always_zero = 0,\n  .header.reserved = 0,\n  .header.w = ").concat(this.w, ",\n  .header.h = ").concat(this.h, ",\n  .data_size = ").concat(data_size, ",\n  .data = ").concat(out_name, "_map,\n};\n");
        }
        else {
            $c_footer = "\n};\n\nconst lv_img_dsc_t ".concat(out_name, " = {\n  .header.always_zero = 0,\n  .header.w = ").concat(this.w, ",\n  .header.h = ").concat(this.h, ",\n  .data_size = ").concat(data_size, ",\n  .header.cf = ").concat(header_cf, ",\n  .data = ").concat(out_name, "_map,\n};\n");
        }
        return $c_footer;
    };
    Converter.prototype.conv_px = function (x, y) {
        function array_push(arr, v) {
            arr.push(v);
        }
        function isset(val) {
            return typeof val != 'undefined' && val != undefined;
        }
        var startIndex = ((y * this.w) + x) * 4;
        var a;
        if (this.alpha) {
            a = this.imageData[startIndex + 3];
        }
        else {
            a = 0xff;
        }
        var r = this.imageData[startIndex];
        var g = this.imageData[startIndex + 1];
        var b = this.imageData[startIndex + 2];
        var c = this.imageData[((y * this.w) + x)];
        if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565
            || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP
            || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332
            || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888
            || this.cf == enums_1.ImageMode.CF_RGB565A8) {
            /* Populate r_act, g_act, b_act */
            this.dith_next(r, g, b, x);
        }
        if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332) {
            var c8 = (this.r_act) | (this.g_act >> 3) | (this.b_act >> 6); //RGB332
            array_push(this.d_out, c8);
            if (this.alpha)
                array_push(this.d_out, a);
        }
        else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565) {
            var c16 = ((this.r_act) << 8) | ((this.g_act) << 3) | ((this.b_act) >> 3); //RGR565
            array_push(this.d_out, c16 & 0xFF);
            array_push(this.d_out, (c16 >> 8) & 0xFF);
            if (this.alpha)
                array_push(this.d_out, a);
        }
        else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP) {
            var c16 = ((this.r_act) << 8) | ((this.g_act) << 3) | ((this.b_act) >> 3); //RGR565
            array_push(this.d_out, (c16 >> 8) & 0xFF);
            array_push(this.d_out, c16 & 0xFF);
            if (this.alpha)
                array_push(this.d_out, a);
        }
        else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888) {
            array_push(this.d_out, this.b_act);
            array_push(this.d_out, this.g_act);
            array_push(this.d_out, this.r_act);
            array_push(this.d_out, a);
        }
        else if (this.cf == enums_1.ImageMode.CF_RGB565A8) {
            if (this.pass == 0) {
                var c16 = ((this.r_act) << 8) | ((this.g_act) << 3) | ((this.b_act) >> 3); //RGR565
                array_push(this.d_out, c16 & 0xFF);
                array_push(this.d_out, (c16 >> 8) & 0xFF);
            }
            else if (this.pass == 1) {
                if (this.alpha)
                    array_push(this.d_out, a);
            }
        }
        else if (this.cf == enums_1.ImageMode.CF_ALPHA_1_BIT) {
            var w = this.w >> 3;
            if (this.w & 0x07)
                w++;
            var p = w * y + (x >> 3);
            if (!isset(this.d_out[p])) {
                this.d_out[p] = 0; /*Clear the bits first*/
            }
            if (a > 0x80) {
                this.d_out[p] |= 1 << (7 - (x & 0x7));
            }
        }
        else if (this.cf == enums_1.ImageMode.CF_ALPHA_2_BIT) {
            var w = this.w >> 2;
            if (this.w & 0x03)
                w++;
            var p = w * y + (x >> 2);
            if (!isset(this.d_out[p]))
                this.d_out[p] = 0; /*Clear the bits first*/
            this.d_out[p] |= (a >> 6) << (6 - ((x & 0x3) * 2));
        }
        else if (this.cf == enums_1.ImageMode.CF_ALPHA_4_BIT) {
            var w = this.w >> 1;
            if (this.w & 0x01)
                w++;
            var p = w * y + (x >> 1);
            if (!isset(this.d_out[p]))
                this.d_out[p] = 0; /*Clear the bits first*/
            this.d_out[p] |= (a >> 4) << (4 - ((x & 0x1) * 4));
        }
        else if (this.cf == enums_1.ImageMode.CF_ALPHA_8_BIT) {
            var p = this.w * y + x;
            this.d_out[p] = a;
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_1_BIT) {
            var w = this.w >> 3;
            if (this.w & 0x07)
                w++;
            var p = w * y + (x >> 3) + 8; // +8 for the palette
            if (!isset(this.d_out[p]))
                this.d_out[p] = 0; //Clear the bits first
            this.d_out[p] |= (c & 0x1) << (7 - (x & 0x7));
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_2_BIT) {
            var w = this.w >> 2;
            if (this.w & 0x03)
                w++;
            var p = w * y + (x >> 2) + 16; // +16 for the palette
            if (!isset(this.d_out[p]))
                this.d_out[p] = 0; // Clear the bits first
            this.d_out[p] |= (c & 0x3) << (6 - ((x & 0x3) * 2));
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_4_BIT) {
            var w = this.w >> 1;
            if (this.w & 0x01)
                w++;
            var p = w * y + (x >> 1) + 64; // +64 for the palette
            if (!isset(this.d_out[p]))
                this.d_out[p] = 0; // Clear the bits first
            this.d_out[p] |= (c & 0xF) << (4 - ((x & 0x1) * 4));
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_8_BIT) {
            var p = this.w * y + x + 1024; // +1024 for the palette
            this.d_out[p] = c & 0xFF;
        }
    };
    Converter.prototype.dith_reset = function () {
        if (this.options.dith) {
            this.r_nerr = 0;
            this.g_nerr = 0;
            this.b_nerr = 0;
        }
    };
    Converter.prototype.dith_next = function (r, g, b, x) {
        if (this.options.dith) {
            this.r_act = r + this.r_nerr + this.r_earr[x + 1];
            this.r_earr[x + 1] = 0;
            this.g_act = g + this.g_nerr + this.g_earr[x + 1];
            this.g_earr[x + 1] = 0;
            this.b_act = b + this.b_nerr + this.b_earr[x + 1];
            this.b_earr[x + 1] = 0;
            if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332) {
                this.r_act = this.classify_pixel(this.r_act, 3);
                this.g_act = this.classify_pixel(this.g_act, 3);
                this.b_act = this.classify_pixel(this.b_act, 2);
                if (this.r_act > 0xE0)
                    this.r_act = 0xE0;
                if (this.g_act > 0xE0)
                    this.g_act = 0xE0;
                if (this.b_act > 0xC0)
                    this.b_act = 0xC0;
            }
            else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565 || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP) {
                this.r_act = this.classify_pixel(this.r_act, 5);
                this.g_act = this.classify_pixel(this.g_act, 6);
                this.b_act = this.classify_pixel(this.b_act, 5);
                if (this.r_act > 0xF8)
                    this.r_act = 0xF8;
                if (this.g_act > 0xFC)
                    this.g_act = 0xFC;
                if (this.b_act > 0xF8)
                    this.b_act = 0xF8;
            }
            else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888) {
                this.r_act = this.classify_pixel(this.r_act, 8);
                this.g_act = this.classify_pixel(this.g_act, 8);
                this.b_act = this.classify_pixel(this.b_act, 8);
                if (this.r_act > 0xFF)
                    this.r_act = 0xFF;
                if (this.g_act > 0xFF)
                    this.g_act = 0xFF;
                if (this.b_act > 0xFF)
                    this.b_act = 0xFF;
            }
            this.r_nerr = r - this.r_act;
            this.g_nerr = g - this.g_act;
            this.b_nerr = b - this.b_act;
            this.r_nerr = (0, helpers_1.round_half_up)((7 * this.r_nerr) / 16);
            this.g_nerr = (0, helpers_1.round_half_up)((7 * this.g_nerr) / 16);
            this.b_nerr = (0, helpers_1.round_half_up)((7 * this.b_nerr) / 16);
            this.r_earr[x] += (0, helpers_1.round_half_up)((3 * this.r_nerr) / 16);
            this.g_earr[x] += (0, helpers_1.round_half_up)((3 * this.g_nerr) / 16);
            this.b_earr[x] += (0, helpers_1.round_half_up)((3 * this.b_nerr) / 16);
            this.r_earr[x + 1] += (0, helpers_1.round_half_up)((5 * this.r_nerr) / 16);
            this.g_earr[x + 1] += (0, helpers_1.round_half_up)((5 * this.g_nerr) / 16);
            this.b_earr[x + 1] += (0, helpers_1.round_half_up)((5 * this.b_nerr) / 16);
            this.r_earr[x + 2] += (0, helpers_1.round_half_up)(this.r_nerr / 16);
            this.g_earr[x + 2] += (0, helpers_1.round_half_up)(this.g_nerr / 16);
            this.b_earr[x + 2] += (0, helpers_1.round_half_up)(this.b_nerr / 16);
        }
        else {
            if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332) {
                this.r_act = this.classify_pixel(r, 3);
                this.g_act = this.classify_pixel(g, 3);
                this.b_act = this.classify_pixel(b, 2);
                if (this.r_act > 0xE0)
                    this.r_act = 0xE0;
                if (this.g_act > 0xE0)
                    this.g_act = 0xE0;
                if (this.b_act > 0xC0)
                    this.b_act = 0xC0;
            }
            else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565 || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP || this.cf == enums_1.ImageMode.CF_RGB565A8) {
                this.r_act = this.classify_pixel(r, 5);
                this.g_act = this.classify_pixel(g, 6);
                this.b_act = this.classify_pixel(b, 5);
                if (this.r_act > 0xF8)
                    this.r_act = 0xF8;
                if (this.g_act > 0xFC)
                    this.g_act = 0xFC;
                if (this.b_act > 0xF8)
                    this.b_act = 0xF8;
            }
            else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888) {
                this.r_act = this.classify_pixel(r, 8);
                this.g_act = this.classify_pixel(g, 8);
                this.b_act = this.classify_pixel(b, 8);
                if (this.r_act > 0xFF)
                    this.r_act = 0xFF;
                if (this.g_act > 0xFF)
                    this.g_act = 0xFF;
                if (this.b_act > 0xFF)
                    this.b_act = 0xFF;
            }
        }
    };
    Converter.prototype.classify_pixel = function (value, bits) {
        var tmp = 1 << (8 - bits);
        var val = Math.round(value / tmp) * tmp;
        if (val < 0)
            val = 0;
        return val;
    };
    Converter.prototype.format_to_c_array = function () {
        var c_array = "";
        var i = 0;
        var y_end = this.h;
        var x_end = this.w;
        if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332) {
            c_array += "\n#if LV_COLOR_DEPTH == 1 || LV_COLOR_DEPTH == 8";
            if (!this.alpha)
                c_array += "\n  /*Pixel format: Red: 3 bit, Green: 3 bit, Blue: 2 bit*/";
            else
                c_array += "\n  /*Pixel format: Alpha 8 bit, Red: 3 bit, Green: 3 bit, Blue: 2 bit*/";
        }
        else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565) {
            c_array += "\n#if LV_COLOR_DEPTH == 16 && LV_COLOR_16_SWAP == 0";
            if (!this.alpha)
                c_array += "\n  /*Pixel format: Red: 5 bit, Green: 6 bit, Blue: 5 bit*/";
            else
                c_array += "\n  /*Pixel format: Alpha 8 bit, Red: 5 bit, Green: 6 bit, Blue: 5 bit*/";
        }
        else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP) {
            c_array += "\n#if LV_COLOR_DEPTH == 16 && LV_COLOR_16_SWAP != 0";
            if (!this.alpha)
                c_array += "\n  /*Pixel format: Red: 5 bit, Green: 6 bit, Blue: 5 bit BUT the 2 bytes are swapped*/";
            else
                c_array += "\n  /*Pixel format: Alpha 8 bit, Red: 5 bit, Green: 6 bit, Blue: 5 bit  BUT the 2  color bytes are swapped*/";
        }
        else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888) {
            c_array += "\n#if LV_COLOR_DEPTH == 32";
            if (!this.alpha)
                c_array += "\n  /*Pixel format: Fix 0xFF: 8 bit, Red: 8 bit, Green: 8 bit, Blue: 8 bit*/";
            else
                "\n  /*Pixel format: Alpha 8 bit, Red: 8 bit, Green: 8 bit, Blue: 8 bit*/";
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_1_BIT) {
            c_array += "\n";
            for (var p = 0; p < 2; p++) {
                c_array += "  0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 0]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 1]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 2]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 3]), 2, '0', true) + ", ";
                c_array += "\t/*Color of index ".concat(p, "*/\n");
            }
            i = p * 4;
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_2_BIT) {
            c_array += "\n";
            for (p = 0; p < 4; p++) {
                c_array += "  0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 0]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 1]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 2]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 3]), 2, '0', true) + ", ";
                c_array += "\t/*Color of index ".concat(p, "*/\n");
            }
            i = p * 4;
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_4_BIT) {
            c_array += "\n";
            for (p = 0; p < 16; p++) {
                c_array += "  0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 0]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 1]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 2]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 3]), 2, '0', true) + ", ";
                c_array += "\t/*Color of index ".concat(p, "*/\n");
            }
            i = p * 4;
        }
        else if (this.cf == enums_1.ImageMode.CF_INDEXED_8_BIT) {
            c_array += "\n";
            for (p = 0; p < 256; p++) {
                c_array += "  0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 0]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 1]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 2]), 2, '0', true) + ", ";
                c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[p * 4 + 3]), 2, '0', true) + ", ";
                c_array += "\t/*Color of index ".concat(p, "*/\n");
            }
            i = p * 4;
        }
        else if (this.cf == enums_1.ImageMode.CF_RAW_ALPHA || this.cf == enums_1.ImageMode.CF_RAW_CHROMA) {
            y_end = 1;
            x_end = this.d_out.length;
            i = 1;
        }
        else if (this.cf == enums_1.ImageMode.CF_ALPHA_1_BIT
            || this.cf == enums_1.ImageMode.CF_ALPHA_2_BIT
            || this.cf == enums_1.ImageMode.CF_ALPHA_4_BIT
            || this.cf == enums_1.ImageMode.CF_ALPHA_8_BIT
            || this.cf == enums_1.ImageMode.CF_RGB565A8) {
            /* No special handling required */
        }
        else
            throw new Error("Unhandled color format: " + enums_1.ImageMode[this.cf]);
        for (var y = 0; y < y_end; y++) {
            c_array += "\n  ";
            for (var x = 0; x < x_end; x++) {
                /* Note: some accesses to d_out may be out of bounds */
                if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332) {
                    c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                    i++;
                    if (this.alpha) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        i++;
                    }
                }
                else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565 || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP || this.cf == enums_1.ImageMode.CF_RGB565A8) {
                    if (this.options.swapEndian) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 1]), 2, '0', true) + ", ";
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                    }
                    else {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 1]), 2, '0', true) + ", ";
                    }
                    i += 2;
                    if (this.cf != enums_1.ImageMode.CF_RGB565A8 && this.alpha) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        i++;
                    }
                }
                else if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888) {
                    if (this.options.swapEndian) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 2]), 2, '0', true) + ", ";
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 1]), 2, '0', true) + ", ";
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                    }
                    else {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 1]), 2, '0', true) + ", ";
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 2]), 2, '0', true) + ", ";
                    }
                    c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i + 3]), 2, '0', true) + ", ";
                    i += 4;
                }
                else if (this.cf == enums_1.ImageMode.CF_ALPHA_1_BIT || this.cf == enums_1.ImageMode.CF_INDEXED_1_BIT) {
                    if ((x & 0x7) == 0) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        i++;
                    }
                }
                else if (this.cf == enums_1.ImageMode.CF_ALPHA_2_BIT || this.cf == enums_1.ImageMode.CF_INDEXED_2_BIT) {
                    if ((x & 0x3) == 0) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        i++;
                    }
                }
                else if (this.cf == enums_1.ImageMode.CF_ALPHA_4_BIT || this.cf == enums_1.ImageMode.CF_INDEXED_4_BIT) {
                    if ((x & 0x1) == 0) {
                        c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                        i++;
                    }
                }
                else if (this.cf == enums_1.ImageMode.CF_ALPHA_8_BIT || this.cf == enums_1.ImageMode.CF_INDEXED_8_BIT) {
                    c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                    i++;
                }
                else if (this.cf == enums_1.ImageMode.CF_RAW_ALPHA || this.cf == enums_1.ImageMode.CF_RAW_CHROMA) {
                    c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                    if (i != 0 && ((i % 16) == 0))
                        c_array += "\n  ";
                    i++;
                }
                else
                    throw new Error("Unhandled color format: " + enums_1.ImageMode[this.cf]);
            }
        }
        if (this.cf == enums_1.ImageMode.CF_RGB565A8) {
            c_array += "\n  /*alpha channel*/\n  ";
            for (var y = 0; y < y_end; y++) {
                for (var x = 0; x < x_end; x++) {
                    c_array += "0x" + (0, helpers_1.str_pad)((0, helpers_1.dechex)(this.d_out[i]), 2, '0', true) + ", ";
                    i++;
                }
                c_array += "\n  ";
            }
        }
        if (this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332 || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565 || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP || this.cf == enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888) {
            c_array += "\n#endif";
        }
        return c_array;
    };
    return Converter;
}());
exports.Converter = Converter;
function isNotRaw(options) {
    return options.cf != enums_1.ImageMode.CF_RAW && options.cf != enums_1.ImageMode.CF_RAW_ALPHA; /* && options.cf != ImageMode.CF_RAW_CHROMA; */
}
exports.isNotRaw = isNotRaw;
function convertImageBlob(img, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        function isImage(img, options) {
            return isNotRaw(options);
        }
        var c_res_array, bin_res_blob, out_name, outputFormat, c_creator, canvas, ctx, imageData_1, alpha_1, arrayList, binaryConv;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    out_name = options.outName;
                    outputFormat = options.outputFormat;
                    if (!isImage(img, options)) return [3 /*break*/, 8];
                    canvas = (0, canvas_1.createCanvas)(img.width, img.height);
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    imageData_1 = ctx.getImageData(0, 0, img.width, img.height).data;
                    alpha_1 = (options.cf == enums_1.ImageMode.CF_TRUE_COLOR_ALPHA
                        || options.cf == enums_1.ImageMode.CF_ALPHA_1_BIT
                        || options.cf == enums_1.ImageMode.CF_ALPHA_2_BIT
                        || options.cf == enums_1.ImageMode.CF_ALPHA_4_BIT
                        || options.cf == enums_1.ImageMode.CF_ALPHA_8_BIT
                        || options.cf == enums_1.ImageMode.CF_RGB565A8);
                    c_creator = new Converter(img.width, img.height, imageData_1, alpha_1, options);
                    if (!(options.outputFormat == enums_1.OutputMode.C)) return [3 /*break*/, 5];
                    if (!(options.cf == enums_1.ImageMode.CF_TRUE_COLOR || options.cf == enums_1.ImageMode.CF_TRUE_COLOR_ALPHA || options.cf == enums_1.ImageMode.CF_TRUE_COLOR_CHROMA)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all([
                            enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8332,
                            enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565,
                            enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8565_RBSWAP,
                            enums_1.ImageMode.ICF_TRUE_COLOR_ARGB8888
                        ].map(function (cf) { return new Converter(img.width, img.height, imageData_1, alpha_1, Object.assign({}, options, { cf: cf })).convert(); }))];
                case 1:
                    arrayList = _c.sent();
                    c_res_array = arrayList.join("");
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, c_creator.convert()];
                case 3:
                    c_res_array = (_c.sent());
                    _c.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    binaryConv = new Converter(img.width, img.height, imageData_1, alpha_1, options);
                    return [4 /*yield*/, binaryConv.convert()];
                case 6:
                    bin_res_blob = (_c.sent());
                    _c.label = 7;
                case 7: return [3 /*break*/, 12];
                case 8:
                    c_creator = new Converter((_a = options.overrideWidth) !== null && _a !== void 0 ? _a : 0, (_b = options.overrideHeight) !== null && _b !== void 0 ? _b : 0, img, options.cf == enums_1.ImageMode.CF_RAW_ALPHA, options);
                    if (!(options.outputFormat == enums_1.OutputMode.C)) return [3 /*break*/, 10];
                    return [4 /*yield*/, c_creator.convert()];
                case 9:
                    c_res_array = (_c.sent());
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, c_creator.convert()];
                case 11:
                    bin_res_blob = (_c.sent());
                    _c.label = 12;
                case 12:
                    if (outputFormat == enums_1.OutputMode.BIN)
                        return [2 /*return*/, bin_res_blob];
                    else
                        return [2 /*return*/, c_creator.get_c_header(out_name) + c_res_array + c_creator.get_c_footer(options.cf, out_name)];
                    return [2 /*return*/];
            }
        });
    });
}
exports.convertImageBlob = convertImageBlob;
