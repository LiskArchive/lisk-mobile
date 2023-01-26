import { themes, colors, fonts } from 'constants/styleGuide';

export default function getStyles() {
  return {
    common: {
      container: { flexDirection: 'row', flex: 1, padding: 5, marginLeft: 10 },
      text: {
        fontFamily: fonts.family.regular,
        fontSize: fonts.size.small,
      },
      flex: {
        flex: 1,
      },
    },
    [themes.light]: {
      text: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      text: {
        color: colors.dark.white,
      },
    },
  };
}
