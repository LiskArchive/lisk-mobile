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
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
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
      fontFamily: fonts.family.contextSemiBold,
      fontSize: fonts.size.small,
    },

    selectedItemLabel: {
      color: colors.light.white,
    },
  },

  [themes.light]: {
    container: {
      borderColor: colors.light.sendBalanceBg,
    },

    value: {
      color: colors.light.black,
    },

    itemLabel: {
      color: colors.light.gray1,
    },
  },

  [themes.dark]: {
    container: {
      borderColor: colors.dark.sendBalanceBg,
    },

    label: {
      color: colors.dark.gray4,
    },

    value: {
      color: colors.dark.white,
    },

    itemLabel: {
      color: colors.dark.gray1,
    },
  },
});
