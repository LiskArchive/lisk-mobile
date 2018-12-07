import React from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { H4, P, H2 } from '../toolBox/typography';
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
import { colors } from '../../constants/styleGuide';

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

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
    this.props.navigation.setParams({
      title: {
        placeHolder: 'Your wallet',
        balance: fromRawLsk(this.props.account.balance),
        address: this.props.account.address,
        interpolate: this.interpolate,
      },
    });
  }

  render() {
    const {
      styles, account, settings, priceTicker,
    } = this.props;
    const { interpolate } = this;
    const Anim = Animated.View;
    const { opacity, top } = this.state.initialAnimations;
    const normalizedBalance = fromRawLsk(account.balance);

    let faitBalance = 0;
    if (normalizedBalance && priceTicker[settings.currency]) {
      faitBalance = (normalizedBalance * priceTicker[settings.currency]).toFixed(2);
    }

    let balanceSize = 'Small';
    if (normalizedBalance.length > 6) balanceSize = 'Big';
    else if (normalizedBalance.length > 2) balanceSize = 'Medium';

    return (<View style={this.props.style}>
      {
        account && account.address ?
        <Anim style={[styles.container, styles.theme.container, { opacity, top },
          { marginTop: interpolate([0, 180], [0, -180]) }]}>
          <Image style={[styles.bg, styles.theme.bg]} source={bg} />
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
              style={[styles.addressP, styles.theme.addressP]}
              iconColor={colors.light.gray5}
              containerStyle={styles.addressContainer}
              value={account.address} icon={true} />
          </Anim>
          <Anim style={[styles.balance, { opacity },
            {
              opacity: this.interpolate([0, 50, 85], [1, 1, 0]),
              top: this.interpolate([0, 100], [0, 50]),
            },
          ]}>
            <FormattedNumber
              style={[styles.theme.balance, settings.incognito ? styles.invisibleTitle : null]}
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
            !settings.incognito ?
              <P style={[styles.fiatValue, styles.theme.fiatValue]}>
                {`~ ${faitBalance} ${settings.currency}`}
              </P> : null
          }
          </Anim>
        </Anim> :
        <H4>Fetching account info</H4>
      }
    </View>);
  }
}

export default withTheme(AccountSummary, getStyles());
