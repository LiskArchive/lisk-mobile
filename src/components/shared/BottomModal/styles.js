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
    closeButton: {
      alignSelf: 'flex-end',
      marginTop: -20,
      padding: 10,
      backgroundColor: colors.light.platinumGray,
      borderRadius: 50,
    },
    horizontalLine: {
      height: 8,
      width: 60,
      borderRadius: 40,
      marginTop: 40,
      backgroundColor: colors.light.silverGrey
    }
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
