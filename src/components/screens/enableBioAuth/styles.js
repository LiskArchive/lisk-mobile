import { deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { themes, colors, boxes, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      backgroundColor: colors.light.white,
    },
    container: {
      flexDirection: 'column',
      flex: 1,
      padding: boxes.boxPadding,
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    subHeader: {
      marginBottom: boxes.boxPadding,
      fontFamily: fonts.family.context,
    },
    row: {
      flexDirection: 'row',
      paddingRight: 50,
      marginBottom: isSmallScreen ? 8 : 10,
      paddingBottom: isSmallScreen ? 12 : 14,
    },
    separator: {
      borderBottomWidth: 1,
    },
    rowTitle: {
      marginTop: 5,
    },
    iconWrapper: {
      height: 36,
      borderRadius: 50,
      marginRight: 12,
      marginTop: 10,
    },
    description: {
      marginTop: 5,
    },
    label: {
      marginLeft: 12,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    subHeader: {
      color: colors.light.slateGray,
    },
    separator: {
      borderBottomColor: colors.light.mystic,
    },
    rowTitle: {
      color: colors.light.maastrichtBlue,
    },
    description: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    subHeader: {
      color: colors.dark.slateGray,
    },
    separator: {
      borderBottomColor: setColorOpacity(colors.dark.white, 0.24),
    },
    rowTitle: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.platinum,
    },
  },
});
