import { colors } from 'constants/styleGuide';
import { Dimensions } from 'react-native';

export const navigationTabBarStyle = {
  position: 'absolute',
  backgroundColor: colors.light.ultramarineBlue,
  bottom: 24,
  borderRadius: 64,
  width: 320,
  height: 64,
  paddingTop: 28,
  margin: 'auto',
  alignSelf: 'center',
  left: (Dimensions.get('window').width / 2) - 160,
};
