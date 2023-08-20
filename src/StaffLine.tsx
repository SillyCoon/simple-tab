import { For, createEffect, onCleanup, onMount } from "solid-js";
import { useCanvas, createCanvas } from "./createCanvas";
import { Line } from "fabric";
import { Notation, notationToNotes } from "./parsers";
import { Note } from "./Note";
import { List } from "immutable";

interface StaffLineProps {
  width: number;
  num: number;
  spacing: number;
  notation: Notation[];
}

export const StaffLine = ({
  width,
  num,
  spacing,
  notation,
}: StaffLineProps) => {
  createEffect(() => {
    const canvas = useCanvas();
    const line = new Line([0, num * spacing, width, num * spacing], {
      stroke: "black",
      opacity: 0.5,
      strokeWidth: 1,
    });

    console.log(notation);

    console.log("line", line);
    canvas?.add(line);
  });

  onCleanup(() => {
    useCanvas?.()?.clear();
  });
  return (
    <>
      <For each={notationToNotes(List(notation))}>
        {(note) => {
          return (
            <Note value={note.value} line={num} place={note.offset}></Note>
          );
        }}
      </For>
    </>
  );
};
