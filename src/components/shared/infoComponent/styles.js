import { themes, colors } from 'constants/styleGuide'
import { setColorOpacity } from 'utilities/helpers'

export default () => ({
  common: {
    container: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
    },
    description: {
      paddingHorizontal: 10,
      flex: 1,
    },
    copy: {
      fontSize: 15,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.1),
      borderColor: setColorOpacity(colors.light.ultramarineBlue, 0.5),
    },
    copy: {
      color: colors.light.zodiacBlue,
    },
    button: {
      color: colors.light.ultramarineBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.2),
      borderColor: setColorOpacity(colors.light.ultramarineBlue, 0.5),
    },
    copy: {
      color: colors.dark.white,
    },
    button: {
      color: colors.light.ultramarineBlue,
    },
  },
})
