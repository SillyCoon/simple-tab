export interface ParsingError<T extends string = string> {
  message: T;
  value: string;
  type: "error" | "warning";
}

export const ParsingError = <T extends string = string>(
  message: T,
  value: string
): ParsingError<T> => {
  return {
    message,
    value,
    type: "error" as const,
  };
};

export const ParsingWarning = (
  message: string,
  value: string
): ParsingError => {
  return {
    message,
    value,
    type: "warning" as const,
  };
};

const invalidSymbolMsg = "Invalid symbol" as const;
export type InvalidSymbolError = ParsingError<typeof invalidSymbolMsg>;

const longNoteMsg = "Note is too long" as const;
export type LongNoteError = ParsingError<typeof longNoteMsg>;

export const InvalidSymbolError = (symbol: string): InvalidSymbolError =>
  ParsingError(invalidSymbolMsg, symbol);

export const LongNoteError = (note: string): LongNoteError =>
  ParsingError(longNoteMsg, note);
