import { fromLskToBeddows } from 'utilities/conversions.utils';

export const mockTransactions = [...new Array(10)].map((_, index) => ({
  id: `transaction${index}ID`,
  moduleCommand: 'token:transfer',
  nonce: index.toString(),
  fee: '100000000',
  minFee: '181000',
  size: 182,
  sender: {
    address: 'lskguo9kqnea2zsfo3a6qppozsxsg92nuuma3p7ad',
    publicKey: '3972849f2ab66376a68671c10a00e8b8b67d880434cc65b04c6ed886dfa91c2c',
    name: 'genesis_2',
  },
  params: {
    tokenID: '0400000000000000',
    amount: fromLskToBeddows(index.toString()),
    recipientAddress: 'lsk2447tv63fubjrqpkfn7e9e3zhhwnuhzyhmvhqw',
    data: 'Test transaction',
  },
  block: {
    id: 'df65ac34bd17cc4fcca57752735f182a04cf4456e74c585b8956a60241519044',
    height: index,
    timestamp: 1672746090,
    isFinal: false,
  },
  meta: {
    recipient: {
      address: 'lsk2447tv63fubjrqpkfn7e9e3zhhwnuhzyhmvhqw',
      publicKey: null,
      name: null,
    },
  },
  executionStatus: 'success',
  index: 0,
}));
