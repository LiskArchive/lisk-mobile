import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { Small, A } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const Initialization = ({
  t, close, modalCallback, styles
}) => {
  const initializeAccount = () => {
    close();
    modalCallback();
  };

  return (
    <View style={styles.container}>
      <Small style={[styles.text, styles.theme.text]}>
        {t(
          'Make sure to initialize your account with an outgoing transaction, to improve even further the security of your account'
        )}
      </Small>
      <PrimaryButton
        style={styles.actionButton}
        onClick={initializeAccount}
        title={t('Initialize your account')}
      />
      <A onPress={close} style={styles.secondaryButton}>
        {t('Remind me later')}
      </A>
    </View>
  );
};

export const InitializationModal = withTheme(translate()(Initialization), getStyles());
