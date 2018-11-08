import React from 'react';
import Switch from 'react-native-switch-pro';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import { generatePassphrase } from '../../../utilities/passphrase';
import { H1, B, Small } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import { SecondaryButton } from '../../toolBox/button';
import colors from '../../../constants/styleGuide/colors';

class Intro extends React.Component {
  state = {
    passphrase: '',
    buttonStatus: true,
  }
  componentDidMount() {
    const passphrase = generatePassphrase();
    this.setState({
      passphrase,
    });
    this.props.navigation.setParams({ action: this.props.navigation.pop });
  }
  confirm = (status) => {
    this.setState({
      buttonStatus: !status,
    });
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <H1 style={styles.header}>You’re about to create{'\n'}your Lisk account.</H1>
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
          <View>
            <View style={styles.row}>
              <Switch
                height={26}
                width={43}
                onSyncPress={this.confirm}
                backgroundActive={colors.light.blue}
                backgroundInactive={colors.light.gray4}
              />
              <Small style={styles.label}>
                I understand that it is my responsibility to keep my passphrase safe.
              </Small>
            </View>
          <SecondaryButton
            disabled={this.state.buttonStatus}
            style={styles.button}
            onClick={() => {
              this.props.nextStep({
                passphrase: this.state.passphrase,
              });
            }}
            title='Continue' />
          </View>
        </View>
      </ScrollView>);
  }
}
export default Intro;
