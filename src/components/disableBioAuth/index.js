import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
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
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', 'Bio Auth');
    return {
      title: `Disable ${title}`,
    };
  }

  confirm = () => {
    removePassphraseFromKeyChain();
    this.props.settingsUpdated({ hasStoredPassphrase: false });
    this.props.navigation.pop();
  }

  render() {
    const { styles, navigation, account: { passphrase } } = this.props;
    const title = navigation.getParam('title', 'Bio Auth');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <View>
            <P style={[styles.subHeader, styles.theme.subHeader]}>
              Passphrase will be the only option to access your account.
            </P>
            <PassphraseCopy passphrase={passphrase} />
          </View>

          <View>
            <SecondaryButton
              onClick={this.confirm}
              title={`Disable ${title}`}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(DisableBioAuth, getStyles());
