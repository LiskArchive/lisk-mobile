import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getNotFoundStyles() {
  return {
    common: {
      container: {
        flex: 1,
        paddingTop: boxes.boxPadding,
        paddingBottom: boxes.boxPadding,
      },
      title: {
        fontSize: fonts.size.h1,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 10,
      },
      description: {
        fontSize: fonts.size.input,
        textAlign: 'justify',
        lineHeight: 24,
      },
      button: {
        marginTop: 20,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      description: {
        color: colors.light.smoothGray,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      description: {
        color: colors.light.white,
      },
      title: {
        color: colors.light.white,
      },
    },
  };
}
