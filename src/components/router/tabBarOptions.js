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
  [themes.light]: {
    style: {
      backgroundColor: colors.light.tabBarBg,
      borderTopColor: colors.light.gray5,
    },
    inactiveTint: {
      color: colors.dark.gray2,
    },
    tint: {
      color: colors.light.blue,
    },
    indicatorStyle: {
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    style: {
      backgroundColor: colors.dark.tabBarBg,
      borderTopColor: colors.dark.tabBarBg,
    },
    inactiveTint: {
      color: colors.dark.gray2,
    },
    tint: {
      color: colors.dark.white,
    },
    indicatorStyle: {
      backgroundColor: colors.dark.tabBarBg,
    },
  },
});

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

  return (<DefaultTabBar
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
