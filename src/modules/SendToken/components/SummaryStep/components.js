import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import BottomModal from 'components/shared/BottomModal';

import ConfirmAndSignTransaction from '../ConfirmAndSignTransaction';
import SendTokenSuccess from '../SendTokenSuccess';
import SendTokenError from '../SendTokenError';

export function SendTokenSummaryModal({
  show,
  setShow,
  summary,
  form,
  handleResetForm,
  handleResetStepper,
}) {
  const navigation = useNavigation();

  const [activeStep, setActiveStep] = useState('confirmAndSignTransaction');
  const [error, setError] = useState();
  function handleOnProcessCompleted() {
    switch (activeStep) {
      case 'confirmAndSignTransaction':
        setShow(false);
        break;

      case 'sendTokenSuccess':
        handleResetForm();
        setShow(false);
        navigation.navigate('Home');
        break;

      case 'sendTokenError':
      default:
        break;
    }
  }

  function renderStep() {
    switch (activeStep) {
      case 'confirmAndSignTransaction':
        return (
          <ConfirmAndSignTransaction
            amount={summary.amount}
            token={summary.token}
            form={form}
            onSuccess={() => setActiveStep('sendTokenSuccess')}
            onError={(_error) => {
              setError(_error);
              setActiveStep('sendTokenError');
            }}
          />
        );

      case 'sendTokenSuccess':
        return (
          <SendTokenSuccess
            onClick={() => {
              handleResetForm();
              handleResetStepper();
              setShow(false);
              navigation.navigate('Home');
            }}
          />
        );

      case 'sendTokenError':
        return (
          <SendTokenError
            onClick={() => {
              handleResetStepper();
              setShow(false);
            }}
            error={error}
          />
        );

      default:
        return null;
    }
  }

  return (
    <BottomModal isOpen={show} toggleShow={handleOnProcessCompleted}>
      {renderStep()}
    </BottomModal>
  );
}
