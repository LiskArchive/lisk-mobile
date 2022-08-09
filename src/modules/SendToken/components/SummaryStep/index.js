import { View, Text } from 'react-native';
import React from 'react';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getSendTokenSummaryStepStyles from './styles';

export default function SendTokenSummaryStep({
  nextStep,
  prevStep
  // form
}) {
  const { styles } = useTheme({
    styles: getSendTokenSummaryStepStyles(),
  });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Text>SendTokenSummaryStep</Text>
      </View>

      <PrimaryButton
        noTheme
        onClick={() => nextStep()}
        title={'Send blabla'}
      />

      <Button
        style={{ marginTop: 16 }}
        onClick={() => prevStep()}
        title={'Back'}
      />
    </View>
  );
}
