import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';

import getSendTokenStyles from './styles';

export default function SendToken() {
  const { styles } = useTheme({
    styles: getSendTokenStyles(),
  });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title={'Send Token'}
        noIcon
      />
    </View>
  );
}
