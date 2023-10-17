import { themes, colors } from 'constants/styleGuide';

export default function getRequestTokenSelectFieldStyles() {
  return {
    common: {
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        height: 24,
        width: 24,
        borderRadius: 16,
        marginLeft: 8,
      },
      primaryText: {
        color: colors.light.ultramarineBlue,
      },
      text: {
        fontSize: 16,
      },
      skeleton: {
        marginBottom: 16,
      },
    },
    [themes.light]: {
      text: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      text: {
        color: colors.light.whiteSmoke,
      },
    },
  };
}
