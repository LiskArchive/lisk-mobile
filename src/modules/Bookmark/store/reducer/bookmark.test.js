import actionTypes from '../actionTypes';
import { list } from './index';

describe('Bookmark reducer', () => {
  const mockBookmark = { label: 'test', address: 'lskaddress' };
  it('Should add new bookmark', async () => {
    const actionData = {
      type: actionTypes.addBookmark,
      payload: mockBookmark,
    };
    expect(list([], actionData)).toEqual([mockBookmark]);
  });

  it('Should edit bookmarked account', async () => {
    const updatedBookmark = { ...mockBookmark, label: 'updated' };
    const actionData = {
      type: actionTypes.editBookmark,
      payload: updatedBookmark,
    };
    expect(list([mockBookmark], actionData)).toEqual([updatedBookmark]);
  });
  it('Should remove bookmared account', async () => {
    const actionData = {
      type: actionTypes.deleteBookmark,
      payload: mockBookmark,
    };
    expect(list([mockBookmark], actionData)).toEqual([]);
  });
});
