/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';

import { useModal } from 'hooks/useModal';
import ConfirmTransaction from '../components/ConfirmTransaction';
import SignTransactionSuccess from '../components/SignTransaction/SignTransactionSuccess';
import SignTransactionError from '../components/SignTransaction/SignTransactionError';

export function useSignTransactionModal({
  isValidationError,
  dryRunError,
  amount,
  token,
  successActionButton,
  successTitle,
  successDescription,
  errorActionButton,
  errorTitle,
  errorDescription,
  form,
  navigation,
}) {
  const modal = useModal();

  const [activeStep, setActiveStep] = useState('confirm');

  const [_error, _setError] = useState();

  const error = dryRunError || form.broadcastTransactionMutation.error;
  const isSuccess = form.broadcastTransactionMutation.isSuccess;

  const onReset = () => {
    setActiveStep('confirm');
    form.handleReset();
    modal.close();
  };

  const renderStep = (step) => {
    switch (step) {
      case 'confirm':
        return (
          <ConfirmTransaction
            amount={amount}
            token={token}
            form={form}
            isLoading={
              form.dryRunTransactionMutation.isLoading ||
              form.broadcastTransactionMutation.isLoading
            }
            isValidationError={isValidationError}
          />
        );

      case 'success':
        return (
          <SignTransactionSuccess
            onSubmit={() => {
              onReset();
              navigation.navigate('AccountHome');
            }}
            actionButton={successActionButton}
            title={successTitle}
            description={successDescription}
          />
        );

      case 'error':
        return (
          <SignTransactionError
            onClick={onReset}
            error={_error}
            actionButton={errorActionButton}
            title={errorTitle}
            description={errorDescription}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      modal.open(renderStep('success'));
    }

    if (error) {
      _setError(error);
      modal.open(renderStep('error'));
    }
  }, [isSuccess, error]);

  return {
    open: () => modal.open(renderStep(activeStep)),
  };
}
