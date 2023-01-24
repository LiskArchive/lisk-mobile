import { colors, boxes } from 'constants/styleGuide';
import { Dimensions } from 'react-native';

export function getLoadingFallbackScreenStyles() {
  const deviceWidth = Dimensions.get('window').width;
  const left = deviceWidth / 2 - 88;

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
      illustration: {
        position: 'absolute',
        left,
        bottom: 88,
      },
    },
  };
}
