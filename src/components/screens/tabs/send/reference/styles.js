import { themes, colors } from '../../../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../../../utilities/device';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: deviceType() === 'android' ? tabBarHeight() : 0,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
      paddingRight: 35,
      height: 48,
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
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
  },
});
