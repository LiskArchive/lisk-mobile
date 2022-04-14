import React from 'react';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Switch from 'react-native-switch-pro';
import { B, P } from 'components/shared/toolBox/typography';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'navigation/headerBackButton';
import { colors } from 'constants/styleGuide';
import styles from './styles';

class SafeKeeping extends React.Component {
  state = {
    confirmed: false,
  };

  componentDidMount() {
    const {
      t,
      prevStep,
      navigation: { setOptions },
    } = this.props;
    setOptions({
      headerLeft: props => <HeaderBackButton {...props} onPress={prevStep} />,
      title: t('Your passphrase'),
    });
  }

  forward = () => {
    this.props.nextStep({
      passphrase: this.props.sharedData.passphrase,
    });
  };

  confirm = status => {
    this.setState({
      confirmed: status,
    });
  };

  render() {
    const {
      t,
      sharedData: { passphrase },
    } = this.props;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.passphraseContainer}>
              <P style={styles.passphraseTitle}>
                {t('Store your passphrase carefully')}
              </P>
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
                testID="understandResponsibilitySwitch"
                height={26}
                width={43}
                onSyncPress={this.confirm}
                backgroundActive={colors.light.ultramarineBlue}
                backgroundInactive={colors.light.platinum}
              />
              <P style={styles.confirmText}>
                {t(
                  'I understand that it’s my responsibility to keep my passphrase safe.'
                )}
              </P>
            </View>
            <View>
              <PrimaryButton
                disabled={!this.state.confirmed}
                testID="safeKeepingButton"
                style={styles.button}
                noTheme={true}
                onClick={this.forward}
                title={t('I wrote it down')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default translate()(SafeKeeping);
