import { For, onCleanup, onMount } from "solid-js";
import { useCanvas } from "./createCanvas";
import { Line } from "fabric";
import { Note as NoteType } from "./parsers";
import { Note } from "./Note";

interface StaffLineProps {
  width: number;
  num: number;
  spacing: number;
  notes: NoteType[];
}

const notePlace = (
  lineNum: number,
  lineGap: number,
  fontSize: number,
  lineWidth: number
) => {
  return lineNum * lineGap - (fontSize / 2 + lineWidth * 2);
};

export const StaffLine = (props: StaffLineProps) => {
  onMount(() => {
    const canvas = useCanvas();
    const y = props.num * props.spacing;

    const line = new Line([0, y, props.width, y], {
      stroke: "black",
      opacity: 0.5,
      strokeWidth: 1,
    });

    canvas?.add(line);

    onCleanup(() => {
      line && useCanvas()?.remove(line);
    });
  });

  return (
    <>
      <For each={props.notes}>
        {(note) => {
          return (
            <Note
              value={note.value}
              line={notePlace(props.num, props.spacing, 16, 1)}
              place={note.offset * 15}
            ></Note>
          );
        }}
      </For>
    </>
  );
};
