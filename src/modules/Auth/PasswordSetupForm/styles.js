import { colors, themes, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    description: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
      marginTop: 16,
      marginBottom: 8,
    },
    formContainer: {
      paddingTop: 8,
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: 16,
    },
    input: {
      fontFamily: fonts.family.context,
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: boxes.boxPadding,
    },
    switch: {
      paddingRight: 8,
    },
    actionText: {
      flex: 1,
      fontFamily: fonts.family.context,
      fontSize: 14,
    },
    footer: {
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black,
    },
    description: {
      color: colors.dark.ghost,
    },
  },
});
