import { themes, colors, boxes } from 'constants/styleGuide';

export default function getRegisterSuccessStyle() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: boxes.boxPadding,
      },
      title: {
        textAlign: 'center',
      },
      description: {
        textAlign: 'center',
        marginBottom: 24,
      },
      illustration: {
        marginTop: 32,
      },
      footer: {
        padding: boxes.boxPadding,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.white,
      },
    },
  };
}
