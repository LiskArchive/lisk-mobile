import { themes, colors } from '../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (deviceType() === 'android' ? tabBarHeight() : 0) + 24,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
      paddingRight: 35,
    },
    inputContainer: {
      position: 'relative',
    },
    circularProgress: {
      position: 'absolute',
      top: 66,
      right: 30,
      width: 20,
      height: 20,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    label: {
      color: colors.light.gray1,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
  },
});
