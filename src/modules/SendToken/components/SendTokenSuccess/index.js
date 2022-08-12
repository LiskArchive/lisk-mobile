import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import TxSuccessSvg from 'assets/svgs/TxSuccesSvg';
import TxSuccessDarkSvg from 'assets/svgs/TxSuccessDarkSvg';
import { themes } from 'constants/styleGuide';

import getSendTokenSuccessStyles from './styles';

export default function SendTokenSuccess({ onClick }) {
  const { styles, theme } = useTheme({
    styles: getSendTokenSuccessStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={styles.illustrationContainer}>
        {theme === themes.dark
          ? <TxSuccessDarkSvg style={styles.illustration}/>
          : <TxSuccessSvg style={styles.illustration}/>
        }

        <Text style={[styles.title, styles.theme.title]}>Transaction submitted</Text>

        <Text style={[styles.subtitle, styles.theme.subtitle]}>
          You will find it in your Wallet and it will be confirmed in a matter of seconds.
        </Text>
      </View>

      <PrimaryButton
        style={{ marginBottom: 24 }}
        onClick={onClick}
        title="Back to wallet"
      />
    </View>
  );
}
