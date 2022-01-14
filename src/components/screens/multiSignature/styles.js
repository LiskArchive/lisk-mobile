import { themes, colors, fonts } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      padding: 20
    },
    copy: {
      fontSize: fonts.size.base,
      marginBottom: 10,
    }
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
      flex: 1,
    },
    copy: {
      color: colors.light.zodiacBlue
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
      flex: 1,
    },
    copy: {
      color: colors.dark.white
    }
  }
});
