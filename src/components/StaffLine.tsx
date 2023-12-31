import { For, onCleanup, onMount } from "solid-js";
import { useCanvas } from "../createCanvas";
import { Line } from "fabric";
import type { Notation as NotationType } from "../parsers/Notation";
import { Notation } from "./Notation";
import config from "../../config/tabs-config.json";

interface StaffLineProps {
  width: number;
  num: number;
  spacing: number;
  notation: NotationType[];
}

const notePosition = (
  dashes: number,
  notesBefore: number,
  notesOffset: number,
  initialOffset: number,
) => {
  return initialOffset + dashes * notesOffset + notesBefore * notesOffset;
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
      <For each={props.notation}>
        {(note) => {
          return (
            <Notation
              notation={note}
              line={y}
              position={notePosition(
                note.offset,
                note.order,
                config.notesOffset,
                config.initialOffset,
              )}
            ></Notation>
          );
        }}
      </For>
    </>
  );
};
