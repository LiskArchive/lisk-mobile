import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, DeviceInfo } from 'react-native';
import withTheme from '../../withTheme';
import getStyles from './styles';

const DefaultTabBar = TabNavigator.Presets.Default.tabBarComponent;

export default withTheme(({ styles, ...props }) => {
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

  return (
    <DefaultTabBar
      {...props}
      activeTintColor={styles.theme.tint.color}
      indicatorStyle={styles.theme.indicatorStyle}
      inactiveTintColor={styles.theme.inactiveTint.color}
      showIcon={true}
      showLabel={false}
      upperCaseLabel={false}
      style={[styles.style, styles.theme.style, platformStyle]}
      allowFontScaling={false}
    />
  );
}, getStyles());
