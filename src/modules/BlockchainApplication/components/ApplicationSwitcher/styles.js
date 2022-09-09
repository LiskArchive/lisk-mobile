import { themes, colors, fonts } from 'constants/styleGuide'

export default {
  common: {
    switcherContainer: {
      alignItems: 'center',
    },
    container: {
      overflow: 'hidden',
      borderWidth: 2,
      borderRadius: 50,
      borderColor: colors.light.silverGrey,
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
    },
    appName: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    appName: {
      color: colors.dark.white,
    },
  },
}
