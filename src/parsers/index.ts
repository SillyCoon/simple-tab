import { List } from "immutable";
import {
  InvalidSymbolError,
  LongNoteError,
  ParsingError,
} from "../notifier/notifier";

export type ParsingResult = {
  notes: Note[];
  errors: ParsingError[];
};

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
  order: number;
}

export const tabParser = (tabs: string): ParsingResult[] =>
  tabs
    .trim()
    .split("\n")
    .map((line) => List(line.split("")))
    .map((line) => {
      const [invalid, valid] = line.partition(isValidSymbol);
      const notation = parseNotation(valid);
      const invalidSymbolsErrors = invalid.map(InvalidSymbolError).toArray();

      return {
        ...notation,
        errors: [...notation.errors, ...invalidSymbolsErrors],
      };
    });

const parseNotation = (notation: List<string>): ParsingResult => {
  const rec = (
    notes: List<Note>,
    notation: List<string>,
    errors: ParsingError[]
  ): Omit<ParsingResult, "notes"> & { notes: List<Note> } => {
    if (notation.isEmpty()) return { notes, errors };

    const dashes = countWhileDashes(notation);
    const currentNote = takeNote(notation.skip(dashes));

    if (!currentNote.size) return { notes, errors };

    const prevNote = notes.last();
    const [note, error] = cutNote(
      currentNote.reduce<string>((numA, numB) => numA + numB)
    );

    return rec(
      notes.push({
        offset: (prevNote?.offset ?? 0) + dashes,
        value: +note,
        order: notes.size,
      }),
      notation.skip(dashes + currentNote.size),
      error ? [...errors, error] : errors
    );
  };

  const result = rec(List(), notation, []);
  return { errors: result.errors, notes: result.notes.toArray() };
};

const isValidSymbol = (s: string) =>
  SpecialSymbols.includes(s) || Number.isInteger(+s);

const cutNote = (note: string): [string] | [string, ParsingError] => {
  const maxNoteSize = 2;
  if (note.length > maxNoteSize) {
    return [note.slice(0, 2), LongNoteError(note)];
  }
  return [note];
};

const countWhileDashes = (notation: List<string>): number =>
  notation.takeWhile((n) => n === "-").size;

const takeNote = (notation: List<string>): List<string> =>
  notation.takeWhile((n) => n !== "-");
