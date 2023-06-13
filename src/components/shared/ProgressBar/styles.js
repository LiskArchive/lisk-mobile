import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      zIndex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: boxes.boxPadding,
    },
    bulletContainer: {
      height: 24,
      width: 24,
      alignItems: 'center',
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    activeRail: {
      backgroundColor: colors.light.ultramarineBlue,
    },
    activeBullet: {
      backgroundColor: colors.light.ultramarineBlue,
      width: 24,
      height: 24,
    },
    bullet: {
      width: 8,
      height: 8,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressTitle: {
      color: colors.light.white,
      fontSize: 12,
      fontWeight: '500',
    },
    rail: {
      flex: 1,
      height: 1,
    },
  },

  [themes.light]: {
    rail: {
      backgroundColor: colors.light.silverGrey,
    },
    bullet: {
      backgroundColor: colors.light.silverGrey,
    },
  },

  [themes.dark]: {
    rail: {
      backgroundColor: colors.dark.slateGray,
    },
    bullet: {
      backgroundColor: colors.dark.slateGray,
    },
  },
});
