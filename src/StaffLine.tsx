import { For, onCleanup, onMount } from "solid-js";
import { useCanvas } from "./createCanvas";
import { Line } from "fabric";
import { Note as NoteType } from "./parsers";
import { Note } from "./Note";
import config from "../config/tabs-config.json";

interface StaffLineProps {
  width: number;
  num: number;
  spacing: number;
  notes: NoteType[];
}

const notePosition = (
  dashes: number,
  notesOffset: number,
  initialOffset: number
) => {
  return dashes * notesOffset + initialOffset;
};

export const StaffLine = (props: StaffLineProps) => {
  const y = props.num * props.spacing;

  onMount(() => {
    const canvas = useCanvas();
    if (!canvas) return;

    const line = new Line([0, y, props.width, y], {
      stroke: "black",
      opacity: 0.5,
      strokeWidth: 1,
    });

    canvas.add(line);

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
              line={y}
              position={notePosition(
                note.offset,
                config.notesOffset,
                config.initialOffset
              )}
            ></Note>
          );
        }}
      </For>
    </>
  );
};
