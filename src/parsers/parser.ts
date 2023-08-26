import { List, is } from "immutable";
import { InvalidSymbolError, ParsingError } from "../notifier/notifier";
import { Notation, isNote } from "./Notation";
import { isSpecialSymbol } from "./SpecialSymbol";

export type ParsingResult = {
  notation: Notation[];
  errors: ParsingError[];
};

const isDash = (s: string): s is "-" => s === "-";

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
    notation: List<Notation>,
    staff: List<string>,
    errors: ParsingError[],
  ): Omit<ParsingResult, "notation"> & { notation: List<Notation> } => {
    if (staff.isEmpty()) return { notation, errors };

    const dashes = countWhileDashes(staff);
    const currentNotation = takeNotation(staff.skip(dashes));

    if (!currentNotation.size) return { notation: notation, errors };

    const prevNotation = notation.last();

    const [parsedNotation, error] = Notation(currentNotation, {
      offset: calculateOffset(dashes, prevNotation),
      order: notation.size,
    });

    return rec(
      notation.push(parsedNotation),
      staff.skip(dashes + currentNotation.size),
      error ? [...errors, error] : errors,
    );
  };

  const result = rec(List(), notation, []);
  return { errors: result.errors, notation: result.notation.toArray() };
};

const isValidSymbol = (s: string) =>
  isSpecialSymbol(s) || isDash(s) || Number.isInteger(+s);

const countWhileDashes = (notation: List<string>): number =>
  notation.takeWhile((n) => n === "-").size;

const takeNumber = (notation: List<string>): List<string> =>
  notation.takeWhile((n) => Number.isInteger(+n));

const takeSpecialSymbol = (notation: List<string>): List<string> =>
  notation.takeWhile((v) => isSpecialSymbol(v));

const takeNotation = (staff: List<string>) => {
  const maybeNumber = takeNumber(staff);
  return maybeNumber.size ? maybeNumber : takeSpecialSymbol(staff);
};

const calculateOffset = (dashes: number, maybePrev?: Notation): number => {
  const offset = maybePrev?.offset ?? 0;

  return offset + dashes;
};
