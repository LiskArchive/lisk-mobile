import { themes, colors, boxes, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    innerContainer: {
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    group: {
      marginBottom: 20,
    },
    subHeader: {
      marginBottom: 8,
    },
    item: {
      borderBottomWidth: 1,
      paddingTop: 14,
      paddingBottom: 14,
      minHeight: 36,
    },
    itemNoBorder: {
      borderBottomColor: 'transparent',
    },
    signOut: {
      marginBottom: 40,
    },
    subtitle: {
      fontSize: fonts.size.base,
    },
  },

  [themes.light]: {
    subtitle: {
      color: colors.light.zodiacBlue,
    },
    subHeader: {
      color: colors.light.maastrichtBlue,
    },
    item: {
      borderBottomColor: colors.light.mystic,
    },
    targetStateLabel: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    subtitle: {
      color: colors.dark.white,
    },
    subHeader: {
      color: colors.dark.white,
    },
    item: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
    },
    targetStateLabel: {
      color: colors.dark.slateGray,
    },
  },
});
