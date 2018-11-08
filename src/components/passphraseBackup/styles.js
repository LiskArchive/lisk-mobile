import { Platform, DeviceInfo } from 'react-native';
import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flexDirection: 'column',
      padding: 20,
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ? 30 : 20,
    },
    header: {
      marginTop: 8,
    },
    subHeader: {
      marginTop: 8,
      marginBottom: 25,
    },
    passphraseContainer: {
      padding: 20,
      shadowOpacity: 0.1,
      shadowRadius: 20,
      marginTop: 10,
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
    placeholder: {
      height: 1,
      width: '100%',
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    subHeader: {
      color: colors.light.gray2,
    },
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
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    subHeader: {
      color: colors.dark.gray1,
    },
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
