import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import { B, P } from '../../toolBox/typography';
import CopyToClipboard from '../../copyToClipboard';
import { PrimaryButton } from '../../toolBox/button';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import image from '../../../assets/images/registrationProcess/passphrase3x.png';

class SafeKeeping extends React.Component {
  componentDidMount() {
    const { t, prevStep, navigation: { setParams } } = this.props;
    setParams({
      action: prevStep,
      title: t('Your passphrase'),
    });
  }

  forward = () => {
    this.props.nextStep({
      passphrase: this.props.sharedData.passphrase,
    });
  }

  render() {
    const { t, sharedData: { passphrase } } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <B style={styles.subHeader}>
              {t('The only way to access your account.')}
            </B>
          </View>
          <P style={styles.passphraseTitle}>{t('This is your passphrase:')}</P>
          <View style={styles.passphraseContainer}>
            <B style={styles.passphrase}>
              {passphrase.replace(/\s+/g, '    ')}
            </B>
          </View>
          <View style={styles.copyContainer}>
            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={styles.copy}
              iconStyle={styles.copy}
              label={t('Copy to clipboard')}
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
                <P style={styles.caption}>{t('Keep it safe!')}</P>
              </View> : null
          }
        </View>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            style={styles.button}
            noTheme={true}
            onClick={this.forward}
            title={t('I wrote it down')} />
        </View>
      </View>);
  }
}

export default translate()(SafeKeeping);
