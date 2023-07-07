import { themes, boxes, colors } from 'constants/styleGuide';

export default function getPasswordSetupSuccessStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        flex: 1,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
        alignItems: 'center',
        justifyContent: 'center',
      },
      illustration: {
        marginBottom: 48,
      },
      title: {
        textAlign: 'center',
        marginBottom: 12,
      },
      description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
      },
      footer: {
        padding: boxes.boxPadding,
      },
      checkBox: {
        marginBottom: 24,
      },
      text: {
        color: colors.light.smoothGray,
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
        color: colors.light.smoothGray,
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
        color: colors.dark.mountainMist,
      },
    },
  };
}
