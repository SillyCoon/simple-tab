import { createEffect } from "solid-js";
import { useCanvas } from "./createCanvas";
import { Text } from "fabric";

export const Note = ({
  value,
  line,
  place,
}: {
  value: number;
  line: number;
  place: number;
}) => {
  createEffect(() => {
    const canvas = useCanvas();
    if (!canvas) return;

    const note = new Text(value.toString(), { left: place, top: line });
    console.log("note", value);
    console.log(value, line, place);
    canvas.add(note);
  });

  return <></>;
};
