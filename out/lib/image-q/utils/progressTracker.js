"use strict";
exports.__esModule = true;
exports.ProgressTracker = void 0;
var ProgressTracker = /** @class */ (function () {
    function ProgressTracker(valueRange, progressRange) {
        this._range = valueRange;
        this._progressRange = progressRange;
        this._step = Math.max(1, (this._range / (ProgressTracker.steps + 1)) | 0);
        this._last = -this._step;
        this.progress = 0;
    }
    ProgressTracker.prototype.shouldNotify = function (current) {
        if (current - this._last >= this._step) {
            this._last = current;
            this.progress = Math.min((this._progressRange * this._last) / this._range, this._progressRange);
            return true;
        }
        return false;
    };
    ProgressTracker.steps = 100;
    return ProgressTracker;
}());
exports.ProgressTracker = ProgressTracker;
