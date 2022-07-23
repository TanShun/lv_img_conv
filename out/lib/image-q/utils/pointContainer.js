"use strict";
exports.__esModule = true;
exports.PointContainer = void 0;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pointContainer.ts - part of Image Quantization Library
 */
var point_1 = require("./point");
/**
 * v8 optimizations done.
 * fromXXX methods are static to move out polymorphic code from class instance itself.
 */
var PointContainer = /** @class */ (function () {
    function PointContainer() {
        this._width = 0;
        this._height = 0;
        this._pointArray = [];
    }
    PointContainer.prototype.getWidth = function () {
        return this._width;
    };
    PointContainer.prototype.getHeight = function () {
        return this._height;
    };
    PointContainer.prototype.setWidth = function (width) {
        this._width = width;
    };
    PointContainer.prototype.setHeight = function (height) {
        this._height = height;
    };
    PointContainer.prototype.getPointArray = function () {
        return this._pointArray;
    };
    PointContainer.prototype.clone = function () {
        var clone = new PointContainer();
        clone._width = this._width;
        clone._height = this._height;
        for (var i = 0, l = this._pointArray.length; i < l; i++) {
            clone._pointArray[i] = point_1.Point.createByUint32(this._pointArray[i].uint32 | 0); // "| 0" is added for v8 optimization
        }
        return clone;
    };
    PointContainer.prototype.toUint32Array = function () {
        var l = this._pointArray.length;
        var uint32Array = new Uint32Array(l);
        for (var i = 0; i < l; i++) {
            uint32Array[i] = this._pointArray[i].uint32;
        }
        return uint32Array;
    };
    PointContainer.prototype.toUint8Array = function () {
        return new Uint8Array(this.toUint32Array().buffer);
    };
    PointContainer.fromHTMLImageElement = function (img) {
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        // eslint-disable-next-line no-undef
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        var ctx = canvas.getContext('2d'); // tslint:disable-line:no-non-null-assertion
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        return PointContainer.fromHTMLCanvasElement(canvas);
    };
    PointContainer.fromHTMLCanvasElement = function (canvas) {
        var width = canvas.width;
        var height = canvas.height;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        var ctx = canvas.getContext('2d'); // tslint:disable-line:no-non-null-assertion
        var imgData = ctx.getImageData(0, 0, width, height);
        return PointContainer.fromImageData(imgData);
    };
    PointContainer.fromImageData = function (imageData) {
        var width = imageData.width;
        var height = imageData.height;
        return PointContainer.fromUint8Array(imageData.data, width, height);
    };
    PointContainer.fromUint8Array = function (uint8Array, width, height) {
        switch (Object.prototype.toString.call(uint8Array)) {
            case '[object Uint8ClampedArray]':
            case '[object Uint8Array]':
                break;
            default:
                uint8Array = new Uint8Array(uint8Array);
        }
        var uint32Array = new Uint32Array(uint8Array.buffer);
        return PointContainer.fromUint32Array(uint32Array, width, height);
    };
    PointContainer.fromUint32Array = function (uint32Array, width, height) {
        var container = new PointContainer();
        container._width = width;
        container._height = height;
        for (var i = 0, l = uint32Array.length; i < l; i++) {
            container._pointArray[i] = point_1.Point.createByUint32(uint32Array[i] | 0); // "| 0" is added for v8 optimization
        }
        return container;
    };
    PointContainer.fromBuffer = function (buffer, width, height) {
        var uint32Array = new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
        return PointContainer.fromUint32Array(uint32Array, width, height);
    };
    return PointContainer;
}());
exports.PointContainer = PointContainer;
