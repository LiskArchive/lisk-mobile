import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export function getErrorFallbackScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      illustration: {
        marginBottom: 16,
      },
      title: {
        fontSize: fonts.size.base,
        marginBottom: 8,
      },
      description: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.input,
        textAlign: 'center',
        marginBottom: 8,
      },
      label: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.input,
        marginTop: boxes.boxPadding,
        marginBottom: 4,
        color: colors.light.blueGray,
      },
      submitButton: {
        width: '100%',
        marginTop: 32,
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
