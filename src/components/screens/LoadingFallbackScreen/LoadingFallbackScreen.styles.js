import { colors, boxes } from 'constants/styleGuide';

export function getLoadingFallbackScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
        backgroundColor: colors.light.ultramarineBlue,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
        alignItems: 'center',
        justifyContent: 'center',
      },
      animationContainer: {
        position: 'absolute',
        bottom: 40,
      },
      animation: {
        width: 80,
        height: 80,
      },
    },
  };
}
