import { themes, colors } from 'constants/styleGuide';

export default function getBlockchainApplicationsExplorerStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        paddingTop: 44,
      },
      statsModal: {
        height: 500,
        zIndex: 2,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
      statsModalCloseButton: {
        position: 'absolute',
        right: 12,
        top: 24,
        zIndex: 1,
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
