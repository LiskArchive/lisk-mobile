import { Dimensions } from 'react-native';

import { themes, colors, boxes } from 'constants/styleGuide';

const { width } = Dimensions.get('window');

export default function getSliderSlideStyles() {
  return {
    common: {
      container: {
        width,
        alignItems: 'center',
        padding: boxes.boxPadding,
      },
      header: {
        alignItems: 'center',
        marginBottom: 24,
      },
      body: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        textAlign: 'center',
      },
      description: {
        marginTop: 12,
        textAlign: 'center',
      },
    },
    [themes.light]: {
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.smoothGray,
      },
    },
    [themes.dark]: {
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.light.smoothGray,
      },
    },
  };
}
