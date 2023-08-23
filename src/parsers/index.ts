import { List } from "immutable";

export interface Notation {
  type: "dash" | "note" | "hammer";
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

interface HammerOnNotation extends Notation {
  type: "hammer";
}

const isDash = (n: Notation): n is DashNotation => n.type === "dash";
const isNote = (n: Notation): n is NoteNotation => n.type === "note";
const isHammerOn = (n: Notation): n is HammerOnNotation => n.type === "hammer";

const SpecialSymbols = ["-"];

export interface Note {
  value: number;
  offset: number;
}

const isValidSymbol = (s: string) =>
  SpecialSymbols.includes(s) || Number.isInteger(+s);

export const tabParser = (tabs: string): Note[][] =>
  tabs
    .trim()
    .split("\n")
    .map((line) => List(line.split("").filter(isValidSymbol)))
    .map(notationToNotes);

const cutNote = (note: string) => {
  const maxNoteSize = 2;
  if (note.length > maxNoteSize) {
    return note.slice(0, 2);
  }
  return note;
};

export const notationToNotes = (notation: List<string>): Note[] => {
  const rec = (notes: List<Note>, notation: List<string>): List<Note> => {
    if (notation.isEmpty()) return notes;

    const dashes = countWhileDashes(notation);
    const currentNote = takeNote(notation.skip(dashes));

    if (!currentNote.size) return notes;

    const prevNote = notes.last();
    return rec(
      notes.push({
        offset: (prevNote?.offset ?? 0) + dashes,
        value: +cutNote(
          currentNote.reduce<string>((numA, numB) => numA + numB)
        ),
      }),
      notation.skip(dashes + currentNote.size)
    );
  };

  return rec(List(), notation).toArray();
};

const countWhileDashes = (notation: List<string>): number =>
  notation.takeWhile((n) => n === "-").size;

const takeNote = (notation: List<string>): List<string> =>
  notation.takeWhile((n) => n !== "-");
