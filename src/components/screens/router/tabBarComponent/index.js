import React from 'react';
import connect from 'redux-connect-decorator';
import { BottomTabBar } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import withTheme from '../../../shared/withTheme';
import { tokenMap } from '../../../../constants/tokens';
import getStyles from './styles';
import { deviceType } from '../../../../utilities/device';

@connect(state => ({
  settings: state.settings,
}))
class TabBar extends React.Component {
  render() {
    const { settings, styles, ...rest } = this.props;

    const platformStyle = {};
    if (Platform.OS === 'ios') {
      if (deviceType() === 'iOSx') {
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
      activeTintColor = styles.theme.activeTint.color;
    }

    return (
      <BottomTabBar
        {...rest}
        // fix for https://github.com/react-navigation/react-navigation-tabs/issues/116
        getAccessibilityRole={() => 'button'}
        getAccessibilityStates={({ focused }) => (focused ? ['selected'] : [])}
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
