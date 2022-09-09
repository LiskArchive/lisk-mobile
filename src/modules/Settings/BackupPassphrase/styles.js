import { themes, colors } from 'constants/styleGuide'

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
  },
})
