import { themes, colors, fonts } from 'constants/styleGuide'

export default () => ({
  common: {
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: colors.light.platinumGray,
      paddingVertical: 10,
      alignItems: 'center',
    },
    avatar: {
      marginRight: 15,
    },
    username: {
      fontFamily: fonts.family.contextSemiBold,
      marginBottom: 5,
      fontSize: fonts.size.base,
    },
    address: {
      fontSize: 14,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    username: {
      color: colors.light.zodiacBlue,
    },
    address: {
      color: colors.light.blueGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    username: {
      color: colors.dark.white,
    },
    address: {
      color: colors.light.whiteSmoke,
    },
  },
})
