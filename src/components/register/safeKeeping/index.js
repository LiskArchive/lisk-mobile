import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { B, P } from '../../toolBox/typography';
import CopyToClipboard from '../../copyToClipboard';
import { SecondaryButton } from '../../toolBox/button';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import image from '../../../assets/images/registrationProcess/passphrase3x.png';

class SafeKeeping extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      action: this.props.prevStep,
      title: 'Your passphrase',
    });
  }

  forward = () => {
    this.props.nextStep({
      passphrase: this.props.sharedData.passphrase,
    });
  }

  render() {
    const { passphrase } = this.props.sharedData;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <B style={styles.subHeader}>
              The only way to access your account.
            </B>
          </View>
          <P style={styles.passphraseTitle}>This is your passphrase:</P>
          <View style={styles.passphraseContainer}>
            <B style={styles.passphrase} testID="passphraseText">
              {passphrase.replace(/\s+/g, '    ')}
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
          {
            deviceHeight() >= SCREEN_HEIGHTS.SM ?
              <View style={styles.imageContainer} >
                <Image
                  style={styles.image}
                  source={image}
                />
                <P style={styles.caption}>Keep it safe!</P>
              </View> : null
          }
        </View>
        <View style={styles.buttonWrapper}>
          <SecondaryButton
            testID="registerSafeKeepingButton"
            style={styles.button}
            noTheme={true}
            onClick={this.forward}
            title='I wrote it down'
          />
        </View>
      </View>);
  }
}

export default SafeKeeping;
