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

const notationTypes = ["note", "hammer"] as const;

export interface Notation {
  type: (typeof notationTypes)[number];
  offset: number;
}

export interface Note extends Notation {
  type: "note";
  value: number;
  order: number;
}

type Typeless<T extends { type: unknown }> = Omit<T, "type">;

export const Note = (noteWithoutType: Typeless<Note>): Note => ({
  ...noteWithoutType,
  type: "note",
});

export const HammerOn = (hammer: Typeless<HammerOn>): HammerOn => ({
  ...hammer,
  type: "hammer",
});

export interface HammerOn extends Notation {
  type: "hammer";
}

export const isNote = (n: Notation): n is Note => n.type === "note";
export const isHammerOn = (n: Notation): n is HammerOn => n.type === "hammer";

const isSpecialSymbol = (s: string): s is (typeof specialSymbols)[number] =>
  specialSymbols.includes(s as (typeof specialSymbols)[number]);

const isDash = (s: string): s is "-" => s === "-";

const specialSymbols = [] as const;

const splitStringIntoListLines = (str: string) =>
  str
    .trim()
    .split("\n")
    .map((line) => List(line.split("")));

export const tabParser = (tabs: string): ParsingResult[] =>
  splitStringIntoListLines(tabs).map((line) => {
    const invalid = line.filterNot((s) => isValidSymbol(s));
    const valid = line.map((s) => (isValidSymbol(s) ? s : "-"));

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
    errors: ParsingError[],
  ): Omit<ParsingResult, "notes"> & { notes: List<Note> } => {
    if (notation.isEmpty()) return { notes, errors };

    const dashes = countWhileDashes(notation);
    const currentNote = takeNumber(notation.skip(dashes));

    if (!currentNote.size) return { notes, errors };

    const prevNote = notes.last();
    const [note, error] = cutNote(
      currentNote.reduce<string>((numA, numB) => numA + numB),
    );

    return rec(
      notes.push(
        Note({
          offset: (prevNote?.offset ?? 0) + dashes,
          value: +note,
          order: notes.size,
        }),
      ),
      notation.skip(dashes + currentNote.size),
      error ? [...errors, error] : errors,
    );
  };

  const result = rec(List(), notation, []);
  return { errors: result.errors, notes: result.notes.toArray() };
};

const isValidSymbol = (s: string) =>
  isSpecialSymbol(s) || isDash(s) || Number.isInteger(+s);

const cutNote = (note: string): [string] | [string, ParsingError] => {
  const maxNoteSize = 2;
  if (note.length > maxNoteSize) {
    return [note.slice(0, 2), LongNoteError(note)];
  }
  return [note];
};

const countWhileDashes = (notation: List<string>): number =>
  notation.takeWhile((n) => n === "-").size;

const takeNumber = (notation: List<string>): List<string> =>
  notation.takeWhile((n) => n !== "-");

const takeSpecialSymbol = (notation: List<string>): List<string> =>
  notation.takeWhile((v) => isSpecialSymbol(v));
