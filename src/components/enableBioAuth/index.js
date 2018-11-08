import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  storePassphraseInKeyChain,
} from '../../utilities/passphrase';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { H1, B, Small } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { SecondaryButton } from '../toolBox/button';
import colors from '../../constants/styleGuide/colors';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  account: state.accounts.active,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class EnableBioAuth extends React.Component {
  confirm = () => {
    storePassphraseInKeyChain(this.props.account.passphrase);
    this.props.settingsUpdated({ hasStoredPassphrase: true });
    this.props.navigation.pop();
  }

  render() {
    const { styles } = this.props;
    const title = this.props.navigation.getParam('title', null);

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <H1 style={styles.header}>Enabling {title}</H1>
            <B style={styles.subHeader}>Here’s what you need to know:</B>
            <View style={[styles.row, styles.separator]}>
              <Icon name='passphrase' style={styles.icon} color={colors.light.blue} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>Your passphrase is still needed</B>
                <Small style={styles.description}>
                  You always need to keep your passphrase safe.
                  It will still be required for some actions.
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator]}>
              <Icon name='address' style={styles.icon} color={colors.light.gray1} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>You can always turn it off</B>
                <Small style={styles.description}>
                  You can disable Face ID at anytime in Settings page.
                  then authenticate with passphrase.
                </Small>
              </View>
            </View>
            <View style={[styles.row]}>
              <Icon name='avatar' style={styles.icon} color={colors.light.yellow} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>It’s fast and secure</B>
                <Small style={styles.description}>
                  The Avatar represents the address, making it easy to recognize.
                </Small>
              </View>
            </View>
          </View>
          <SecondaryButton
            style={styles.button}
            onClick={this.confirm}
            title='Enable' />
        </View>
      </View>);
  }
}

export default withTheme(EnableBioAuth, getStyles());
