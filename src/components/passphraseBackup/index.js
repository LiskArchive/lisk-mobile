import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image } from 'react-native';
import { deviceHeight } from '../../utilities/device';
import styles from './styles';
import { H1, B, P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';
import image from '../../assets/images/registrationProcess/passphrase3x.png';

@connect(state => ({
  account: state.accounts.active,
}), {})
class PassphraseBackup extends React.Component {
  render() {
    const { passphrase } = this.props.account;
    return (<View style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <H1 style={styles.header}>Backup your passphrase</H1>
              <P style={styles.subHeader}>
              Carefully write down or copy it to the clipboard.
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
          {
            deviceHeight() > 640 ?
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={image}
              />
              <P style={styles.caption}>Keep it safe!</P>
            </View> : null
          }
          <View style={styles.placeholder}>
          </View>
        </View>
      </View>);
  }
}

export default PassphraseBackup;
