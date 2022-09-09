import * as sendTokenHandlers from 'modules/SendToken/mocks'
import * as transactionHandlers from 'modules/Transactions/mocks'
import * as blockchainAppsHandler from 'modules/BlockchainApplication/mocks'
import * as networkHandlers from 'modules/Network/mocks'
import * as generalApiHandlers from 'utilities/api/mocks'

export default [
  ...Object.values(sendTokenHandlers),
  ...Object.values(transactionHandlers),
  ...Object.values(generalApiHandlers),
  ...Object.values(blockchainAppsHandler),
  ...Object.values(networkHandlers),
]
