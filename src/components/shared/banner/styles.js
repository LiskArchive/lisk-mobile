import { themes, colors } from 'constants/styleGuide'

export default () => ({
  common: {
    container: {
      padding: 20,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: 1000,
    },
    flex: {
      flex: 1,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.inkBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.inkBlue,
    },
  },
})
