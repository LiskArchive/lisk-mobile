import { colors, themes } from 'constants/styleGuide'
import { setColorOpacity } from 'utilities/helpers'

export default {
  common: {
    flex: {
      flex: 1,
    },
    rightContent: {
      alignItems: 'flex-end',
    },
    tokenTitle: {
      marginLeft: 10,
    },
    row: {
      flexDirection: 'row',
    },
    alignCenter: {
      alignItems: 'center',
    },
    viewIcon: {
      marginLeft: 5,
    },
    tokenContainer: {
      margin: 10,
      marginTop: 20,
    },
    tokenItem: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      borderColor: colors.light.platinumGray,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    tokenTitle: {
      color: colors.light.zodiacBlue,
    },
    currency: {
      color: setColorOpacity(colors.light.zodiacBlue, 0.7),
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    tokenTitle: {
      color: colors.dark.white,
    },
    currency: {
      color: setColorOpacity(colors.light.white, 0.7),
    },
  },
}
