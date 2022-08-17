import {
  themes, colors, boxes
} from 'constants/styleGuide';
import {
  deviceWidth,
} from 'utilities/device';

export default () => ({
  common: {
    wrapper: {
      height: deviceWidth(),
      zIndex: 3,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: boxes.boxPadding,
    },
    closeButtonContainer: {
      alignSelf: 'flex-end',
      marginTop: -20,
      padding: 10,
      borderRadius: 50,
    },
    horizontalLine: {
      height: 8,
      width: 60,
      borderRadius: 40,
      marginTop: 40,
    }
  },

  [themes.light]: {
    wrapper: {
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
    wrapper: {
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
