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
  onReset,
}) {
  const [activeStep, setActiveStep] = useState();

  const modal = useModal();

  const error = dryRunError || form.broadcastTransactionMutation.error;

  const isSuccess = form.broadcastTransactionMutation.isSuccess;

  const isError = !!error;

  const handleReset = () => {
    setActiveStep();
    onReset();
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
              handleReset();
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
            onClick={handleReset}
            error={error}
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
      setActiveStep('success');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setActiveStep('error');
    }
  }, [isError]);

  useEffect(() => {
    if (activeStep) {
      modal.open(renderStep(activeStep));
    }
  }, [activeStep]);

  return {
    open: () => setActiveStep('confirm'),
  };
}
