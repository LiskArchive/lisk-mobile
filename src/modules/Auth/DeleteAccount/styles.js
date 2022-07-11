import { colors, themes, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: boxes.boxPadding,
    },
    closeIcon: {
      alignSelf: 'flex-end',
      marginRight: 20,
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },
    button: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    icon: {
      width: 30
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.dark.white
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.black
    },
  },
});
