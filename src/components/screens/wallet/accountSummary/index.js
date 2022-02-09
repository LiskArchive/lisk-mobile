import React from 'react';
import {
  Animated, Dimensions, TouchableOpacity, View
} from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction
} from '../../../../actions/accounts';
import Avatar from '../../../shared/avatar';
import { fromRawLsk } from '../../../../utilities/conversions';
import FormattedNumber from '../../../shared/formattedNumber';
import { P, B } from '../../../shared/toolBox/typography';
import easing from '../../../../utilities/easing';
import { stringShortener } from '../../../../utilities/helpers';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';
import { colors, themes } from '../../../../constants/styleGuide';
import CopyToClipboard from '../../../shared/copyToClipboard';
import Icon from '../../../shared/toolBox/icon';

@connect(
  (state) => ({
    followedAccounts: state.accounts.followed,
    settings: state.settings,
    activeToken: state.settings.token.active,
    language: state.settings.language
  }),
  {
    accountFollowed: accountFollowedAction,
    accountUnFollowed: accountUnFollowedAction
  }
)
class AccountSummary extends React.Component {
  state = {
    modalVisible: false,
    addressWidth: 0,
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(-20)
    },
    followed: false
  };

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  interpolate = (inputRange, outputRange) =>
    this.props.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart
    }).start();
  };

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  sendLSK = () =>
    this.props.navigation.navigate({
      key: Math.random(),
      name: 'Home',
      params: {
        screen: 'Send',
        params: {
          query: { address: this.props.account.address }
        }
      }
    });

  render() {
    const {
      styles,
      account,
      followedAccounts,
      activeToken,
      settings: { token },
      language,
      t,
      theme
    } = this.props;

    const AView = Animated.View;
    const normalizedBalance = fromRawLsk(account.balance);
    const isFollowed = followedAccounts[activeToken].find(
      (item) => item.address === account.address
    );

    return (
      <AView style={[styles.walletContainer, styles.theme.walletContainer]}>
        <View style={styles.container}>
          <View style={[styles.addressContainer, styles.theme.addressContainer]}>
            <View>
              <B style={[styles.label, styles.theme.label]}>{isFollowed?.label}</B>
              <CopyToClipboard
                labelStyle={[styles.copy, styles.theme.copy]}
                iconStyle={styles.icon}
                label={stringShortener(account.address, 6, 5)}
                showIcon={true}
                iconSize={14}
                value={account.address}
                type={P}
              />
            </View>
            <Avatar address={account.address} size={51} />
          </View>
          <View style={[styles.balanceRow]}>
            <P style={styles.theme.copy}>{t('Balance')}</P>
            <FormattedNumber
              tokenType={token.active}
              style={[styles.walletBalance, styles.theme.walletBalance]}
              type={B}
              language={language}
            >
              {normalizedBalance}
            </FormattedNumber>
          </View>
          <TouchableOpacity style={[styles.button, styles.theme.button]} onPress={this.sendLSK} >
            <Icon
              name="send"
              size={18}
              style={styles.sendIcon}
              color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
            />
            <P style={styles.theme.send}>{t('Send LSK')}</P>
          </TouchableOpacity>
        </View>
      </AView>
    );
  }
}

export default withTheme(translate()(AccountSummary), getStyles());
