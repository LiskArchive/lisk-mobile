import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import BottomModal from 'components/shared/BottomModal';

import ConfirmAndSignTransaction from '../ConfirmAndSignTransaction';
import SendTokenSuccess from '../SendTokenSuccess';
import SendTokenError from '../SendTokenError';
import getSendTokenSummaryStepStyles from './styles';

export function SendTokenSummaryModal({
  show,
  setShow,
  summary,
  form,
  handleResetForm,
  handleResetStepper
}) {
  const navigation = useNavigation();

  const [activeStep, setActiveStep] = useState('confirmAndSignTransaction');

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

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
            onError={() => setActiveStep('sendTokenError')}
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
          />
        );

      default:
        return null;
    }
  }

  return (
    <BottomModal
      style={{
        container: [
          styles.confirmAndSignTransactionModal,
          styles.theme.confirmAndSignTransactionModal
        ]
      }}
      isOpen={show}
      onClosed={handleOnProcessCompleted}
      >
      {renderStep()}
    </BottomModal>
  );
}
