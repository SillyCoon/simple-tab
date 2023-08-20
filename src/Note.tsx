import { onCleanup, onMount } from "solid-js";
import { useCanvas } from "./createCanvas";
import { Text, Rect } from "fabric";

export const Note = (props: { value: number; line: number; place: number }) => {
  const fontSize = 16;

  onMount(() => {
    const canvas = useCanvas();
    if (!canvas) return;

    const note = new Text(props.value.toString(), {
      fontSize,
      left: props.place,
      top: props.line,
    });

    const noteBox = new Rect({
      left: props.place - 1,
      top: props.line,
      width: note.width + 2,
      height: note.height + 2,
      fill: "white",
    });

    canvas.add(noteBox);
    canvas.add(note);

    onCleanup(() => {
      canvas.remove(note);
      canvas.remove(noteBox);
    });
  });

  return <></>;
};
