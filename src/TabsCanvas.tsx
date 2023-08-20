import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';
import { Notation, Note } from './parsers';
import { Text, Line, Canvas, Rect } from 'fabric';
import { createCanvas, useCanvas } from './createCanvas';
import { Staff } from './Staff';

interface TabsCanvasProps {
  parsedTabs: Note[][];
  columnWidth: number;
  lineHeight: number;
  dashWidth: number;
  width: number;
  height: number;
}

const fontSize = 16;

const makeNote = (note: number) => {
  return new Text(note.toString(), { fontSize });
};

type Staff = Line[];

function makeMusicStaff(width: number, spacing: number) {
  const numLines = 6; // Number of lines in a music staff

  for (let i = 0; i < numLines; i++) {
    const y = i * spacing;
    const line = new Line([0, y, width, y], {
      stroke: 'black',
      opacity: 0.5,
      strokeWidth: 1,
    });
  }
}

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
      strokeWidth: 1,
      stroke: 'red',
      fill: null,
    });

    canvas?.add(box);
  });

  createEffect(() => {
    // const drawTabs = (canvas: Canvas) => {
    //   const drawDash = (x: number, y: number, length: number) => {
    //     const dash = new Line([x, y, x + length, y], {
    //       stroke: 'black',
    //       strokeWidth: 1,
    //     });
    //     canvas.add(dash);
    //     return x + length;
    //   };
    //   const drawNote = (x: number, y: number, note: number) => {
    //     const nt = new Text(note.toString(), {
    //       left: x,
    //       fontSize,
    //       top: y / 2,
    //     });
    //     canvas.add(nt);
    //     return x + note.toString().length * fontSize;
    //   };
    //   const draw = (notation: Notation, x: number, y: number) => {
    //     if (notation.type === 'dash' && notation.value !== undefined) {
    //       return drawDash(
    //         x,
    //         (y + fontSize) / 2,
    //         notation.value * props.dashWidth,
    //       );
    //     } else if (notation.type === 'note' && notation.value !== undefined) {
    //       return drawNote(x, y, notation.value);
    //     }
    //     return 0;
    //   };
    //   props.parsedTabs?.reduce((x, notation) => {
    //     const y = props.lineHeight;
    //     return draw(notation, x, y);
    //   }, 0);
    // };
    // drawTabs(canvas()!);
  });

  return (
    <>
      <Staff linesNum={6} notation={props.parsedTabs}></Staff>
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
