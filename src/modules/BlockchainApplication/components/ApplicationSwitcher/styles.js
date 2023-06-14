import { themes, colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    switcherContainer: {
      alignItems: 'center',
    },
    container: {
      overflow: 'hidden',
      borderWidth: 1,
      borderRadius: 50,
      padding: 5,
    },
    iconContainer: {
      marginRight: 10,
    },
    switch: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    avatar: {
      marginHorizontal: 8,
      height: 30,
      width: 30,
      borderRadius: 15,
    },
    appName: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.small,
      marginRight: 10,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
      borderColor: colors.light.platinumGray,
    },
    appName: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
      borderColor: colors.dark.volcanicSand,
    },
    appName: {
      color: colors.dark.white,
    },
  },
};
