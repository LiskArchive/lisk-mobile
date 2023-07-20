import { Dimensions } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { colors, fonts } from 'constants/styleGuide';

export function getNavigationTabBarStyles(modalOpen) {
  const deviceWidth = Dimensions.get('window').width;
  const width = deviceWidth - 68;
  const left = deviceWidth / 2 - width / 2;

  return {
    display: modalOpen ? 'none' : 'flex',
    position: 'absolute',
    width,
    left,
    backgroundColor: colors.light.ultramarineBlue,
    bottom: 24,
    borderRadius: 64,
    height: 64,
    paddingBottom: 5,
  };
}

export const navigationDarkTabsStyle = {
  ...DarkTheme,
  primary: colors.dark.ultramarineBlue,
  background: 'transparent',
  card: colors.light.white,
  text: colors.light.tabBarText,
  border: 'transparent',
};

export const navigationLightTabsStyle = {
  ...DefaultTheme,
  primary: colors.light.ultramarineBlue,
  background: 'transparent',
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
