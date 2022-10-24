import { themes, boxes, colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    container: {
      paddingTop: boxes.boxPadding,
      paddingBottom: boxes.boxPadding,
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      marginBottom: 8,
      borderRadius: 25,
    },
    title: {
      textAlign: 'center',
      marginBottom: 8,
    },
    urlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    url: {
      marginLeft: 4,
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold,
    },
    label: {
      color: colors.light.blueGray,
      marginRight: 4,
    },
    accountsLabel: {
      marginBottom: 16,
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
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      marginHorizontal: 4,
    },
    accountItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    accountContent: {
      paddingLeft: 8,
    },
    address: {
      color: colors.light.sparkleGray,
      fontSize: fonts.size.input,
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.white,
    },
  },
};
