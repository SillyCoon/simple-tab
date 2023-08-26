import { onCleanup, onMount } from "solid-js";
import { useCanvas } from "../createCanvas";
import { Text, Rect, Group } from "fabric";
import config from "../../config/tabs-config.json";
import { Notation as NotationType, isNote } from "../parsers/parser";

const makeBoxedNote = (val: string, fontSize: number) => {
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

    if (!isNote(props.notation)) {
      return;
    }

    const boxedNote = makeBoxedNote(
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
  });

  return <></>;
};
