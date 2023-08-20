import { For, createEffect, onMount } from "solid-js";
import { StaffLine } from "./StaffLine";
import { Note } from "./parsers";

export const Staff = (props: {
  linesNum: number;
  notation: Note[][];
  width: number;
}) => {
  createEffect(() => {
    console.log("notation", props.notation);
  });

  onMount(() => {});

  return (
    <For each={Array(props.linesNum)}>
      {(_, i) => (
        <StaffLine
          spacing={25}
          width={props.width}
          num={i() + 1}
          notes={props.notation[i()] ?? []}
        />
      )}
    </For>
  );
};
