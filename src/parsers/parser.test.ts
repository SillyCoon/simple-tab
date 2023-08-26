import { tabParser } from "./parser";
import { ParsingError } from "../notifier/notifier";
import { HammerOn, Note } from "./Notation";

describe("notation", () => {
  it("notationToNotes", () => {
    const result = tabParser(
      `${"-".repeat(5)}9-9${"-".repeat(3)}11-9h10-k7${"-".repeat(2)}`,
    );
    expect(result[0]).toEqual({
      notation: [
        Note({ value: 9, offset: 5, order: 0 }),
        Note({ value: 9, offset: 6, order: 1 }),
        Note({ value: 11, offset: 9, order: 2 }),
        Note({ value: 9, offset: 10, order: 3 }),
        HammerOn({ offset: 10, order: 4 }),
        Note({ value: 10, offset: 10, order: 5 }),
        Note({ value: 7, offset: 12, order: 6 }),
      ],
      errors: [ParsingError("Invalid symbol", "k")],
    });
  });
});
