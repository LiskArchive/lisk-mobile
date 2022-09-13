import { Dimensions } from 'react-native';

import { themes, colors } from 'constants/styleGuide';

export default function getBlockchainApplicationsExplorerStyles() {
  return {
    common: {
      header: {
        marginBottom: 24
      },
      applicationsListContainer: {
        paddingLeft: 16,
        paddingRight: 16
      },
      message: {
        padding: 20
      },
      statsModal: {
        height: Dimensions.get('window').height / 1.6,
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
