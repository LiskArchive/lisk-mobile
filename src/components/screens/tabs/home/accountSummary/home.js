import React from 'react';
import { Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import { settingsUpdated as settingsUpdatedAction } from '../../../../../actions/settings';
import Profile from './profile';
import easing from '../../../../../utilities/easing';
import { tokenKeys } from '../../../../../constants/tokens';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';


@connect(
  (state) => ({
    settings: state.settings,
    accounts: state.accounts,
    priceTicker: state.service.priceTicker
  }),
  {
    settingsUpdated: settingsUpdatedAction
  }
)
class AccountSummary extends React.Component {
  constructor(props) {
    super(props);
    const {
      settings: { token }
    } = props;
    this.state = {
      balanceWidth: 0,
      addressWidth: 0,
      initialAnimations: {
        opacity: new Animated.Value(0),
        top: new Animated.Value(-20)
      },
      activeSlide: tokenKeys.filter((key) => token.list[key]).indexOf(token.active)
    };
  }

  height = 140;

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
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

  changeToken = (index) => {
    this.setState({ activeSlide: index }, () => {
      const {
        settings: { token },
        settingsUpdated
      } = this.props;
      settingsUpdated({
        token: {
          active: Object.keys(token.list)[index],
          list: token.list
        }
      });
    });
  };

  renderProfile = (data) => {
    const { settings, priceTicker } = this.props;
    const token = Object.keys(settings.token.list)[data.index];

    return (
      <Profile
        key={token}
        token={token}
        priceTicker={priceTicker}
        account={data.item}
        settings={settings}
        interpolate={this.interpolate}
        height={this.height}
      />
    );
  };

  componentDidUpdate(prevProps) {
    const {
      settings: { token: newToken },
      accounts: { info: newInfo }
    } = this.props;
    const {
      settings: { token: oldToken },
      accounts: { info: oldInfo }
    } = prevProps;
    // reset the carousel navigation
    const newCount = tokenKeys
      .filter((key) => newToken.list[key])
      .map((key) => newInfo[key]).length;
    const oldCount = tokenKeys
      .filter((key) => oldToken.list[key])
      .map((key) => oldInfo[key]).length;

    // This is a hack that fixes a known rendering issue of Carousel.
    if (!prevProps.isFocused && this.props.isFocused && newCount > 1) {
      setTimeout(() => {
        const newIndex = tokenKeys.filter((key) => newToken.list[key]).indexOf(newToken.active);
        this.carousel.triggerRenderingHack();
        this.carousel.snapToItem(newIndex, false);
      }, 0);
    }

    if (oldCount === 1 && newCount > 1) {
      this.setState({ activeSlide: 0 });
    }
  }

  render() {
    const {
      accounts: { info },
      settings: { token },
      styles
    } = this.props;
    const {
      initialAnimations: { opacity, top },
    } = this.state;
    const profiles = tokenKeys.filter((key) => token.list[key]).map((key) => info[key]);

    return (
      <Animated.View
        style={[
          styles.homeContainer,
          styles.theme[`homeContainer${token.active}`],
          this.props.style,
          { top, opacity, paddingBottom: this.interpolate([0, 100], [15, 0]) }
        ]}
      >
        <Animated.View
          style={[
            styles.container,
            { height: this.height },
            {
              marginTop: this.interpolate([0, this.height + 10], [0, -1 * this.height])
            }
          ]}
        >
          {this.renderProfile({ item: profiles[0], index: 0 })}
        </Animated.View>
      </Animated.View>
    );
  }
}

export default withTheme(AccountSummary, getStyles());
