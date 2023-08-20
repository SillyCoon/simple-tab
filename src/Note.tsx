import { onCleanup, onMount } from 'solid-js';
import { useCanvas } from './createCanvas';
import { Text } from 'fabric';

export const Note = (props: { value: number; line: number; place: number }) => {
  const note = new Text(props.value.toString(), {
    fontSize: '16',
    left: props.place,
    top: props.line,
  });

  onMount(() => {
    console.log(props.line);
    const canvas = useCanvas();
    if (!canvas) return;

    console.log(props.place, props.line * 15);

    note.set({
      left: props.place,
      top: props.line,
    });

    canvas.add(note);
  });

  onCleanup(() => {
    useCanvas()?.remove(note);
  });

  return <></>;
};
