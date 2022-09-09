import { themes, colors, boxes } from 'constants/styleGuide'
import { setColorOpacity } from 'utilities/helpers'

export default () => ({
  common: {
    container: {
      flex: 1,
      padding: boxes.boxPadding,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 3,
      paddingRight: 3,
      borderBottomWidth: 1,
    },
    itemSelection: {
      marginLeft: 'auto',
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    itemContainer: {
      borderBottomColor: colors.light.mystic,
    },
    itemLabel: {
      color: colors.light.black,
    },
    itemSelection: {
      color: colors.light.black,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    header: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: setColorOpacity(colors.dark.white, 0.24),
    },
    itemLabel: {
      color: colors.dark.white,
    },
    itemSelection: {
      color: colors.dark.white,
    },
  },
})
