import { Platform } from 'react-native';
import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    back: {
      width: 60,
      height: 40,
      marginTop: (Platform.OS === 'ios') ? 0 : 6,
    },
    multiStepWrapper: {
      height: '100%',
    },
    progressContainer: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: 4,
      backgroundColor: 'transparent',
    },
    progress: {
      height: '100%',
    },
  },

  [themes.light]: {
    progressContainer: {
      backgroundColor: colors.light.white,
    },
  },

  [themes.dark]: {
    progressContainer: {
      backgroundColor: colors.dark.screenBgNavy,
    },
  },
});
