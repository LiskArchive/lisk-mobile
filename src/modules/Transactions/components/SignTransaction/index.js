import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import ConfirmTransaction from '../ConfirmTransaction';
import SignTransactionSuccess from './SignTransactionSuccess';
import SignTransactionError from './SignTransactionError';

export function SignTransaction({
  onSuccess,
  onError,
  password,
  onPasswordChange,
  isValidationError,
  isSuccess,
  isLoading,
  error,
  onReset,
  onSubmit,
  amount,
  token,
  successActionButton,
  errorActionButton,
}) {
  const navigation = useNavigation();

  const [activeStep, setActiveStep] = useState('confirm');

  const [_error, _setError] = useState();

  function renderStep() {
    switch (activeStep) {
      case 'confirm':
        return (
          <ConfirmTransaction
            amount={amount}
            token={token}
            password={password}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
            onSuccess={() => {
              setActiveStep('success');
              if (onReset) {
                onReset();
              }
            }}
            onError={(__error) => {
              _setError(__error);
              setActiveStep('error');
              if (onReset) {
                onReset();
              }
            }}
            isLoading={isLoading}
            isSuccess={isSuccess}
            error={error}
            isValidationError={isValidationError}
          />
        );

      case 'success':
        return (
          <SignTransactionSuccess
            onClick={() => {
              onSuccess();
              navigation.navigate('Home');
            }}
            actionButton={successActionButton}
          />
        );

      case 'error':
        return (
          <SignTransactionError
            onClick={() => {
              onError();
            }}
            error={_error}
            actionButton={errorActionButton}
          />
        );

      default:
        return null;
    }
  }

  return renderStep();
}
