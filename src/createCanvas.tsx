import { fabric } from "fabric";
import { createMemo } from "solid-js";

export const createCanvas = (cvs?: HTMLCanvasElement) => {
  console.log("createCanvas", cvs);

  return cvs ? new fabric.Canvas(cvs) : undefined;
};
