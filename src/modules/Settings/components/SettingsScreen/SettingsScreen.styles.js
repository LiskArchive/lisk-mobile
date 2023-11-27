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
    itemNoBorder: {
      borderBottomColor: 'transparent',
    },
    signOut: {
      marginBottom: 40,
    },
    derivationPathInput: {
      marginTop: 16,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoToggler: {
      marginLeft: 8,
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
    targetStateLabel: {
      color: colors.light.slateGray,
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
    targetStateLabel: {
      color: colors.dark.slateGray,
    },
  },
});
