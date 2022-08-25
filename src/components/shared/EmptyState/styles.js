import { themes, colors } from 'constants/styleGuide';

export default function getEmptyStateStyles() {
  return {
    common: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      activityIndicator: {
        position: 'absolute',
        top: 0,
      },
      noActivity: {
        width: '100%',
        alignItems: 'center',
      },
      image: {
        width: 260,
        height: 129,
      },
      messageText: {
        marginTop: 16,
      },
    },
    [themes.light]: {
      emptyState: {
        backgroundColor: colors.light.white,
      },
      messageText: {
        color: colors.light.slateGray,
      },
    },
    [themes.dark]: {
      emptyState: {
        backgroundColor: colors.dark.mainBg,
      },
      messageText: {
        color: colors.dark.slateGray,
      },
    },
  };
}
