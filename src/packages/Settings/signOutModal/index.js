import React, { Fragment } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { A, Small } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { removePassphraseFromKeyChain } from 'utilities/passphrase';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const SignOutModal = ({
  styles, settings, t, modalCallback, close
}) => {
  const onConfirm = () => {
    removePassphraseFromKeyChain();
    modalCallback();
    close();
  };

  let content = (
    <Small style={[styles.text, styles.theme.text]}>
      {t('Are you sure you want to sign out?')}
    </Small>
  );

  if (settings.hasStoredPassphrase) {
    content = (
      <Fragment>
        <Small style={[styles.text, styles.theme.text]}>
          {t('Signing out will disable bioAuth for the Lisk App.', {
            sensorType: settings.sensorType,
          })}
        </Small>

        <Small style={[styles.text, styles.theme.text]}>
          {t('You can enable it after singing back in with your passphrase.')}
        </Small>
      </Fragment>
    );
  }

  return (
    <View style={styles.container}>
      {content}

      <PrimaryButton
        style={styles.actionButton}
        onClick={onConfirm}
        title={t('Confirm')}
      />

      <A onPress={close} style={styles.theme.cancelButton}>
        {t('Cancel')}
      </A>
    </View>
  );
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default withTheme(translate()(connect(mapStateToProps)(SignOutModal)), getStyles());
