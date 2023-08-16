import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Notation } from "./parsers";

interface TabsCanvasProps {
  parsedTabs: Notation[];
  width: number;
  height: number;
  columnWidth: number;
  lineHeight: number;
  dashWidth: number;
}

function TabsCanvas(props: TabsCanvasProps) {
  const [context, setCtx] = createSignal<
    CanvasRenderingContext2D | undefined
  >();

  let canvas: HTMLCanvasElement | undefined = undefined;

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    setCtx(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px monospace";
    ctx.fillStyle = "black";

    onCleanup(() => {
      canvas && ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });

  createEffect(() => {
    const ctx = context();
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawDash = (x: number, y: number, length: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.stroke();
      return x + length;
    };

    const drawNote = (x: number, y: number, note: number) => {
      ctx.fillText(note.toString(), x, y);
      return x + 16;
    };

    const draw = (notation: Notation, x: number, y: number) => {
      if (notation.type === "dash" && notation.value !== undefined) {
        return drawDash(x, (y + 16) / 2, notation.value * props.dashWidth);
      } else if (notation.type === "note" && notation.value !== undefined) {
        return drawNote(x, y, notation.value);
      }
      return 0;
    };

    props.parsedTabs.reduce((x, notation) => {
      const y = props.lineHeight;
      return draw(notation, x, y);
    }, 0);
  });

  return (
    <canvas ref={canvas} width={props.width} height={props.height}></canvas>
  );
}

export default TabsCanvas;
