import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: boxes.boxPadding,
      paddingVertical: 30,
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: 10,
    },
    illustration: {
      marginBottom: 10,
    },
    label: {
      fontFamily: fonts.family.contextSemiBold,
      fontSize: fonts.size.h4,
      padding: 5,
    },
  },

  [themes.light]: {
    container: {
      borderColor: colors.light.platinumGray,
    },
    wrapper: {
      backgroundColor: colors.light.white,
    },
    label: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    container: {
      borderColor: colors.light.volcanicSand,
    },
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    label: {
      color: colors.dark.ghost,
    },
  },
});
