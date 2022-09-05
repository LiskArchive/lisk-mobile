import {
  themes, colors
} from 'constants/styleGuide';
import {
  deviceWidth,
} from 'utilities/device';

export default () => ({
  common: {
    container: {
      height: deviceWidth(),
      zIndex: 3,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 16,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonContainer: {
      alignSelf: 'flex-end',
      marginTop: -8,
      padding: 4,
      borderRadius: 50,
    },
    horizontalLine: {
      height: 4,
      width: 34,
      borderRadius: 40,
      marginTop: 4,
    }
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    horizontalLine: {
      backgroundColor: colors.light.silverGrey
    },
    closeButtonContainer: {
      backgroundColor: colors.light.platinumGray,
    }
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    horizontalLine: {
      backgroundColor: colors.dark.volcanicSand
    },
    closeButtonContainer: {
      backgroundColor: colors.dark.volcanicSand,
    }
  },
});
