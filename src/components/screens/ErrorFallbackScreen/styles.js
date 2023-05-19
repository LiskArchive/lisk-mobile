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
        paddingVertical: 16,
        marginBottom: 16,
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
      description: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      description: {
        color: colors.dark.ghost,
      },
    },
  };
}
