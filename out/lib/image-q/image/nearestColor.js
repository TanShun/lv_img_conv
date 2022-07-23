"use strict";
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
exports.__esModule = true;
exports.NearestColor = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * nearestColor.ts - part of Image Quantization Library
 */
var imageQuantizer_1 = require("./imageQuantizer");
var progressTracker_1 = require("../utils/progressTracker");
var NearestColor = /** @class */ (function (_super) {
    __extends(NearestColor, _super);
    function NearestColor(colorDistanceCalculator) {
        var _this = _super.call(this) || this;
        _this._distance = colorDistanceCalculator;
        return _this;
    }
    /**
     * Mutates pointContainer
     */
    NearestColor.prototype.quantize = function (pointContainer, palette) {
        var pointArray, width, height, tracker, y, x, idx, point;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pointArray = pointContainer.getPointArray();
                    width = pointContainer.getWidth();
                    height = pointContainer.getHeight();
                    tracker = new progressTracker_1.ProgressTracker(height, 99);
                    y = 0;
                    _a.label = 1;
                case 1:
                    if (!(y < height)) return [3 /*break*/, 5];
                    if (!tracker.shouldNotify(y)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            progress: tracker.progress
                        }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    for (x = 0, idx = y * width; x < width; x++, idx++) {
                        point = pointArray[idx];
                        // Reduced pixel
                        point.from(palette.getNearestColor(this._distance, point));
                    }
                    _a.label = 4;
                case 4:
                    y++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, {
                        pointContainer: pointContainer,
                        progress: 100
                    }];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return NearestColor;
}(imageQuantizer_1.AbstractImageQuantizer));
exports.NearestColor = NearestColor;
