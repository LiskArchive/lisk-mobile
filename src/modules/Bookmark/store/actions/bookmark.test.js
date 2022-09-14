import actionTypes from '../actionTypes';
import { addBookmark, editBookmark, deleteBookmark } from './index';

describe('actions: bookmark actions', () => {
  const mockBookmark = { label: 'test', address: 'lskaddress' };
  it('should create an action to add a bookmark', () => {
    const expectedAction = {
      type: actionTypes.addBookmark,
      payload: mockBookmark,
    };

    expect(addBookmark(mockBookmark)).toEqual(expectedAction);
  });

  it('should create an action to edit bookmarked address', () => {
    const expectedAction = {
      type: actionTypes.editBookmark,
      payload: mockBookmark,
    };

    expect(editBookmark(mockBookmark)).toEqual(expectedAction);
  });

  it('should create an action to delete bookmarked address', () => {
    const expectedAction = {
      type: actionTypes.deleteBookmark,
      payload: mockBookmark,
    };

    expect(deleteBookmark(mockBookmark)).toEqual(expectedAction);
  });
});
