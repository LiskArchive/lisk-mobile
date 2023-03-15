import React, { useEffect, useState } from 'react';

import ConfirmTransaction from '../ConfirmTransaction';
import SignTransactionError from './SignTransactionError';
import SignTransactionSuccess from './SignTransactionSuccess';

export default function SignTransaction({
  isValidationError,
  amount,
  token,
  successActionButton,
  successTitle,
  successDescription,
  errorActionButton,
  errorTitle,
  errorDescription,
  onReset,
  error,
  isSuccess,
  isLoading,
  userPassword,
  onUserPasswordChange,
  onSubmit,
  navigation,
}) {
  const [activeStep, setActiveStep] = useState('confirm');

  const isError = !!error;

  const handleReset = () => {
    setActiveStep();
    onReset();
  };

  const handleSuccessSubmit = () => {
    handleReset();
    navigation.navigate('AccountHome');
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

  switch (activeStep) {
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
}
