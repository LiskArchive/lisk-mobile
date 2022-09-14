import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { removePassphraseFromKeyChain } from 'modules/Auth/utils';
import { PrimaryButton } from 'components/shared/toolBox/button';
import withTheme from 'components/shared/withTheme';
import PassphraseCopy from 'components/shared/passphraseCopy';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import getStyles from './styles';

@connect(
  (state) => ({
    passphrase: state.accounts.passphrase,
  }),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class DisableBioAuth extends React.Component {
  confirm = () => {
    removePassphraseFromKeyChain();
    this.props.settingsUpdated({ hasStoredPassphrase: false });
    this.props.navigation.pop();
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      title: null,
      headerLeft: (props) => (
        <HeaderBackButton
          title={this.props.route.params?.title ?? 'Bio Auth'}
          onPress={this.props.navigation.goBack}
          {...props}
        />
      ),
    });
  }

  render() {
    const { t, styles, route, passphrase } = this.props;

    const title = route.params?.title ?? 'Bio Auth';

    return (
      <View style={styles.wrapper}>
        <View style={[styles.container, styles.theme.container]}>
          <View style={styles.passphraseContainer}>
            <PassphraseCopy passphrase={passphrase} />
          </View>

          <PrimaryButton onClick={this.confirm} title={t('Disable bioAuth', { title })} />
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(DisableBioAuth), getStyles());
