import React from 'react';
import { View, Alert, Image, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { P, H2 } from '../toolBox/typography';
import { IconButton } from '../toolBox/button';
import bg from '../../assets/images/bg.png';
import easing from '../../utilities/easing';
import withTheme from '../withTheme';
import getStyles from './styles';
import darkBig from '../../assets/images/balanceBlur/darkBig.png';
import darkMedium from '../../assets/images/balanceBlur/darkMedium.png';
import darkSmall from '../../assets/images/balanceBlur/darkSmall.png';
import lightBig from '../../assets/images/balanceBlur/lightBig.png';
import lightMedium from '../../assets/images/balanceBlur/lightMedium.png';
import lightSmall from '../../assets/images/balanceBlur/lightSmall.png';
import { colors, themes } from '../../constants/styleGuide';

const blurs = {
  darkBig, darkMedium, darkSmall, lightBig, lightMedium, lightSmall,
};

@connect(state => ({
  followedAccounts: state.accounts.followed,
  settings: state.settings,
}), {
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction,
})
class AccountSummary extends React.Component {
  state = {
    modalVisible: false,
    balanceWidth: 0,
    addressWidth: 0,
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(-20),
    },
    followed: false,
  }

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  interpolate = (inputRange, outputRange) =>
    this.props.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100,
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart,
    }).start();
  }

  toggleBookmark = () => {
    const {
      followedAccounts, account, navigation, accountUnFollowed,
    } = this.props;
    const isFollowed = followedAccounts.some(item => item.address === account.address);
    if (isFollowed) {
      Alert.alert('Are you sure?', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => accountUnFollowed(account.address),
        },
      ], { cancelable: false });
    } else {
      navigation.navigate({
        routeName: 'AddBookmark',
        params: {
          account,
          title: 'Add bookmark',
        },
      });
    }
  }

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  render() {
    const {
      styles, account, followedAccounts, settings,
      priceTicker, type, theme, navigation,
    } = this.props;

    const { interpolate } = this;
    const Anim = Animated.View;
    const { opacity, top } = this.state.initialAnimations;
    const normalizedBalance = fromRawLsk(account.balance);
    const height = type === 'home' ? 170 : 205;
    const isFollowed = followedAccounts.some(item => item.address === account.address);

    let faitBalance = 0;
    if (normalizedBalance && priceTicker[settings.currency]) {
      faitBalance = (normalizedBalance * priceTicker[settings.currency]).toFixed(2);
    }

    let balanceSize = 'Small';
    if (normalizedBalance.length > 6) balanceSize = 'Big';
    else if (normalizedBalance.length > 2) balanceSize = 'Medium';

    const followedAccountColor = theme === themes.light ? colors.light.blue : colors.dark.white;

    return (<View style={this.props.style}>
      <Anim style={[styles.container, styles.theme[`${type}Container`], { opacity, top, height },
        { marginTop: interpolate([0, height + 10], [0, -1 * (height - 1)]) }]}>
        {
          type === 'home' ?
          <Image style={[styles.bg, styles.theme.bg]} source={bg} /> : null
        }
        <Anim style={[styles.avatar, { opacity },
          { marginTop: interpolate([0, 100], [0, 100]) }]}>
          <Avatar address={account.address} size={60} />
        </Anim>
        <Anim style={[styles.address, { opacity },
          {
            opacity: this.interpolate([0, 30], [1, 0]),
            top: this.interpolate([0, 100], [0, 80]),
          },
        ]}>
          <Share type={P}
            style={[styles.addressP, styles.theme[`${type}Address`]]}
            iconColor={theme === 'dark' ? colors[theme].gray2 : colors[theme][type === 'home' ? 'gray5' : 'gray1']}
            containerStyle={styles.addressContainer}
            value={account.address} icon={true} />
        </Anim>
        <Anim style={[styles.balance, { opacity },
          {
            opacity: this.interpolate([0, height - 120, height - 85], [1, 1, 0]),
            top: this.interpolate([0, height - 50], [0, height - 120]),
          },
        ]}>
          <FormattedNumber
            style={[styles.theme[`${type}Balance`], settings.incognito ? styles.invisibleTitle : null]}
            type={H2}>{fromRawLsk(account.balance)}</FormattedNumber>
          <Image source={blurs[`${settings.theme}${balanceSize}`]}
            style={[styles.blur, styles[`blur${balanceSize}`],
            settings.incognito ? styles.visibleBlur : null]} />
        </Anim>
        <Anim style={[styles.fiat, { opacity },
          {
            opacity: this.interpolate([0, 30], [1, 0]),
            top: this.interpolate([0, 100], [0, 80]),
          },
        ]}>
        {
          !settings.incognito && type === 'home' ?
            <P style={[styles.fiatValue, styles.theme.fiatValue]}>
              {`~ ${faitBalance} ${settings.currency}`}
            </P> : null
        }
        {
          type === 'wallet' ?
          <View style={styles.actionBar}>
            <IconButton
              style={styles.bookmarkButton}
              titleStyle={styles.bookmarkButtonTitle}
              title=''
              icon={isFollowed ? 'bookmark-full' : 'bookmark'}
              color={isFollowed ? followedAccountColor : colors[theme].gray1}
              iconSize={20}
              onClick={this.toggleBookmark} />
            <IconButton
              titleStyle={[styles.sendButtonTitle, styles.theme.sendButtonTitle]}
              style={styles.sendButton}
              title='Send to this address'
              icon='send'
              color={colors[theme].gray1}
              iconSize={20}
              onClick={() => navigation.navigate('Send', { query: { address: account.address } })} />
          </View> : null
        }
        </Anim>
      </Anim>
    </View>);
  }
}

export default withTheme(AccountSummary, getStyles());
