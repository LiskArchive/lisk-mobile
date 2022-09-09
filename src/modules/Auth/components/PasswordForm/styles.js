import { Dimensions } from 'react-native'
import { themes, colors, boxes } from 'constants/styleGuide'

const { height } = Dimensions.get('screen')

export default () => ({
  common: {
    container: {
      flex: 1,
      padding: boxes.boxPadding,
      paddingTop: height / 4,
    },
    content: {
      flex: 1,
      alignItems: 'center',
    },
    address: {
      fontSize: 14,
    },
    inputContainer: {
      borderColor: colors.light.platinumGray,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    address: {
      color: colors.light.silverGrey,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    address: {
      color: colors.light.whiteSmoke,
    },
  },
})
