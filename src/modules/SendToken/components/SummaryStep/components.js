/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import ModalBox from 'react-native-modalbox';

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
  navigation
}) {
  const [activeStep, setActiveStep] = useState('confirmAndSignTransaction');

  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  function renderStep() {
    switch (activeStep) {
      case 'confirmAndSignTransaction':
        return (
          <ConfirmAndSignTransaction
            amount={summary.amount}
            token={summary.token}
            onSuccess={() => {
              setActiveStep('sendTokenSuccess');
              console.log('on success...');
            }}
            onError={() => {
              setActiveStep('sendTokenError');
              console.log('on error...');
            }}
        />
        );

      case 'sendTokenSuccess':
        return <SendTokenSuccess navigation={navigation}/>;

      case 'sendTokenError':
        return <SendTokenError navigation={navigation}/>;

      default:
        return null;
    }
  }

  return (
    <ModalBox
      position="bottom"
      style={[styles.confirmAndSignTransactionModal]}
      isOpen={show}
      onClosed={() => setShow(false)}
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
