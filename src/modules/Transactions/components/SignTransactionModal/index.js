import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import BottomModal from 'components/shared/BottomModal';

import ConfirmTransaction from '../ConfirmTransaction';
import SignTransactionSuccess from './SignTransactionSuccess';
import SignTransactionError from './SignTransactionError';

export function SignTransactionModal({
  show,
  setShow,
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
}) {
  const navigation = useNavigation();

  const [activeStep, setActiveStep] = useState('confirm');

  const [_error, _setError] = useState();

  function handleToggleShow() {
    switch (activeStep) {
      case 'confirm':
        setShow(false);
        break;

      case 'success':
        onSuccess();
        setShow(false);
        navigation.navigate('Home');
        break;

      case 'error':
        onError();
        setShow(false);
        break;

      default:
        setShow(false);
        break;
    }
  }

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
              setShow(false);
              navigation.navigate('Home');
            }}
          />
        );

      case 'error':
        return (
          <SignTransactionError
            onClick={() => {
              onError();
              setShow(false);
            }}
            error={_error}
          />
        );

      default:
        return null;
    }
  }

  return (
    <BottomModal show={show} toggleShow={handleToggleShow}>
      {renderStep()}
    </BottomModal>
  );
}
