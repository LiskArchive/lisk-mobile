import React from 'react';
import Switch from 'react-native-switch-pro';
import { View } from 'react-native';
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
      <View style={styles.container}>
        <View>
          <H1 style={styles.header}>You’re about to Intro{'\n'}your Lisk account.</H1>
          <B style={styles.subHeader}>Here’s what you will get:</B>
          <View style={styles.row}>
            <View style={[styles.iconWrapper, styles.color1]}>
              <Icon name='lisk-id' color='#fff' size={16}/>
            </View>
            <View style={styles.textWrapper}>
              <B style={styles.rowTitle}>Your Lisk ID</B>
              <Small style={styles.description}>
                The ID is unique and can’t be changed. It’s yours.
                You will be able to see the full ID after you login.
              </Small>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.iconWrapper, styles.color2]}>
              <Icon name='avatar' color='#fff' size={18}/>
            </View>
            <View style={styles.textWrapper}>
              <B style={styles.rowTitle}>A unique avatar</B>
              <Small style={styles.description}>
                The Avatar represents the ID, making it easy to recognize.
                Every Lisk ID has one unique avatar.
              </Small>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.iconWrapper, styles.color3]}>
              <Icon name='passphrase' color='#fff' size={16}/>
            </View>
            <View style={styles.textWrapper}>
              <B style={styles.rowTitle}>A secure passphrase</B>
              <Small style={styles.description}>
                Your passphrase is used to access your Lisk ID.
                Keep it safe. No one can reset it, not even Lisk.
              </Small>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Switch
              height={22}
              width={36}
              onSyncPress={this.confirm}
              backgroundActive={colors.primary5}
              backgroundInactive={colors.grayScale3}
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
      </View>);
  }
}
export default Intro;

