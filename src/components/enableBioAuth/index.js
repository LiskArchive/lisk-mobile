import React from 'react';
import { View, Platform } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  storePassphraseInKeyChain,
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import styles from './styles';
import { H1, B, Small } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { SecondaryButton } from '../toolBox/button';
import colors from '../../constants/styleGuide/colors';
import FingerprintOverlay from '../fingerprintOverlay';

@connect(state => ({
  account: state.accounts.active,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class EnableBioAuth extends React.Component {
  state = {
    buttonDisabled: false,
    error: null,
    show: false,
  }

  confirm = () => {
    this.setState({ buttonDisabled: true });
    bioMetricAuthentication({
      successCallback: () => {
        storePassphraseInKeyChain(this.props.account.passphrase);
        this.props.settingsUpdated({ hasStoredPassphrase: true });
        this.props.navigation.pop();
      },
      errorCallback: () => {
        this.setState({ buttonDisabled: false });
      },
      androidError: this.setError,
    });

    if (Platform.OS === 'android') {
      this.props.navigation.setParams({
        headerVisible: false,
      });
      this.setState({ show: true });
    }
  }

  setError = (error) => {
    this.setState({ error: error.message });
  }

  render() {
    const title = this.props.navigation.getParam('title', null);
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <H1 style={styles.header}>Enabling {title}</H1>
            <B style={styles.subHeader}>Here’s what you need to know:</B>
            <View style={[styles.row, styles.separator]}>
              <Icon name='passphrase' style={styles.icon} color={colors.primary5} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>Your passphrase is still needed</B>
                <Small style={styles.description}>
                  You always need to keep your passphrase safe.
                  It will still be required for some actions.
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator]}>
              <Icon name='address' style={styles.icon} color={colors.grayScale1} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>You can always turn it off</B>
                <Small style={styles.description}>
                  You can disable Face ID at anytime in Settings page.
                  then authenticate with passphrase.
                </Small>
              </View>
            </View>
            <View style={[styles.row]}>
              <Icon name='avatar' style={styles.icon} color='#ffb533' size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>It’s fast and secure</B>
                <Small style={styles.description}>
                  The Avatar represents the address, making it easy to recognize.
                </Small>
              </View>
            </View>
          </View>
          <SecondaryButton
            disabled={this.state.buttonDisabled}
            style={styles.button}
            onClick={this.confirm}
            title='Enable' />
        </View>
        <FingerprintOverlay error={this.state.error} show={this.state.show} />
      </View>);
  }
}
export default EnableBioAuth;

