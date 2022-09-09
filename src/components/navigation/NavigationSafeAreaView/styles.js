import { themes, colors } from 'constants/styleGuide'

export default function getNavigationSafeAreaViewStyles(tabBarHeight) {
  return {
    common: {
      container: {
        flex: 1,
        paddingBottom: tabBarHeight,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
    },
  }
}
