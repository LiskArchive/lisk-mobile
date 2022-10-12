import { themes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    container: {
      zIndex: 3,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 16,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    content: {
      flex: 1,
      justifyContent: 'flex-end',
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
      alignSelf: 'center',
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    horizontalLine: {
      backgroundColor: colors.light.silverGrey,
    },
    closeButtonContainer: {
      backgroundColor: colors.light.platinumGray,
    },
    overlay: {
      backgroundColor: setColorOpacity(colors.light.black, 0.7),
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    horizontalLine: {
      backgroundColor: colors.dark.volcanicSand,
    },
    closeButtonContainer: {
      backgroundColor: colors.dark.volcanicSand,
    },
    overlay: {
      backgroundColor: setColorOpacity(colors.dark.volcanicSand, 0.7),
    },
  },
});
