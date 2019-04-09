import React from 'react';
import Switch from 'react-native-switch-pro';
import { View, ScrollView } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import { generatePassphrase } from '../../../utilities/passphrase';
import { B, Small } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { SecondaryButton } from '../../toolBox/button';
import colors from '../../../constants/styleGuide/colors';

class Intro extends React.Component {
  state = {
    passphrase: '',
    buttonStatus: true,
  }

  componentDidMount() {
    const { t, navigation: { setParams } } = this.props;

    this.setState({ passphrase: generatePassphrase() });
    setParams({
      action: false,
      title: t('Account creation'),
    });
  }

  confirm = (status) => {
    this.setState({
      buttonStatus: !status,
    });
  }

  forward = () => {
    this.props.nextStep({
      passphrase: this.state.passphrase,
    });
  }

  render() {
    const { t } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <B style={styles.subHeader}>{t('Here’s what you will get:')}</B>
            <View style={[styles.row, styles.separator]}>
              <Icon name='passphrase' style={styles.icon} color={colors.light.blue} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>{t('A secure passphrase')}</B>
                <Small style={styles.description}>
                  {t('Your passphrase is used to access your account. No one can reset it, not even Lisk.')}
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator]}>
              <Icon name='address' style={styles.icon} color={colors.light.gray1} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>{t('Your Lisk address')}</B>
                <Small style={styles.description}>
                  {t('The address is unique and can’t be changed. It’s yours. Find it in your home page.')}
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator]}>
              <Icon name='avatar' style={styles.icon} color={colors.light.yellow} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>{t('A unique avatar')}</B>
                <Small style={styles.description}>
                  {t('The Avatar represents the address, making it easy to recognize.')}
                </Small>
              </View>
            </View>
          </View>
          <View style={styles.actionBar}>
            <View style={styles.row}>
              <Switch
                height={26}
                width={43}
                onSyncPress={this.confirm}
                backgroundActive={colors.light.blue}
                backgroundInactive={colors.light.gray4}
              />
              <Small style={styles.label}>
                {
                  deviceHeight() >= SCREEN_HEIGHTS.SM ?
                  t('I understand that it’s my responsibility to keep my passphrase safe.') :
                  t('It is my responsibility to keep my passphrase safe.')
                }
              </Small>
            </View>
            <View style={styles.buttonWrapper}>
              <SecondaryButton
                disabled={this.state.buttonStatus}
                noTheme={true}
                style={styles.button}
                onClick={this.forward}
                title={t('Continue')}
              />
            </View>
          </View>
        </View>
      </ScrollView>);
  }
}

export default translate()(Intro);
