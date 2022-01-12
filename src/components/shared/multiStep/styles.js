import { colors, themes } from '../../../constants/styleGuide';
import { deviceType } from '../../../utilities/device';

const type = deviceType();
let safeAreaMarginTop = type === 'iOSx' ? 50 : 20;

if (type === 'android') {
  safeAreaMarginTop = 0;
}

export default () => ({
  common: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: safeAreaMarginTop,
      paddingRight: 20,
    },
  },
  [themes.light]: {
    step: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    step: {
      color: colors.dark.white,
    },
  },
});
