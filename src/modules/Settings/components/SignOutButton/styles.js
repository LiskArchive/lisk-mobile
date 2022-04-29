import { themes, colors } from 'constants/styleGuide';

export default () => ({
  common: {
    button: {
      width: '100%',
      paddingRight: 20,
      borderWidth: 0,
      paddingLeft: 0,
    },
    title: {
      paddingLeft: 10,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'left',
    },
  },

  [themes.light]: {
    title: {
      color: colors.light.ultramarineBlue,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.ultramarineBlue,
    },
  },
});
