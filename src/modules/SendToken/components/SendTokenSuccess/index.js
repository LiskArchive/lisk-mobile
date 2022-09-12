import React from 'react';
import { View, Text } from 'react-native';
import i18next from 'i18next';

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
        {theme === themes.dark ? (
          <TxSuccessDarkSvg style={styles.illustration} />
        ) : (
          <TxSuccessSvg style={styles.illustration} />
        )}

        <Text style={[styles.title, styles.theme.title]}>
          {i18next.t('sendToken.result.success.title')}
        </Text>

        <Text style={[styles.description, styles.theme.description]}>
          {i18next.t('sendToken.result.success.description')}
        </Text>
      </View>

      <PrimaryButton
        style={{ marginBottom: 24 }}
        onClick={onClick}
        title={i18next.t('sendToken.result.success.closeButtonText')}
      />
    </View>
  );
}
