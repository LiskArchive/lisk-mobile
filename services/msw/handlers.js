// eslint-disable-next-line import/no-extraneous-dependencies
import * as sendTokenHandlers from '../../src/modules/SendToken/mocks/handlers';
import * as transactionHandlers from '../../src/modules/Transactions/mocks/handlers';
import * as generalApiHandlers from '../../src/utilities/api/mocks/handlers';

export default [
  ...Object.values(sendTokenHandlers),
  ...Object.values(transactionHandlers),
  ...Object.values(generalApiHandlers),
];
