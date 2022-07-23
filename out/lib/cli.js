"use strict";
/* implement suggestions from https://forum.littlevgl.com/t/a-little-extension-to-image-converter/1902 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cli_helpers_1 = require("./cli_helpers");
var enums_1 = require("./enums");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yargs_1 = __importDefault(require("yargs"));
var argv = yargs_1["default"]
    .option('output-file', {
    alias: 'o',
    type: 'string',
    description: 'output file path (for single-image conversion)'
})
    .option('force', {
    alias: 'f',
    type: 'boolean',
    description: 'allow overwriting the output file'
})
    .option('image-name', {
    alias: 'i',
    type: 'string',
    description: 'name of image structure'
})
    .option('color-format', {
    alias: 'c',
    demandOption: true,
    description: 'color format of image',
    choices: Object.keys(enums_1.ImageMode).filter(function (v) { return (isNaN(v) && !v.startsWith("ICF")); }) /* skip internal formats */
})
    .option('output-format', {
    alias: 't',
    description: 'output format of image',
    choices: ['c', 'bin'],
    "default": 'c'
})
    .option('binary-format', {
    description: 'binary color format (needed if output-format is binary)',
    string: true,
    choices: Object.keys(enums_1.ImageMode).filter(function (v) { return (isNaN(v) && v.startsWith(enums_1.BINARY_FORMAT_PREFIX)); }).map(function (v) { return v.substring(enums_1.BINARY_FORMAT_PREFIX.length); }) /* skip internal formats */
})
    .option('swap-endian', {
    alias: 's',
    type: 'boolean',
    description: 'swap endian of image'
})
    .option('dither', {
    alias: 'd',
    type: 'boolean',
    description: 'enable dither'
})
    .argv;
function getFileName(imagePath) {
    var lastDotPos = imagePath.lastIndexOf(".");
    if (lastDotPos < 0)
        lastDotPos = imagePath.length;
    return imagePath.substr(0, lastDotPos);
}
function getCFilePath(imagePath, outputMode) {
    return getFileName(imagePath) + '.' + (outputMode == enums_1.OutputMode.C ? 'c' : 'bin');
}
function convertAllImages() {
    return __awaiter(this, void 0, void 0, function () {
        var outputMode, binaryFormat, colorFormat, _a, _b, imagePath, imageName, cFileString, outputPath, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (argv.o && argv._.length > 1) {
                        console.error("Error: only one image can be converted at a time when -o is specified.");
                        process.exit(1);
                    }
                    outputMode = enums_1.OutputMode[argv.t.toUpperCase()];
                    binaryFormat = argv["binary-format"];
                    colorFormat = enums_1.ImageMode[argv["color-format"]];
                    if (typeof outputMode == 'undefined') {
                        console.error("Invalid output mode");
                        process.exit(1);
                    }
                    if (outputMode == enums_1.OutputMode.BIN && enums_1.ImageModeUtil.isTrueColor(colorFormat) && typeof binaryFormat == 'undefined') {
                        console.error("Error: when converting true color binary images, --binary-format must be specified");
                        process.exit(1);
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    _a = __values(argv._), _b = _a.next();
                    _d.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    imagePath = _b.value;
                    console.log("Beginning conversion of " + imagePath);
                    imageName = argv.i ? argv.i : getFileName(path_1["default"].basename(imagePath));
                    return [4 /*yield*/, (0, cli_helpers_1.convert)(imagePath, { cf: colorFormat, outputFormat: outputMode, binaryFormat: enums_1.ImageMode[enums_1.BINARY_FORMAT_PREFIX + binaryFormat], swapEndian: argv.s, outName: imageName, dith: argv.dither })];
                case 3:
                    cFileString = _d.sent();
                    outputPath = (argv.o ? argv.o : getCFilePath(imageName, outputMode));
                    if (fs_1["default"].existsSync(outputPath)) {
                        if (argv.f) {
                            console.log("overwriting " + outputPath);
                        }
                        else {
                            console.error("Error: refusing to overwrite " + outputPath + " without -f specified.");
                            process.exit(1);
                        }
                    }
                    if (typeof cFileString == 'string')
                        fs_1["default"].writeFileSync(outputPath, cFileString);
                    else
                        fs_1["default"].writeFileSync(outputPath, new Uint8Array(cFileString));
                    _d.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
convertAllImages();
