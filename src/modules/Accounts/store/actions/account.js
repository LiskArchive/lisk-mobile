/* eslint-disable max-lines */
import actionTypes from '../../actionTypes';

/**
 * Trigger this action to log out of the account
 * while already logged in
 *
 * @returns {Object} - Action object
 */
export const setCurrentAccount = (encryptedAccount) => ({
  type: actionTypes.setCurrentAccount,
  encryptedAccount,
});

export const addAccount = (encryptedAccount) => ({
  type: actionTypes.addAccount,
  encryptedAccount,
});

export const updateAccount = (address, accountData) => ({
  type: actionTypes.updateAccount,
  address,
  accountData,
});

export const deleteAccount = (address) => ({
  type: actionTypes.deleteAccount,
  address,
});
