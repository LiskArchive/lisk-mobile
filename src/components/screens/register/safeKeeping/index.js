import React from 'react';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-navigation';
import Switch from 'react-native-switch-pro';
import styles from './styles';
import { B, P } from '../../../shared/toolBox/typography';
import CopyToClipboard from '../../../shared/copyToClipboard';
import { PrimaryButton } from '../../../shared/toolBox/button';
import { colors } from '../../../../constants/styleGuide';

class SafeKeeping extends React.Component {
  state = {
    confirmed: false,
  }

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

  confirm = (status) => {
    this.setState({
      confirmed: status,
    });
  }

  render() {
    const { t, sharedData: { passphrase } } = this.props;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.passphraseContainer}>
              <P style={styles.passphraseTitle}>{t('Store your passphrase carefully')}</P>
              <Text style={styles.passphrase} testID="passphraseText">
                {passphrase.replace(/\s+/g, '  ')}
              </Text>
              <CopyToClipboard
                style={styles.copyContainer}
                labelStyle={styles.copy}
                iconStyle={styles.copy}
                label={t('Copy to clipboard')}
                showIcon={true}
                iconSize={14}
                value={passphrase}
                type={B}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.switchContainer}>
              <Switch
                height={26}
                width={43}
                onSyncPress={this.confirm}
                backgroundActive={colors.light.ultramarineBlue}
                backgroundInactive={colors.light.platinum}
                testID="understandResponsibilitySwitch"
              />
              <P style={styles.confirmText}>{t('I understand that it’s my responsibility to keep my passphrase safe.')}</P>
            </View>
            <View>
              <PrimaryButton
                disabled={!this.state.confirmed}
                testID="safeKeepingButton"
                style={styles.button}
                noTheme={true}
                onClick={this.forward}
                title={t('I wrote it down')} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default translate()(SafeKeeping);
