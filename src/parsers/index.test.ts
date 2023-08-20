import { List } from 'immutable';
import { notationToNotes } from '.';

describe('notation', () => {
  it('notationToNotes', () => {
    const result = notationToNotes(
      List([
        { type: 'dash', value: 5 },
        { type: 'note', value: 9 },
        { type: 'note', value: 9 },
        { type: 'dash', value: 7 },
        { type: 'note', value: 11 },
        { type: 'note', value: 9 },
        { type: 'dash', value: 7 },
      ]),
    );

    console.log(result);

    expect(result).toEqual([
      { value: 9, offset: 5 },
      { value: 9, offset: 6 },
      { value: 11, offset: 14 },
      { value: 9, offset: 15 },
    ]);
  });
});
