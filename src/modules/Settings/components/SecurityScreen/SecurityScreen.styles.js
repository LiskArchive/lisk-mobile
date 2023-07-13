import { themes, colors, boxes, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    innerContainer: {
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    group: {
      marginBottom: 20,
    },
    itemTitle: {
      fontSize: fonts.size.input,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    item: {
      borderBottomWidth: 1,
      paddingTop: 14,
      paddingBottom: 14,
      minHeight: 36,
    },
  },

  [themes.light]: {
    itemTitle: {
      color: colors.light.maastrichtBlue,
    },
    subtitle: {
      color: colors.light.zodiacBlue,
    },
    item: {
      borderBottomColor: colors.light.mystic,
    },
    container: {
      backgroundColor: colors.light.white,
    },
  },

  [themes.dark]: {
    itemTitle: {
      color: colors.dark.platinum,
    },
    subtitle: {
      color: colors.dark.white,
    },
    item: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
    },
    container: {
      backgroundColor: colors.dark.mainBg,
    },
  },
});
