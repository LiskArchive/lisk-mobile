import { themes, colors } from 'constants/styleGuide';

export default () => ({
  common: {
    progressContainer: {
      zIndex: 1,
      width: '100%',
      height: 2,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressStep: {
      height: '100%',
      backgroundColor: colors.light.ultramarineBlue,
    },
  },

  [themes.light]: {
    progressStepContainer: {
      backgroundColor: colors.light.ghost,
    },
  },

  [themes.dark]: {
    progressStepContainer: {
      backgroundColor: colors.dark.slateGray,
    },
  },
});
