import { Dimensions, Platform } from 'react-native';

import { colors } from 'constants/styleGuide';

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
