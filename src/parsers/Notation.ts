import { List } from "immutable";
import { LongNoteError, ParsingError } from "../notifier/notifier";
import { isSpecialSymbol } from "./SpecialSymbol";

type Typeless<T extends { type: unknown }> = Omit<T, "type">;
type WithError<T> = [T, ParsingError?];

const notationTypes = ["note", "hammer"] as const;
export interface Notation {
  type: (typeof notationTypes)[number];
  order: number;
  offset: number;
}

export const Notation = (
  charsRepresentation: List<string>,
  meta: Typeless<Notation>,
): WithError<Notation> => {
  const SpecialSymbol = (_str: string, meta: Typeless<Notation>) =>
    HammerOn(meta);

  const str = charsRepresentation.join("");
  if (isSpecialSymbol(str)) return [SpecialSymbol(str, meta)];

  const [note, error] = cutNote(str);
  return [Note({ ...meta, value: note }), error];
};

export interface Note extends Notation {
  type: "note";
  value: number;
}
export const Note = (noteWithoutType: Typeless<Note>): Note => ({
  ...noteWithoutType,
  type: "note",
});
export const isNote = (n: Notation): n is Note => n.type === "note";

export interface HammerOn extends Notation {
  type: "hammer";
}
export const HammerOn = (hammer: Typeless<HammerOn>): HammerOn => ({
  ...hammer,
  type: "hammer",
});
export const isHammerOn = (n: Notation): n is HammerOn => n.type === "hammer";

const cutNote = (note: string): [number] | [number, ParsingError] => {
  const maxNoteSize = 2;
  if (note.length > maxNoteSize) {
    return [+note.slice(0, 2), LongNoteError(note)];
  }
  return [+note];
};
