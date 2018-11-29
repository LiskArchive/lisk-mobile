import { Platform, DeviceInfo } from 'react-native';
import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {},
    textContainer: {
      paddingBottom: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ? 30 : 20,
    },
    passphraseContainer: {
      padding: 20,
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 1,
      shadowColor: '#0279b6',
    },
    passphrase: {
      marginTop: 8,
    },
    copyContainer: {
      alignItems: 'center',
      marginTop: 8,
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      width: 111,
      height: 111,
    },
    caption: {
      marginTop: 15,
    },
  },

  [themes.light]: {
    passphraseContainer: {
      backgroundColor: colors.light.white,
    },
    passphraseTitle: {
      color: colors.light.gray2,
    },
    passphrase: {
      color: colors.light.black,
    },
    copy: {
      color: colors.light.blue,
    },
    caption: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    passphraseContainer: {
      backgroundColor: '#011730',
    },
    passphraseTitle: {
      color: colors.dark.gray4,
    },
    passphrase: {
      color: colors.dark.white,
    },
    copy: {
      color: colors.dark.blue,
    },
    caption: {
      color: colors.dark.gray4,
    },
  },
});
