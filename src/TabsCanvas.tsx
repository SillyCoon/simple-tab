import { onCleanup, onMount } from "solid-js";
import type { Notation } from "./parsers/Notation";
import { Line, Rect } from "fabric";
import { createCanvas, useCanvas } from "./createCanvas";
import { Staff } from "./components/Staff";

interface TabsCanvasProps {
  parsedTabs: Notation[][];
  columnWidth: number;
  lineHeight: number;
  dashWidth: number;
  width: number;
  height: number;
}

type Staff = Line[];

function TabsCanvas(props: TabsCanvasProps) {
  let htmlCanvas: HTMLCanvasElement | undefined;

  onMount(() => {
    createCanvas(htmlCanvas!);
    onCleanup(() => {
      // useCanvas?.()?.clear();
    });

    const canvas = useCanvas();

    if (!canvas) return;

    const box = new Rect({
      left: 0,
      top: 0,
      width: canvas?.width - 1,
      height: canvas?.height - 1,
      stroke: "black",
      opacity: 0.5,
      strokeWidth: 1,
      fill: null,
    });

    canvas.add(box);
  });

  return (
    <>
      <Staff
        linesNum={6}
        notation={props.parsedTabs}
        width={props.width}
      ></Staff>
      <canvas
        ref={htmlCanvas}
        width={props.width}
        height={props.height}
        id="canvas"
      ></canvas>
    </>
  );
}

export default TabsCanvas;
