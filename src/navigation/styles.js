import { Dimensions, Platform } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { colors, fonts } from 'constants/styleGuide';

export function getNavigationTabBarStyles() {
  const deviceWidth = Dimensions.get('window').width;
  const width = deviceWidth - 44;
  const left = deviceWidth / 2 - width / 2;
  const paddingTop = Platform.OS === 'android' ? 0 : 28;

  return {
    position: 'absolute',
    width,
    left,
    backgroundColor: colors.light.ultramarineBlue,
    bottom: 24,
    borderRadius: 64,
    height: 64,
    paddingTop,
  };
}

export const navigationDarkTabsStyle = {
  ...DarkTheme,
  primary: colors.dark.ultramarineBlue,
  background: colors.light.white,
  card: colors.light.white,
  text: colors.light.tabBarText,
  border: 'transparent',
};

export const navigationLightTabsStyle = {
  ...DefaultTheme,
  primary: colors.light.ultramarineBlue,
  background: colors.dark.white,
  card: colors.dark.black,
  text: colors.dark.tabBarText,
  border: 'transparent',
};

export const navigationNoShadowStyle = {
  borderBottomWidth: 0,
  elevation: 0,
};

export const navigationGenericTitleStyle = {
  fontFamily: fonts.family.heading,
  fontSize: 20,
};
