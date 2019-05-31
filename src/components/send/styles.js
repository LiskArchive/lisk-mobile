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
      height: 2,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressStep: {
      height: '100%',
      backgroundColor: colors.light.ultramarineBlue,
    },
  },

  [themes.light]: {
    progressStepContainer: {
      backgroundColor: colors.light.ghost,
    },
  },

  [themes.dark]: {
    progressStepContainer: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
  },
});
