import React from 'react';
import { Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import { settingsUpdated as settingsUpdatedAction } from 'actions/settings';
import easing from 'utilities/easing';
import { tokenKeys } from 'constants/tokens';
import withTheme from 'components/shared/withTheme';
import Profile from './profile';
import getStyles from './styles';

@connect(
  (state) => ({
    settings: state.settings,
    accounts: state.accounts,
    activeToken: state.settings.token.active,
    priceTicker: state.service.priceTicker
  }),
  {
    settingsUpdated: settingsUpdatedAction
  }
)
class AccountSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceWidth: 0,
      addressWidth: 0,
      initialAnimations: {
        opacity: new Animated.Value(0),
        top: new Animated.Value(-20)
      },
    };
  }

  height = 260;

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

  renderProfile = (data) => {
    const {
      settings, priceTicker, t, accounts, activeToken
    } = this.props;
    const token = Object.keys(settings.token.list)[data.index];
    const { address, lockedBalance, isMultisignature } = accounts.info[activeToken];
    return (
      <Profile
        t={t}
        key={token}
        token={token}
        priceTicker={priceTicker}
        account={data.item}
        settings={settings}
        interpolate={this.interpolate}
        height={this.height}
        address={address}
        lockedBalance={lockedBalance}
        isMultiSignature={isMultisignature}
        {...this.props}
      />
    );
  };

  render() {
    const {
      accounts: { info },
      settings: { token },
    } = this.props;
    const {
      initialAnimations: { opacity, top },
    } = this.state;
    const profiles = tokenKeys.filter((key) => token.list[key]).map((key) => info[key]);

    return (
      <Animated.View
        style={[
          { height: this.interpolate([0, 280], [280, 0]) },
          { top, opacity, paddingBottom: this.interpolate([0, 280], [15, 0]) },
        ]}
      >
          {this.renderProfile({ item: profiles[0], index: 0 })}
      </Animated.View>
    );
  }
}

export default withTheme(translate()(AccountSummary), getStyles());
