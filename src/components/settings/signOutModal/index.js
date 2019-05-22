import React, { Fragment } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { A, Small } from '../../toolBox/typography';
import { PrimaryButton } from '../../toolBox/button';
import { removePassphraseFromKeyChain } from '../../../utilities/passphrase';
import withTheme from '../../withTheme';
import getStyles from './styles';

@connect(state => ({
  settings: state.settings,
}))
class SignOutModal extends React.Component {
  onConfirm = () => {
    removePassphraseFromKeyChain();
    this.props.modalCallback();
    this.props.close();
  }

  onCancel = () => {
    this.props.close();
  }

  render() {
    const { styles, settings, t } = this.props;

    let content = (
      <Small style={[styles.text, styles.theme.text]}>
        {t('Are you sure you want to sign out?')}
      </Small>
    );

    if (settings.hasStoredPassphrase) {
      content = (
        <Fragment>
          <Small style={[styles.text, styles.theme.text]}>
            {t('Signing out will disable bioAuth for the Lisk App.', { sensorType: settings.sensorType })}
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
          onClick={this.onConfirm}
          title={t('Confirm')}
        />

        <A
          onPress={this.onCancel}
          style={styles.theme.cancelButton}
        >
          {t('Cancel')}
        </A>
      </View>
    );
  }
}

export default withTheme(translate()(SignOutModal), getStyles());
