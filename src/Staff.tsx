import { For, createEffect, onMount } from 'solid-js';
import { StaffLine } from './StaffLine';
import { Notation, Note } from './parsers';
import { useCanvas } from './createCanvas';
import { Rect } from 'fabric';

export const Staff = (props: { linesNum: number; notation: Note[][] }) => {
  createEffect(() => {
    console.log('notation', props.notation);
  });

  onMount(() => {});

  return (
    <For each={Array(props.linesNum)}>
      {(_, i) => (
        <StaffLine
          spacing={25}
          width={500}
          num={i() + 1}
          notes={props.notation[i()] ?? []}
        />
      )}
    </For>
  );
};
