import { deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { themes, colors, fonts } from 'constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default () => ({
  common: {
    heading: {
      textAlign: 'center',
      fontSize: fonts.size.h3,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      paddingRight: 50,
      marginBottom: isSmallScreen ? 8 : 10,
      paddingBottom: isSmallScreen ? 12 : 14,
    },
    rowTitle: {
      marginTop: 5,
    },
    description: {
      marginTop: 5,
      textAlign: 'center',
      marginBottom: 20,
    },
  },

  [themes.light]: {
    rowTitle: {
      color: colors.light.maastrichtBlue,
    },
    description: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    rowTitle: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.platinum,
    },
  },
});
