import * as sendTokenHandlers from 'modules/SendToken/mocks';
import * as transactionHandlers from 'modules/Transactions/mocks';
import * as applicationsHandlers from 'modules/BlockchainApplication/mocks';
import * as networkHandlers from 'modules/Network/mocks';
import * as generalApiHandlers from 'utilities/api/mocks';

export const mswHandlers = {
  ...sendTokenHandlers,
  ...transactionHandlers,
  ...generalApiHandlers,
  ...applicationsHandlers,
  ...networkHandlers,
};
