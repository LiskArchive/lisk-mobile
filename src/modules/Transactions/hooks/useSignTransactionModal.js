/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';

import { useModal } from 'hooks/useModal';
import ConfirmTransaction from '../components/ConfirmTransaction';
import SignTransactionSuccess from '../components/SignTransaction/SignTransactionSuccess';
import SignTransactionError from '../components/SignTransaction/SignTransactionError';

export function useSignTransactionModal({
  isValidationError,
  amount,
  token,
  successActionButton,
  successTitle,
  successDescription,
  errorActionButton,
  errorTitle,
  errorDescription,
  navigation,
  onReset,
  error,
  isSuccess,
  isLoading,
  userPassword,
  onUserPasswordChange,
  onSubmit,
}) {
  const [activeStep, setActiveStep] = useState();

  const modal = useModal();

  const isError = !!error;

  const handleReset = () => {
    setActiveStep();
    onReset();
    modal.close();
  };

  const handleSuccessSubmit = () => {
    handleReset();
    navigation.navigate('AccountHome');
  };

  const renderStep = (step) => {
    switch (step) {
      case 'confirm':
        return (
          <ConfirmTransaction
            amount={amount}
            token={token}
            isLoading={isLoading}
            isValidationError={isValidationError}
            userPassword={userPassword}
            onUserPasswordChange={onUserPasswordChange}
            onSubmit={onSubmit}
          />
        );

      case 'success':
        return (
          <SignTransactionSuccess
            onSubmit={handleSuccessSubmit}
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
