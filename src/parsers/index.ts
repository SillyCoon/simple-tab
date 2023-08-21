import { List } from "immutable";

export interface Notation {
  type: "dash" | "note";
  value?: number;
}

interface NoteNotation extends Notation {
  type: "note";
  value: number;
}

interface DashNotation extends Notation {
  type: "dash";
  value: number;
}

const isDash = (n: Notation): n is DashNotation => n.type === "dash";
const isNote = (n: Notation): n is NoteNotation => n.type === "note";

export interface Note {
  value: number;
  offset: number;
}

const isValidSymbol = (s: string) => s === "-" || Number.isInteger(+s);

export const tabParser = (tabs: string): Notation[][] => {
  const tabLines = tabs
    .trim()
    .split("\n")
    .map((line) => List(line.split("").filter(isValidSymbol)));

  const process = (
    symbols: List<string>,
    notation: List<Notation>
  ): List<Notation> => {
    if (symbols.isEmpty()) return notation.reverse();
    const processButLast = (n: List<Notation>) => process(symbols.butLast(), n);

    if (symbols.last() === "-") {
      return processButLast(
        notation.last()?.type === "dash"
          ? notation.update(-1, (v: Notation | undefined) => ({
              type: "dash",
              value: (v?.value ?? 0) + 1,
            }))
          : notation.push({ type: "dash", value: 1 })
      );
    } else {
      if (notation.last() && isNote(notation.last())) {
        return processButLast(
          notation.update(-1, (n) => ({
            type: "note",
            value: +((symbols.last() ?? 0) + n!.value!.toString()),
          }))
        );
      } else {
        return processButLast(
          notation.push({ type: "note", value: +(symbols.last() ?? 0) })
        );
      }
    }
  };

  return tabLines.map((line) => process(line, List())).map((v) => v?.toArray());
};

export const notationToNotes = (notation: List<Notation>): Note[] => {
  const rec = (notes: List<Note>, notation: List<Notation>): List<Note> => {
    if (notation.isEmpty()) return notes;
    const n = notation.first();
    if (n && isDash(n)) {
      const note = notation.skip(1).first();
      if (!note) return notes;
      const lastNote = notes.last();
      return rec(
        notes.push({
          offset: (lastNote ? lastNote.offset + 1 : 0) + (n?.value ?? 0),
          value: note.value ?? 0,
        }),
        notation.skip(2)
      );
    } else {
      return rec(
        notes.push({
          offset: (notes.last()?.offset ?? 0) + 1,
          value: n?.value ?? 0,
        }),
        notation.skip(1)
      );
    }
  };

  return rec(List(), notation).toArray();
};
