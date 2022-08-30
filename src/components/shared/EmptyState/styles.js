import { themes, colors } from 'constants/styleGuide';

export default function getEmptyStateStyles() {
  return {
    common: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
      messageText: {
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center'
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      messageText: {
        color: colors.light.slateGray,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      messageText: {
        color: colors.dark.slateGray,
      },
    },
  };
}
