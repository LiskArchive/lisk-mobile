import React from 'react';
import { View, Alert, Image, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import Profile from './profile';
import { deviceWidth } from '../../utilities/device';
import bg from '../../assets/images/bg.png';
import easing from '../../utilities/easing';
import withTheme from '../withTheme';
import getStyles from './styles';

const width = deviceWidth();

@connect(state => ({
  settings: state.settings,
  accounts: state.accounts,
}), {
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction,
  settingsUpdated: settingsUpdatedAction,
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
    activeSlide: 0,
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

  changeToken = (index) => {
    this.setState({ activeSlide: index }, () => {
      const { settings: { token }, settingsUpdated } = this.props;
      settingsUpdated({
        token: {
          active: Object.keys(token.list)[index],
          list: token.list,
        },
      });
    });
  }

  toggleBookmark = () => {
    const {
      accounts: { followed }, account, navigation, accountUnFollowed, t,
    } = this.props;
    const isFollowed = followed.some(item => item.address === account.address);
    if (isFollowed) {
      Alert.alert(t('Are you sure?'), '', [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Confirm'),
          onPress: () => accountUnFollowed(account.address),
        },
      ], { cancelable: false });
    } else {
      navigation.navigate({
        routeName: 'AddBookmark',
        params: {
          account,
          title: t('Add bookmark'),
        },
      });
    }
  }

  renderProfile = (data) => {
    const { settings, priceTicker } = this.props;

    const { opacity, top } = this.state.initialAnimations;
    const height = 165;

    return (<Profile
      priceTicker={priceTicker}
      account={data.item}
      settings={settings}
      interpolate={this.interpolate.bind(this)}
      opacity={opacity}
      top={top}
      height={height} />);
  }

  pagination = () => {
    const { activeSlide } = this.state;
    const { accounts: { info }, styles } = this.props;
    return (
      <Pagination
        dotsLength={Object.keys(info).length}
        activeDotIndex={activeSlide}
        containerStyle={styles.pagination}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotScale={1}
        inactiveDotOpacity={1}
      />);
  }

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  render() {
    const { accounts: { info }, styles } = this.props;

    const profiles = Object.keys(info).map(key => info[key]);

    return (<View style={[styles.homeContainer, this.props.style]}>
      <Image style={[styles.bg, styles.theme.bg]} source={bg} />
      <Carousel
        ref={(el) => { this.carousel = el; }}
        data={profiles}
        renderItem={this.renderProfile.bind(this)}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={this.changeToken}
      />
      { this.pagination() }
    </View>);
  }
}

export default withTheme(AccountSummary, getStyles());
