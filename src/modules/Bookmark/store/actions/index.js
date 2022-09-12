import actionTypes from '../actionTypes';

export const addBookmark = (bookmark) => ({
  type: actionTypes.addBookmark,
  payload: bookmark,
});

export const editBookmark = (bookmark) => ({
  type: actionTypes.editBookmark,
  payload: bookmark,
});

export const deleteBookmark = (bookmark) => ({
  type: actionTypes.deleteBookmark,
  payload: bookmark,
});
