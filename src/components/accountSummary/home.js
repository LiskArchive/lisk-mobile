import React from 'react';
import { Image, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import Profile from './profile';
import { deviceWidth } from '../../utilities/device';
import bg from '../../assets/images/bg.png';
import easing from '../../utilities/easing';
import { tokenKeys } from '../../constants/tokens';
import withTheme from '../withTheme';
import getStyles from './styles';

const width = deviceWidth();

@connect(state => ({
  settings: state.settings,
  accounts: state.accounts,
  priceTicker: state.service.priceTicker,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class AccountSummary extends React.Component {
  state = {
    balanceWidth: 0,
    addressWidth: 0,
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(-20),
    },
    activeSlide: 0,
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

  renderProfile = (data) => {
    const { settings, priceTicker } = this.props;
    const height = 165;
    const token = Object.keys(settings.token.list)[data.index];

    return (<Profile
      key={token}
      token={token}
      priceTicker={priceTicker}
      account={data.item}
      settings={settings}
      interpolate={this.interpolate}
      height={height}
       />);
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
        carouselRef={this.carousel}
      />
    );
  }

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  componentDidUpdate(prevProps) {
    const { settings: { token: newToken }, accounts: { info: newInfo } } = this.props;
    const { settings: { token: oldToken }, accounts: { info: oldInfo } } = prevProps;
    // This is a hack that fixes a known rendering issue of Carousel.
    if (!prevProps.isFocused && this.props.isFocused) {
      setTimeout(() => {
        this.carousel.triggerRenderingHack();
      }, 50);
    }

    // reset the carousel navigation
    const newCount = tokenKeys.filter(key => newToken.list[key]).map(key => newInfo[key]).length;
    const oldCount = tokenKeys.filter(key => oldToken.list[key]).map(key => oldInfo[key]).length;

    if (oldCount === 1 && newCount > 1) {
      this.setState({ activeSlide: 0 });
    }
  }

  render() {
    const { accounts: { info }, settings: { token }, styles } = this.props;
    const { opacity, top } = this.state.initialAnimations;
    const profiles = tokenKeys.filter(key => token.list[key]).map(key => info[key]);

    return (
      <Animated.View style={[
        styles.homeContainer,
        this.props.style,
        { top, opacity, paddingBottom: this.interpolate([0, 100], [15, 0]) },
      ]}>
        <Image style={[styles.bg, styles.theme.bg]} source={bg} />
        {
          profiles.length > 1 ?
            <Carousel
              ref={(el) => { this.carousel = el; }}
              firstItem={0}
              data={profiles}
              renderItem={this.renderProfile}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={this.changeToken}
            /> :
          this.renderProfile({ item: profiles[0], index: 0 })
        }
        {
          profiles.length > 1 ?
            <Animated.View style={[
              styles.paginationWrapper,
              { opacity: this.interpolate([0, 20], [1, 0]) },
            ]}>
              { this.pagination() }
            </Animated.View> : null
        }
      </Animated.View>
    );
  }
}

export default withTheme(AccountSummary, getStyles());
