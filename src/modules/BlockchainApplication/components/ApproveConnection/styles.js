import { themes, boxes, colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
    },
    itemsContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    urlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    url: {
      marginLeft: 4,
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold,
      fontSize: 14,
    },
    label: {
      fontSize: 14,
      marginRight: 4,
      marginBottom: 8,
    },
    descriptionLabel: {
      marginBottom: 12,
    },
    subTitle: {
      fontFamily: fonts.family.contextSemiBold,
      marginBottom: 4,
    },
    permissions: {
      color: colors.light.blueGray,
    },
    horizontalLine: {
      borderBottomColor: colors.light.platinumGray,
      borderBottomWidth: 1,
      marginTop: boxes.boxPadding,
      marginBottom: boxes.boxPadding,
    },
    buttonLeft: {
      flex: 1,
      marginRight: 8,
    },
    buttonRight: {
      flex: 1,
      marginLeft: 8,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    itemBody: {
      marginLeft: 8,
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: '600',
    },
    itemSubtitle: {
      fontSize: 10,
    },
    itemImage: {
      height: 24,
      width: 24,
      borderRadius: 25,
      borderColor: colors.light.platinumGray,
      borderWidth: 1,
    },
    footer: {
      flexDirection: 'row',
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
    label: {
      color: colors.light.smoothGray,
    },
    itemTitle: {
      color: colors.light.zodiacBlue,
    },
    itemSubtitle: {
      color: colors.light.smoothGray,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.white,
    },
    label: {
      color: colors.dark.smoothGray,
    },
    itemTitle: {
      color: colors.dark.white,
    },
    itemSubtitle: {
      color: colors.dark.smoothGray,
    },
  },
};
