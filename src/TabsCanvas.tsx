import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Notation } from "./parsers";
import { fabric } from "fabric";
import { createCanvas } from "./createCanvas";

interface TabsCanvasProps {
  parsedTabs: Notation[];
  width: number;
  height: number;
  columnWidth: number;
  lineHeight: number;
  dashWidth: number;
}

const fontSize = 16;

function TabsCanvas(props: TabsCanvasProps) {
  const [canvas, setCanvas] = createSignal<fabric.Canvas | undefined>();

  let cvs: HTMLCanvasElement | undefined = undefined;
  onMount(() => {
    setCanvas(createCanvas(cvs));
    onCleanup(() => {
      canvas()?.clear();
    });
  });

  createEffect(() => {
    if (!canvas()) return;

    const drawTabs = (canvas: fabric.Canvas) => {
      canvas.clear();

      const drawDash = (x: number, y: number, length: number) => {
        const dash = new fabric.Line([x, y, x + length, y], {
          stroke: "black",
          strokeWidth: 1,
        });
        canvas.add(dash);
        return x + length;
      };

      const drawNote = (x: number, y: number, note: number) => {
        const nt = new fabric.Text(note.toString(), {
          left: x,
          fontSize,
          top: y / 2,
        });

        canvas.add(nt);
        return x + note.toString().length * fontSize;
      };

      const draw = (notation: Notation, x: number, y: number) => {
        if (notation.type === "dash" && notation.value !== undefined) {
          return drawDash(
            x,
            (y + fontSize) / 2,
            notation.value * props.dashWidth
          );
        } else if (notation.type === "note" && notation.value !== undefined) {
          return drawNote(x, y, notation.value);
        }
        return 0;
      };
      props.parsedTabs?.reduce((x, notation) => {
        const y = props.lineHeight;
        return draw(notation, x, y);
      }, 0);
    };

    drawTabs(canvas()!);
  });

  return (
    <canvas
      ref={cvs}
      id="canvas"
      width={props.width}
      height={props.height}
    ></canvas>
  );
}

export default TabsCanvas;
