import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import {
  removePassphraseFromKeyChain,
} from '../../utilities/passphrase';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { P } from '../toolBox/typography';
import { SecondaryButton } from '../toolBox/button';
import withTheme from '../withTheme';
import getStyles from './styles';
import PassphraseCopy from '../passphraseCopy';

@connect(state => ({
  account: state.accounts.active,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class DisableBioAuth extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Bio Auth'),
  })

  confirm = () => {
    removePassphraseFromKeyChain();
    this.props.settingsUpdated({ hasStoredPassphrase: false });
    this.props.navigation.pop();
  }

  render() {
    const {
      t, styles, navigation: { getParam }, account: { passphrase },
    } = this.props;
    const title = getParam('title');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <View>
            <P style={[styles.subHeader, styles.theme.subHeader]}>
              {t('Passphrase will be the only option to access your account.')}
            </P>
            <PassphraseCopy passphrase={passphrase} />
          </View>

          <View>
            <SecondaryButton
              onClick={this.confirm}
              title={t('Disable bioAuth', { title })}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(DisableBioAuth), getStyles());
