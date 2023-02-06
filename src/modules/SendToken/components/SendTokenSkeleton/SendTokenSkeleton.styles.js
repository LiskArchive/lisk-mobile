import { boxes } from 'constants/styleGuide';

export function getSendTokenSkeletonStyles() {
  return {
    common: {
      container: {
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
      },
      progressBarContainer: {
        width: '100%',
        marginBottom: 40,
      },
      fieldLabelContainer: {
        marginBottom: 8,
      },
      fieldInputContainer: {
        width: '100%',
        marginBottom: 24,
      },
    },
  };
}
