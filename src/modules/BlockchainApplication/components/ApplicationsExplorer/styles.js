import { themes, colors } from 'constants/styleGuide';

export default function getBlockchainApplicationsExplorerStyles() {
  return {
    common: {
      message: {
        padding: 20
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
      message: {
        color: colors.light.zodiacBlue
      }
    },

    [themes.dark]: {
      message: {
        color: colors.dark.white
      }
    },
  };
}
