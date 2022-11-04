import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    progressContainer: {
      zIndex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: boxes.boxPadding,
    },
    activeStep: {
      backgroundColor: colors.light.ultramarineBlue,
    },
    progressTitleContainer: {
      width: 16,
      height: 16,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressTitle: {
      color: colors.light.white,
      fontSize: 10,
      fontWeight: '500',
    },
    progressStepContainer: {
      flex: 1,
      height: 2,
    },
  },

  [themes.light]: {
    progressStepContainer: {
      backgroundColor: colors.light.ghost,
    },
    progressTitleContainer: {
      backgroundColor: colors.light.ghost,
    },
  },

  [themes.dark]: {
    progressStepContainer: {
      backgroundColor: colors.dark.slateGray,
    },
    progressTitleContainer: {
      backgroundColor: colors.dark.slateGray,
    },
  },
});
