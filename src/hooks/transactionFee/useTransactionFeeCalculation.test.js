import { renderHook } from '@testing-library/react-hooks';
import * as transactionConstants from '../../constants/transactions';
import useTransactionFeeCalculation from './useTransactionFeeCalculation';

describe('useTransactionFeeCalculation', () => {
  const props = {
    selectedPriority: transactionConstants.DEFAULT_PRIORITY[0],
    token: 'LSK',
    account: {
      balance: '18997997000'
    },
    priorityOptions: transactionConstants.DEFAULT_PRIORITY,
    transaction: {
      recipientAddress: 'lskdxc4ta5j43jp9ro3f8zqbxta9fn6jwzjucw7yt',
      moduleAssetId: transactionConstants.moduleAssetNameIdMap.transfer,
      amount: 0,
      nonce: 1,
      senderPublicKey: Buffer.alloc(32),
      data: ''
    },
    selectedPriorityIndex: 0
  };

  it('should return calculated fees', async () => {
    const { result, waitForValueToChange } = renderHook(() =>
      useTransactionFeeCalculation({ ...props }));

    await waitForValueToChange(() => result.current.maxAmount.value);
    expect(Number(result.current.fee.value)).toEqual(0.00138);
    expect(Number(result.current.minFee.value)).toEqual(0.00138);
    expect(Number(result.current.maxAmount.value)).toEqual(18992855000);
    expect(Number(result.current.maxAmount.value)).toBeLessThan(18997997000);
  });
});
