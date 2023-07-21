/* eslint-disable max-statements */
import { useEffect } from 'react';
import * as Lisk from '@liskhq/lisk-client';

import { useCommandParametersSchemasQuery } from 'modules/Network/api/useCommandParametersSchemasQuery';
import useTransactionEstimateFeesMutation from '../api/useTransactionEstimateFeesMutation';

export function useTransactionFees({
  transaction,
  isTransactionSuccess,
  dependencies = [],
  onSuccess,
  onError,
  enabled,
}) {
  const {
    data: commandParametersSchemasData,
    isLoading: isLoadingCommandParametersSchemas,
    isErrorCommandParametersSchemas,
  } = useCommandParametersSchemasQuery({
    options: { enabled: isTransactionSuccess, onError },
  });

  const estimateFeesMutation = useTransactionEstimateFeesMutation({
    onSuccess: (res) => {
      let updates = {};

      const accountInitializationFee =
        res.meta.breakdown.fee.minimum.additionalFees?.userAccountInitializationFee ||
        res.meta.breakdown.params.messageFee.additionalFees?.userAccountInitializationFee;

      const messageFee = res.data.transaction.params?.messageFee.amount;
      const messageFeeTokenID = res.data.transaction.params?.messageFee.tokenID;

      const minFee = res.data.transaction.fee.minimum;

      const dynamicFeeEstimates = res.data.transaction.fee.priority;

      if (accountInitializationFee) {
        updates = {
          extraCommandFee: accountInitializationFee,
        };
      }

      if (messageFee && messageFeeTokenID) {
        updates = {
          ...updates,
          params: {
            messageFee,
            messageFeeTokenID,
          },
        };
      }

      if (minFee) {
        updates = { ...updates, minFee };
      }

      if (dynamicFeeEstimates) {
        updates = { ...updates, dynamicFeeEstimates };
      }

      transaction.update(updates);

      if (onSuccess) {
        onSuccess(res);
      }
    },
    onError,
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

  console.log({ areParamsValid });

  useEffect(() => {
    if (isTransactionSuccess && areParamsValid && enabled) {
      // eslint-disable-next-line no-unused-vars
      const { signatures, ...transactionJSON } = transaction.toJSON();

      estimateFeesMutation.mutate({
        transaction: transactionJSON,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransactionSuccess, areParamsValid, enabled, ...dependencies]);

  return {
    data: estimateFeesMutation.data,
    isLoading: isLoadingCommandParametersSchemas || estimateFeesMutation.isLoading,
    isError: isErrorCommandParametersSchemas || estimateFeesMutation.isError,
  };
}
