import { themes, colors } from 'constants/styleGuide';
import { Dimensions } from 'react-native';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    container: {
      padding: 20,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
    },
    safeArea: {
      flexGrow: 1,
      marginTop: 30,
      maxHeight: Dimensions.get('screen').height * 0.75,
    },
    content: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    overlay: {
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
      backgroundColor: setColorOpacity(colors.light.black, 0.5),
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
      backgroundColor: setColorOpacity(colors.dark.volcanicSand, 0.5),
    },
  },
});
