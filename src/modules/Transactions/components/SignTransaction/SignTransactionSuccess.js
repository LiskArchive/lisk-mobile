import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { H3, P } from 'components/shared/toolBox/typography';
import TxSuccessSvg from 'assets/svgs/TxSuccesSvg';
import TxSuccessDarkSvg from 'assets/svgs/TxSuccessDarkSvg';
import { themes } from 'constants/styleGuide';

import { getSignTransactionSuccessStyles } from './styles';

export default function SignTransactionSuccess({
  onSubmit,
  title,
  description,
  actionButton,
  secondaryButton,
}) {
  const { styles, theme } = useTheme({
    styles: getSignTransactionSuccessStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]} testID="sign-transaction-success">
      <View style={styles.illustrationContainer}>
        {theme === themes.dark ? (
          <TxSuccessDarkSvg style={styles.illustration} />
        ) : (
          <TxSuccessSvg style={styles.illustration} />
        )}

        <H3 style={[styles.title, styles.theme.title]}>
          {title || i18next.t('sendToken.result.success.title')}
        </H3>

        <P style={[styles.description, styles.theme.description]}>
          {description || i18next.t('sendToken.result.success.description')}
        </P>
      </View>

      {actionButton || (
        <PrimaryButton
          onClick={onSubmit}
          title={i18next.t('sendToken.result.success.closeButtonText')}
        />
      )}

      {secondaryButton}
    </View>
  );
}
