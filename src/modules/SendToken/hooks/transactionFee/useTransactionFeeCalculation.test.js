import { renderHook } from '@testing-library/react-hooks';
import * as transactionConstants from 'modules/Transactions/constants';
import { fromRawLsk, toRawLsk } from 'utilities/conversions';
import { useTransactionFeeCalculation } from './useTransactionFeeCalculation';

describe.skip('useTransactionFeeCalculation', () => {
  const props = {
    selectedPriority: transactionConstants.DEFAULT_PRIORITY[0],
    token: 'LSK',
    account: {
      balance: '18997997000'
    },
    priorityOptions: transactionConstants.DEFAULT_PRIORITY,
    transaction: {
      recipientAddress: 'lskdxc4ta5j43jp9ro3f8zqbxta9fn6jwzjucw7yt',
      moduleAssetId: transactionConstants.moduleCommandNameIdMap.transfer,
      amount: 0,
      nonce: 1,
      senderPublicKey: Buffer.alloc(32),
      data: ''
    },
    selectedPriorityIndex: 0
  };

  it('should return calculated fees', async () => {
    const { result } = renderHook(() =>
      useTransactionFeeCalculation({ ...props }));

    expect(Number(result.current.fee.value)).toEqual(0.00138);
    expect(Number(result.current.minFee.value)).toEqual(0.00138);
    expect(Number(result.current.maxAmount.value)).toEqual(18992855000);
    expect(Number(result.current.maxAmount.value)).toBeLessThan(18997997000);
  });

  it('should have minimum balance of 0.05LSK when a user sends maximum balance', async () => {
    const firstRender = renderHook(() =>
      useTransactionFeeCalculation({ ...props }));

    const { result } = renderHook(() =>
      useTransactionFeeCalculation({
        ...props,
        transaction: {
          ...props.transaction,
          amount: fromRawLsk(firstRender.result.current.maxAmount.value),
        },
      }));

    const balance = Number(props.account.balance)
      - result.current.maxAmount.value
      - toRawLsk(result.current.fee.value);

    expect(
      balance
    ).toEqual(transactionConstants.DEFAULT_MIN_REMAINING_BALANCE);
  });

  it('should return 0 for maximum balance if user balance is 0.05LSK', async () => {
    const updatedProps = {
      ...props,
      account: {
        balance: transactionConstants.DEFAULT_MIN_REMAINING_BALANCE
      }
    };

    const { result } = renderHook(() =>
      useTransactionFeeCalculation({ ...updatedProps }));

    expect(Number(result.current.maxAmount.value)).toEqual(0);
  });
});
