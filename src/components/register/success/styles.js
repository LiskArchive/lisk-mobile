import { StyleSheet, DeviceInfo } from 'react-native';
import { colors } from '../../../constants/styleGuide';

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
    paddingBottom: 12,
  },
  subTitle: {
    color: colors.grayScale2,
  },
  subHeader: {
    marginTop: 14,
    marginBottom: 25,
    color: colors.grayScale1,
  },
  imageContainer: {
    marginTop: 52,
    alignItems: 'center',
  },
  image: {
    width: 198,
    height: 198,
  },
  button: {
    marginBottom: DeviceInfo.isIPhoneX_deprecated ? 35 : 25,
  },
};

export default StyleSheet.create(styles);
