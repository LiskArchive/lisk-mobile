import React from 'react';
import Switch from 'react-native-switch-pro';
import { View, ScrollView } from 'react-native';
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
    this.setState({ passphrase: generatePassphrase() });

    this.props.navigation.setParams({
      action: false,
      title: 'Account creation',
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
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <B style={styles.subHeader}>Here’s what you will get:</B>
            <View style={[styles.row, styles.separator]}>
              <Icon name='passphrase' style={styles.icon} color={colors.light.blue} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>A secure passphrase</B>
                <Small style={styles.description}>
                  Your passphrase is used to access your account.
                  No one can reset it, not even Lisk.
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator]}>
              <Icon name='address' style={styles.icon} color={colors.light.gray1} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>Your Lisk address</B>
                <Small style={styles.description}>
                  The address is unique and can’t be changed. It’s yours.
                  Find it in your home page.
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator]}>
              <Icon name='avatar' style={styles.icon} color={colors.light.yellow} size={36}/>
              <View style={styles.textWrapper}>
                <B style={styles.rowTitle}>A unique avatar</B>
                <Small style={styles.description}>
                  The Avatar represents the address, making it easy to recognize.
                </Small>
              </View>
            </View>
          </View>
          <View style={styles.actionBar}>
            <View style={styles.row}>
              <Switch
                testID="registerIntroSwitch"
                height={26}
                width={43}
                onSyncPress={this.confirm}
                backgroundActive={colors.light.blue}
                backgroundInactive={colors.light.gray4}
              />
              <Small style={styles.label}>
                {
                  deviceHeight() >= SCREEN_HEIGHTS.SM ?
                  'I understand that its my responsibility to keep my passphrase safe.' :
                  'It is my responsibility to keep my passphrase safe.'
                }
              </Small>
            </View>
            <View style={styles.buttonWrapper}>
              <SecondaryButton
                testID="registerIntroButton"
                disabled={this.state.buttonStatus}
                noTheme={true}
                style={styles.button}
                onClick={this.forward}
                title='Continue'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Intro;
