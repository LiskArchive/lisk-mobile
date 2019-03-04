import { themes, colors, fonts, boxes } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      marginTop: 4,
      padding: boxes.boxPadding,
    },

    label: {
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },

    container: {
      marginTop: 12,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    item: {
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
      position: 'relative',
    },

    selectedItem: {
      backgroundColor: colors.light.btc,
    },

    itemLabel: {
      fontFamily: fonts.family.contextSemiBold,
      fontSize: fonts.size.small,
      paddingBottom: 3,
    },

    selectedItemLabel: {
      color: colors.light.white,
    },

    itemValue: {
      fontSize: fonts.size.small - 2,
    },

    selectedItemValue: {
      color: colors.light.white,
    },

    separator: {
      position: 'absolute',
      right: -1,
      top: 14,
      width: 1,
      height: 26,
    },
  },

  [themes.light]: {
    container: {
      borderColor: colors.light.gray5,
    },

    separator: {
      backgroundColor: colors.light.gray5,
    },
  },

  [themes.dark]: {
    label: {
      color: colors.dark.gray4,
    },

    container: {
      borderColor: colors.dark.gray5,
    },

    itemLabel: {
      color: colors.dark.white,
    },

    itemValue: {
      color: colors.dark.white,
    },

    separator: {
      backgroundColor: colors.dark.gray5,
    },
  },
});
