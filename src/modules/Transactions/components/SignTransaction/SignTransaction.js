import React, { useEffect, useState } from 'react';

import ConfirmTransaction from '../ConfirmTransaction';
import SignTransactionError from './SignTransactionError';
import SignTransactionSuccess from './SignTransactionSuccess';

export default function SignTransaction({
  isValidationError,
  submitButtonTitle,
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
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
          onSubmit={onSubmit}
          userPassword={userPassword}
          onUserPasswordChange={onUserPasswordChange}
          isLoading={isLoading}
          isValidationError={isValidationError}
          submitButtonTitle={submitButtonTitle}
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
