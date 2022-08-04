import { View, Text } from 'react-native';
import React from 'react';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';

import getSendTokenSelectTokenStepStyles from './styles';

export default function SendTokenSelectTokenStep({
  nextStep,
  // form
}) {
  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Text>SendTokenSelectTokenStep</Text>
      </View>

      <PrimaryButton
        noTheme
        style={styles.button}
        onClick={() => nextStep()}
        title={'Proceed to confirmation'}
      />
    </View>
  );
}
