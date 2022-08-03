import React from 'react';
import { View, Text } from 'react-native';

import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';

import getSendTokenApplicationsSelectStyles from './styles';

export default function SendTokenApplicationsSelect({
  nextStep,
//   navigation,
//   route,
}) {
  const { styles } = useTheme({
    styles: getSendTokenApplicationsSelectStyles(),
  });

  return (
    <View style={styles.wrapper}>
      <Text>Content here</Text>

      <View style={[styles.buttonWrapper, styles.horizontalPadding]}>
        <PrimaryButton
          noTheme={true}
          style={styles.button}
          onClick={() => nextStep()}
          title={'Continue'}
        />
      </View>
    </View>
  );
}
