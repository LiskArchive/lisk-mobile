import { colors, themes } from 'constants/styleGuide';

export default function getCreateAccountStyles() {
  return {
    common: {
      container: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      question: {
        color: colors.light.slateGray,
        textAlign: 'center',
        marginRight: 4,
        marginBottom: 5,
      },
      link: {
        textAlign: 'center',
      },
    },
    [themes.light]: {
      question: {
        color: colors.light.zodiacBlue,
      },
      link: {
        color: colors.light.ultramarineBlue,
      },
    },
    [themes.dark]: {
      question: {
        color: colors.dark.white,
      },
      link: {
        color: colors.light.ultramarineBlue,
      },
    },
  };
}
