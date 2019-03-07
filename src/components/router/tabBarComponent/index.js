import React from 'react';
import connect from 'redux-connect-decorator';
import { TabNavigator } from 'react-navigation';
import { Platform, DeviceInfo } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { tokenMap } from '../../../constants/tokens';
import { colors } from '../../../constants/styleGuide';

const DefaultTabBar = TabNavigator.Presets.Default.tabBarComponent;

@connect(state => ({
  settings: state.settings,
}))
class TabBar extends React.Component {
  render() {
    const { settings, styles, ...rest } = this.props;

    const platformStyle = {};
    if (Platform.OS === 'ios') {
      if (DeviceInfo.isIPhoneX_deprecated) {
        platformStyle.height = 55;
      } else {
        platformStyle.height = 60;
      }
    } else {
      platformStyle.paddingTop = 5;
      platformStyle.paddingBottom = 5;
    }

    let activeTintColor = styles.theme.tint.color;
    if (settings.token.active === tokenMap.BTC.key) {
      activeTintColor = colors.light.btc;
    }

    return (
      <DefaultTabBar
        {...rest}
        activeTintColor={activeTintColor}
        indicatorStyle={styles.theme.indicatorStyle}
        inactiveTintColor={styles.theme.inactiveTint.color}
        showIcon={true}
        showLabel={false}
        upperCaseLabel={false}
        style={[styles.style, styles.theme.style, platformStyle]}
        allowFontScaling={false}
      />
    );
  }
}

export default withTheme(TabBar, getStyles());
