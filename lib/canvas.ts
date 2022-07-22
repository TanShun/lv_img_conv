import type { Image } from "@napi-rs/canvas";

let createCanvas;
if (typeof window === 'object') {
    createCanvas = (width: number, height: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    };
} else {
    import("@napi-rs/canvas").then((canvas) => {
      createCanvas = canvas.createCanvas;
    });
}

export {createCanvas, Image};
