import { List } from "immutable";
import { notationToNotes } from ".";

describe("", () => {
  it("", () => {});
});

console.log(
  notationToNotes(
    List([
      { type: "dash", value: 5 },
      { type: "note", value: 9 },
      { type: "note", value: 9 },
      { type: "dash", value: 7 },
      { type: "note", value: 11 },
      { type: "note", value: 9 },
      { type: "dash", value: 7 },
    ])
  )
);
