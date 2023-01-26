import { themes, colors } from 'constants/styleGuide';

export function getSkeletonStyles({ width, height, variant }) {
  return {
    common: {
      container: {
        width,
        height: variant === 'circle' ? width : height,
        overflow: 'hidden',
      },
      animation: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      rectangleContainer: {
        borderRadius: 8,
      },
      circleContainer: {
        borderRadius: '50%',
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.platinumGray,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.textInputBg,
      },
    },
  };
}
