import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    progressContainer: {
      zIndex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: boxes.boxPadding
    },
    activeStep: {
      backgroundColor: colors.light.ufoGreen,
    },
    progressTitleContainer: {
      backgroundColor: colors.light.ufoGreen,
      width: 25,
      height: 25,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    progressTitle: {
      color: colors.light.white,
    },
    progressStepContainer: {
      flex: 1,
      height: 2,
    }
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
