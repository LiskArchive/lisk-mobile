import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import {
  removePassphraseFromKeyChain,
} from '../../utilities/passphrase';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { H1, P } from '../toolBox/typography';
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
  confirm = () => {
    removePassphraseFromKeyChain();
    this.props.settingsUpdated({ hasStoredPassphrase: false });
    this.props.navigation.pop();
  }

  render() {
    const { styles, account: { passphrase } } = this.props;
    const title = this.props.navigation.getParam('title', null);

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <View>
            <View>
              <H1 style={[styles.header, styles.theme.header]}>
                {`You're about to disable ${title}`}
              </H1>
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                Passphrase will be the only option to access your account.
              </P>
            </View>
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
