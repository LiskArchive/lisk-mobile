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
    form: {
      marginTop: 5,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
  },
});
