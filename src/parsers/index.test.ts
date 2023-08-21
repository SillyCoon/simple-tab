import { List } from "immutable";
import { notationToNotes, tabParser } from ".";

describe("notation", () => {
  it("notationToNotes", () => {
    const result = tabParser(
      `${"-".repeat(5)}9-9${"-".repeat(3)}11-9-7${"-".repeat(2)}`
    );
    console.log(result);
    expect(result[0]).toEqual([
      { value: 9, offset: 5 },
      { value: 9, offset: 6 },
      { value: 11, offset: 9 },
      { value: 9, offset: 10 },
      { value: 7, offset: 11 },
    ]);
  });
});
