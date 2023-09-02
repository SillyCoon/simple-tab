import { onCleanup, onMount } from "solid-js";
import { useCanvas } from "../createCanvas";
import { Text, Rect, Group, Path } from "fabric";
import config from "../../config/tabs-config.json";
import { Notation as NotationType, isNote } from "../parsers/Notation";

const BoxedNote = (val: string, fontSize: number) => {
  const note = new Text(val, {
    originY: "center",
    originX: "center",
    fontSize,
  });

  const noteBox = new Rect({
    originX: "center",
    originY: "center",
    fill: "white",
    width: note.getBoundingRect().width + 2,
    height: note.getBoundingRect().height,
  });

  return new Group([noteBox, note], {
    originY: "center",
  });
};

export const Notation = (props: {
  notation: NotationType;
  line: number;
  position: number;
}) => {
  onMount(() => {
    const canvas = useCanvas();
    if (!canvas) return;

    if (isNote(props.notation)) {
      const boxedNote = BoxedNote(
        props.notation.value.toString(),
        config.fontSize,
      ).set({
        top: props.line,
        left: props.position,
      });

      canvas.add(boxedNote);

      onCleanup(() => {
        canvas.remove(boxedNote);
      });
    } else {
      const curve = new Path(`M0 0 A${30} ${props.line} 0 0 1 ${30} 0`, {
        left: props.position - config.notesOffset / 2,
        top: props.line - config.notationLineOffset,
        stroke: "black",
        fill: "",
        strokeWidth: 1,
      });

      canvas.add(curve);

      onCleanup(() => {
        canvas.remove(curve);
      });
    }
  });

  return <></>;
};
