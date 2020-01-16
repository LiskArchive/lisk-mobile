import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { removePassphraseFromKeyChain } from '../../../utilities/passphrase';
import { settingsUpdated as settingsUpdatedAction } from '../../../actions/settings';
import { PrimaryButton } from '../../shared/toolBox/button';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import PassphraseCopy from '../../shared/passphraseCopy';

@connect(
  state => ({
    passphrase: state.accounts.passphrase,
  }),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class DisableBioAuth extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Bio Auth'),
  });

  confirm = () => {
    removePassphraseFromKeyChain();
    this.props.settingsUpdated({ hasStoredPassphrase: false });
    this.props.navigation.pop();
  };

  render() {
    const { t, styles, navigation, passphrase } = this.props;

    const title = navigation.getParam('title', 'Bio Auth');

    return (
      <View style={styles.wrapper}>
        <View style={[styles.container, styles.theme.container]}>
          <View style={styles.passphraseContainer}>
            <PassphraseCopy passphrase={passphrase} />
          </View>

          <PrimaryButton
            onClick={this.confirm}
            title={t('Disable bioAuth', { title })}
          />
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(DisableBioAuth), getStyles());
