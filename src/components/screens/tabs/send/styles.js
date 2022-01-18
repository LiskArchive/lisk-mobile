import { Platform } from 'react-native';
import { colors, themes } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    back: {
      width: 60,
      height: 40,
      marginTop: Platform.OS === 'ios' ? 0 : 6
    },
    multiSigContainer: {
      padding: 20,
      alignItems: 'center',
      flex: 1,
    },
    multiStepWrapper: {
      height: '100%'
    },
    button: {
      textAlign: 'center'
    },
    illustrationWrapper: {
      padding: 20
    },
    navContainer: {
      paddingTop: 20
    },
    buttonContainer: {
      padding: 10,
      marginTop: 10,
    }
  },
  [themes.light]: {
    multiSigContainer: {
      backgroundColor: colors.light.white
    },
    button: {
      color: colors.light.ultramarineBlue
    },
    copy: {
      color: colors.light.zodiacBlue
    },
  },
  [themes.dark]: {
    multiSigContainer: {
      backgroundColor: colors.light.black
    },
    button: {
      color: colors.light.ultramarineBlue
    },
    copy: {
      color: colors.light.white
    },
  }
});
