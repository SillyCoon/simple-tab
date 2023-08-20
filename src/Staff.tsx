import { For, createEffect } from "solid-js";
import { StaffLine } from "./StaffLine";
import { Notation } from "./parsers";

export const Staff = ({
  linesNum,
  notation,
}: {
  linesNum: number;
  notation: Notation[][];
}) => {
  createEffect(() => {
    console.log("notation", notation);
  });

  return (
    <For each={Array(linesNum)}>
      {(_, i) => (
        <StaffLine
          spacing={25}
          width={500}
          num={i()}
          notation={notation[i()] ?? []}
        />
      )}
    </For>
  );
};
