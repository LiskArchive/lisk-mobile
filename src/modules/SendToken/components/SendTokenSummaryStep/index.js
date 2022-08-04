import { View, Text } from 'react-native';
import React from 'react';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';

import getSendTokenSummaryStepStyles from './styles';

export default function SendTokenSummaryStep({
  nextStep,
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
          style={styles.button}
          onClick={() => nextStep()}
          title={'Send blabla'}
        />
      </View>
  );
}
