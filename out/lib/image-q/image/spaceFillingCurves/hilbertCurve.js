"use strict";
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
exports.__esModule = true;
exports.hilbertCurve = void 0;
var progressTracker_1 = require("../../utils/progressTracker");
var Direction;
(function (Direction) {
    Direction[Direction["NONE"] = 0] = "NONE";
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
    Direction[Direction["DOWN"] = 4] = "DOWN";
})(Direction || (Direction = {}));
function hilbertCurve(width, height, callback) {
    var maxBound, level, tracker, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                maxBound = Math.max(width, height);
                level = Math.floor(Math.log(maxBound) / Math.log(2) + 1);
                tracker = new progressTracker_1.ProgressTracker(width * height, 99);
                data = {
                    width: width,
                    height: height,
                    level: level,
                    callback: callback,
                    tracker: tracker,
                    index: 0,
                    x: 0,
                    y: 0
                };
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 1:
                _a.sent();
                visit(data, Direction.NONE);
                return [2 /*return*/];
        }
    });
}
exports.hilbertCurve = hilbertCurve;
function walkHilbert(data, direction) {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (data.level < 1)
                    return [2 /*return*/];
                if (!data.tracker.shouldNotify(data.index)) return [3 /*break*/, 2];
                return [4 /*yield*/, { progress: data.tracker.progress }];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                data.level--;
                _a = direction;
                switch (_a) {
                    case Direction.LEFT: return [3 /*break*/, 3];
                    case Direction.RIGHT: return [3 /*break*/, 8];
                    case Direction.UP: return [3 /*break*/, 13];
                    case Direction.DOWN: return [3 /*break*/, 18];
                }
                return [3 /*break*/, 23];
            case 3: return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 4:
                _b.sent();
                visit(data, Direction.RIGHT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 5:
                _b.sent();
                visit(data, Direction.DOWN);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 6:
                _b.sent();
                visit(data, Direction.LEFT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 7:
                _b.sent();
                return [3 /*break*/, 24];
            case 8: return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 9:
                _b.sent();
                visit(data, Direction.LEFT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 10:
                _b.sent();
                visit(data, Direction.UP);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 11:
                _b.sent();
                visit(data, Direction.RIGHT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 12:
                _b.sent();
                return [3 /*break*/, 24];
            case 13: return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 14:
                _b.sent();
                visit(data, Direction.DOWN);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 15:
                _b.sent();
                visit(data, Direction.RIGHT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.UP))];
            case 16:
                _b.sent();
                visit(data, Direction.UP);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 17:
                _b.sent();
                return [3 /*break*/, 24];
            case 18: return [5 /*yield**/, __values(walkHilbert(data, Direction.RIGHT))];
            case 19:
                _b.sent();
                visit(data, Direction.UP);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 20:
                _b.sent();
                visit(data, Direction.LEFT);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.DOWN))];
            case 21:
                _b.sent();
                visit(data, Direction.DOWN);
                return [5 /*yield**/, __values(walkHilbert(data, Direction.LEFT))];
            case 22:
                _b.sent();
                return [3 /*break*/, 24];
            case 23: return [3 /*break*/, 24];
            case 24:
                data.level++;
                return [2 /*return*/];
        }
    });
}
function visit(data, direction) {
    if (data.x >= 0 &&
        data.x < data.width &&
        data.y >= 0 &&
        data.y < data.height) {
        data.callback(data.x, data.y);
        data.index++;
    }
    // eslint-disable-next-line default-case
    switch (direction) {
        case Direction.LEFT:
            data.x--;
            break;
        case Direction.RIGHT:
            data.x++;
            break;
        case Direction.UP:
            data.y--;
            break;
        case Direction.DOWN:
            data.y++;
            break;
    }
}
