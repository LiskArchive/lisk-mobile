import {
  colors, themes, boxes, fonts
} from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      padding: boxes.boxPadding,
    },
    description: {
      flex: 1,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
    },
    formContainer: {
      paddingTop: 10
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    input: {
      fontFamily: fonts.family.context
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: boxes.boxPadding,
    },
    switch: {
      paddingRight: 10,
    },
    actionText: {
      fontFamily: fonts.family.context,
      fontSize: 14,
      flex: 1
    }
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black
    },
    description: {
      color: colors.dark.ghost,
    },
  },
});
