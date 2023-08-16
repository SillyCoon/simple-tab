import { List } from "immutable";

export interface Notation {
  type: "dash" | "note";
  value?: number;
}

export const tabParser = (tabs: string): Notation[][] => {
  const tabLines = tabs
    .trim()
    .split("\n")
    .map((line) => List(line.split("")));

  console.log(tabLines.toString());

  const process = (
    symbols: List<string>,
    notation: List<Notation>
  ): List<Notation> => {
    if (symbols.isEmpty()) return notation.reverse();
    if (symbols.last() === "-") {
      return process(
        symbols.butLast(),
        notation.last()?.type === "dash"
          ? notation.update(-1, (v: Notation | undefined) => ({
              type: "dash",
              value: (v?.value ?? 0) + 1,
            }))
          : notation.push({ type: "dash", value: 1 })
      );
    } else {
      return process(
        symbols.butLast(),
        notation.push({ type: "note", value: +(symbols.last() ?? 0) })
      );
    }
  };

  return tabLines.map((line) => process(line, List())).map((v) => v?.toArray());
};
