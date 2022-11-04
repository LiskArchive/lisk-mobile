import { colors, themes, boxes } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flex: 1,
    },
    title: {
      textAlign: 'center',
      marginBottom: 16,
    },
    urlContainer: {
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    url: {
      color: colors.light.ultramarineBlue,
    },
    footer: {
      paddingTop: boxes.boxPadding,
      paddingBottom: boxes.boxPadding,
    },
    button: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 4,
    },
    buttonText: {
      color: colors.light.ultramarineBlue,
    },
    icon: {
      width: 30,
    },
    outline: {
      borderWidth: 1,
      borderRadius: 10,
      minHeight: 50,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.dark.white,
    },
    outline: {
      borderColor: colors.light.platinumGray,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    remove: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
    },
    outline: {
      borderColor: colors.light.volcanicSand,
    },
    title: {
      color: colors.dark.white,
    },
    remove: {
      color: colors.light.white,
    },
  },
};
