import { themes, colors } from 'constants/styleGuide';

export default function getAddApplicationStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        paddingTop: 44,
      },
      applicationsListContainer: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
    },

    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
    },
  };
}
