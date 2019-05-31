import { themes, colors, fonts, boxes } from '../../../../constants/styleGuide';

const itemBorderRadius = 2;

export default () => ({
  common: {
    wrapper: {
      marginTop: 4,
      padding: boxes.boxPadding,
    },

    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    label: {
      color: colors.light.slateGray,
      fontFamily: fonts.family.context,
    },

    value: {
      fontSize: fonts.size.small,
    },

    container: {
      marginTop: 12,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: itemBorderRadius,
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    loadingContainer: {
      width: '100%',
    },

    loadingDots: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 3,
    },

    loadingDot: {
      backgroundColor: colors.light.BTC,
      borderRadius: 50,
      width: 6,
      height: 6,
      margin: 2,
    },

    loadingText: {
      textAlign: 'center',
    },

    item: {
      paddingTop: 12,
      paddingBottom: 12,
      alignItems: 'center',
    },

    selectedItem: {
      backgroundColor: colors.light.BTC,
    },

    itemFirst: {
      borderBottomLeftRadius: itemBorderRadius,
      borderTopLeftRadius: itemBorderRadius,
    },

    itemLast: {
      borderBottomRightRadius: itemBorderRadius,
      borderTopRightRadius: itemBorderRadius,
    },

    itemLabel: {
      fontFamily: fonts.family.contextBold,
    },

    selectedItemLabel: {
      color: colors.light.white,
    },
  },

  [themes.light]: {
    container: {
      borderColor: colors.light.whiteSmoke,
    },

    loadingText: {
      color: colors.light.slateGray,
    },

    label: {
      color: colors.light.maastrichtBlue,
    },

    value: {
      color: colors.light.slateGray,
    },

    itemLabel: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    container: {
      borderColor: colors.light.slateGray,
    },

    loadingText: {
      color: colors.dark.slateGray,
    },

    label: {
      color: colors.light.ghost,
    },

    value: {
      color: colors.light.blueGray,
    },

    itemLabel: {
      color: colors.dark.slateGray,
    },
  },
});
