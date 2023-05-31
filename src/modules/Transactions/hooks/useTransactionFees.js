import { useEffect } from 'react';
import * as Lisk from '@liskhq/lisk-client';

import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';
import useTransactionEstimateFeesMutation from '../api/useTransactionEstimateFeesMutation';

export function useTransactionFees({ transaction, isTransactionSuccess, dependencies = [] }) {
  const { data: commandParametersSchemasData } = useCommandParametersSchemasQuery({
    options: { enabled: isTransactionSuccess },
  });

  const estimateFeesMutation = useTransactionEstimateFeesMutation({
    onSuccess: (data) => {
      let updates = {};

      if (data.transactionFeeEstimates.accountInitializationFee) {
        updates = {
          extraCommandFee: data.transactionFeeEstimates.accountInitializationFee.amount,
        };
      }

      if (data.transactionFeeEstimates.messageFee) {
        updates = {
          params: {
            messageFee: data.transactionFeeEstimates.messageFee.amount,
            messageFeeTokenID: data.transactionFeeEstimates.messageFee.tokenID,
          },
        };
      }

      if (data.transactionFeeEstimates.minFee) {
        updates = { ...updates, minFee: data.transactionFeeEstimates.minFee };
      }

      if (data.dynamicFeeEstimates) {
        updates = { ...updates, dynamicFeeEstimates: data.dynamicFeeEstimates };
      }

      transaction.update(updates);
    },
    onError: (error) => {
      console.log('mutationError', error);
    },
  });

  const transactionSchema = commandParametersSchemasData?.data?.commands.find(
    (command) =>
      command.moduleCommand ===
      `${transaction.transaction.module}:${transaction.transaction.command}`
  )?.schema;

  const validateParams = () => {
    if (!transactionSchema) {
      return false;
    }

    try {
      Lisk.validator.validator.validate(transactionSchema, transaction.transaction.params);

      return true;
    } catch {
      return false;
    }
  };

  const areParamsValid = validateParams();

  //   console.log({ areParamsValid, isTransactionSuccess });

  useEffect(() => {
    if (isTransactionSuccess && areParamsValid) {
      // eslint-disable-next-line no-unused-vars
      const { signatures, ...transactionJSON } = transaction.toJSON();

      estimateFeesMutation.mutate({
        transaction: transactionJSON,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransactionSuccess, areParamsValid, ...dependencies]);
}
