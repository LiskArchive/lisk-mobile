import { Platform, DeviceInfo } from 'react-native';
import { colors, fonts } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      backgroundColor: colors.light.white,
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
    subTitle: {
      color: colors.light.grayScale2,
    },
    subHeader: {
      marginTop: 8,
      marginBottom: 25,
      color: colors.light.grayScale2,
    },
    label: {
      color: colors.light.grayScale2,
      marginLeft: 12,
    },
    passphraseContainer: {
      backgroundColor: colors.light.white,
      padding: 20,
      shadowColor: '#0279b6',
      shadowOpacity: 0.1,
      shadowRadius: 20,
      marginTop: 10,
      elevation: 1,
    },
    passphraseTitle: {
      color: colors.light.grayScale2,
    },
    imageDescription: {
      color: colors.light.grayScale2,
      marginTop: 16,
      fontFamily: fonts.family.context,
    },
    passphrase: {
      marginTop: 7,
      color: colors.light.black,
    },
    copyContainer: {
      alignItems: 'center',
      marginTop: 5,
    },
    copy: {
      color: colors.light.primary5,
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      width: 111,
      height: 111,
    },
    caption: {
      color: colors.light.grayScale2,
      marginTop: 15,
    },
    placeholder: {
      height: 1,
      width: '100%',
    },
  },
});
