import { Canvas } from "fabric";
import { createSignal } from "solid-js";

const [canvas, setCanvas] = createSignal<Canvas>();

export const createCanvas = (canvas: HTMLCanvasElement) => {
  setCanvas(new Canvas(canvas));
};

export const useCanvas = canvas;
