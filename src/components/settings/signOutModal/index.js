import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { NavigationActions } from 'react-navigation';
import { A, P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import { accountSignedOut as accountSignedOutAction } from '../../../actions/accounts';
import { removePassphraseFromKeyChain } from '../../../utilities/passphrase';

@connect(state => ({
  settings: state.settings,
}), {
  accountSignedOut: accountSignedOutAction,
})
class SignOutModal extends React.Component {
  onConfirm = () => {
    removePassphraseFromKeyChain();
    this.props.accountSignedOut();
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home', params: { signOut: true } }),
      ],
    }));
  }

  onCancel = () => {
    this.props.close();
  }

  render() {
    const { settings, t } = this.props;

    return (
      <View>
        <P>{t('Are you sure?')}</P>

        {settings.hasStoredPassphrase && (
          <P>
            {t(`You can sign back in using your passphrase and enable ${settings.sensorType} at any time.`)}
          </P>
        )}

        <A onPress={this.onCancel}>
          {t('Cancel')}
        </A>

        <SecondaryButton
          onClick={this.onConfirm}
          title={t('Confirm')}
        />
      </View>
    );
  }
}

export default translate()(SignOutModal);
