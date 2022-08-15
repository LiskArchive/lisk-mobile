/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import ModalBox from 'react-native-modalbox';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import Icon from 'components/shared/toolBox/icon';

import getSendTokenSummaryStepStyles from './styles';
import ConfirmAndSignTransaction from '../ConfirmAndSignTransaction';
import SendTokenSuccess from '../SendTokenSuccess';
import SendTokenError from '../SendTokenError';

export function SendTokenSummaryModal({
  show,
  setShow,
  summary,
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
    <ModalBox
      position="bottom"
      style={[
        styles.confirmAndSignTransactionModal,
        styles.theme.confirmAndSignTransactionModal
      ]}
      isOpen={show}
      onClosed={handleOnProcessCompleted}
      coverScreen
      useNativeDriver
      >
      <View style={styles.iconWrapper}>
        <Icon
          onPress={() => setShow(false)}
          name="cross"
          color={colors.light.ultramarineBlue}
          size={24}
        />
      </View>

      {renderStep()}
    </ModalBox>
  );
}
