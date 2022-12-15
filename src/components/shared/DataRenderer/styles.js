import { themes, colors, fonts } from 'constants/styleGuide';

export default function getDataRendererStyles() {
  return {
    common: {
      text: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
      },
      errorText: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
      },
    },
    [themes.light]: {
      text: {
        color: colors.light.zodiacBlue,
      },
      errorText: {
        color: colors.light.burntSieanna,
      },
    },
    [themes.dark]: {
      text: {
        color: colors.light.whiteSmoke,
      },
      errorText: {
        color: colors.light.burntSieanna,
      },
    },
  };
}
