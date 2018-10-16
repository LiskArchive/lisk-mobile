import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image } from 'react-native';
import styles from './styles';
import {
  removePassphraseFromKeyChain,
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { H1, B, P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';
import { SecondaryButton } from '../toolBox/button';
import image from '../../assets/images/registrationProcess/passphrase3x.png';

@connect(state => ({
  account: state.accounts.active,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class DisableBioAuth extends React.Component {
  state = {
    buttonDisabled: false,
  }

  confirm = () => {
    this.setState({ buttonDisabled: true });
    bioMetricAuthentication(
      () => {
        removePassphraseFromKeyChain();
        this.props.settingsUpdated({ hasStoredPassphrase: false });
        this.props.navigation.pop();
      },
      () => {
        this.setState({ buttonDisabled: false });
      },
    );
  }

  render() {
    const { passphrase } = this.props.account;
    return (<View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <H1 style={styles.header}>Your passphrase</H1>
              <P style={styles.subHeader}>
                The only way to access your account.
              </P>
            </View>
            <View style={styles.passphraseContainer}>
              <P style={styles.passphraseTitle}>This is your passphrase:</P>
              <B style={styles.passphrase}>
                {passphrase}
              </B>
            </View>
            <View style={styles.copyContainer}>
              <CopyToClipboard
                style={styles.copyContainer}
                labelStyle={styles.copy}
                iconStyle={styles.copy}
                label='Copy to clipboard'
                showIcon={true}
                iconSize={14}
                value={passphrase}
                type={P}/>
            </View>
          </View>
          <View style={styles.imageContainer} >
            <Image
              style={styles.image}
              source={image}
            />
            <P style={styles.caption}>Keep it safe!</P>
          </View>
          <View>
            <SecondaryButton
              disabled={this.state.buttonDisabled}
              style={styles.button}
              onClick={this.confirm}
              title='Disable' />
          </View>
        </View>
      </View>);
  }
}

export default DisableBioAuth;
