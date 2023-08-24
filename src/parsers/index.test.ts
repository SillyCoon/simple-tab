import { tabParser } from ".";
import { ParsingError } from "../notifier/notifier";

describe("notation", () => {
  it("notationToNotes", () => {
    const result = tabParser(
      `${"-".repeat(5)}9-9${"-".repeat(3)}11-9h-k7${"-".repeat(2)}`
    );
    expect(result[0]).toEqual({
      notes: [
        { value: 9, offset: 5, order: 0 },
        { value: 9, offset: 6, order: 1 },
        { value: 11, offset: 9, order: 2 },
        { value: 9, offset: 10, order: 3 },
        { value: 7, offset: 11, order: 4 },
      ],
      errors: [
        ParsingError("Invalid symbol", "h"),
        ParsingError("Invalid symbol", "k"),
      ],
    });
  });
});
