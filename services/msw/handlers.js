// eslint-disable-next-line import/no-extraneous-dependencies
import * as sendTokenHandlers from 'modules/SendToken/mocks';
import * as transactionHandlers from 'modules/Transactions/mocks';
import * as generalApiHandlers from 'utilities/api/mocks';

export default [
  ...Object.values(sendTokenHandlers),
  ...Object.values(transactionHandlers),
  ...Object.values(generalApiHandlers),
];
