import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, DeviceInfo } from 'react-native';
import { themes, colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';

const getStyles = () => ({
  common: {
    style: {
      borderTopWidth: 1,
      zIndex: 99,
    },
  },
  [themes.dark]: {
    style: {
      backgroundColor: colors.dark.tabBarBgNavy,
      borderTopColor: colors.dark.tabBarBgNavy,
    },
    tint: {
      color: colors.dark.white,
    },
    indicatorStyle: {
      backgroundColor: colors.dark.tabBarBgNavy,
    },
  },
  [themes.light]: {
    style: {
      backgroundColor: colors.light.white,
      borderTopColor: colors.light.gray5,
    },
    tint: {
      color: colors.light.blue,
    },
    indicatorStyle: {
      backgroundColor: colors.light.white,
    },
  },
});

const DefaultTabBar = TabNavigator.Presets.Default.tabBarComponent;
export default withTheme(({ styles, ...props }) => {
  const iosStyle = {};
  const iosLabelStyle = {};
  if (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) {
    iosStyle.height = 55;
    iosStyle.paddingTop = 5;
  } else if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
    iosStyle.height = 60;
    iosLabelStyle.paddingBottom = 5;
  }
  return (<DefaultTabBar
      {...props}
      activeTintColor={styles.theme.tint.color}
      indicatorStyle={styles.theme.indicatorStyle}
      inactiveTintColor={colors.light.gray2}
      showIcon={true}
      showLabel={true}
      upperCaseLabel={false}
      style={[styles.style, styles.theme.style, iosStyle]}
      allowFontScaling={false}
      labelStyle={[{ fontSize: 12 }, iosLabelStyle]}
    />
  );
}, getStyles());
