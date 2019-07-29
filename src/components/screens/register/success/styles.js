import { StyleSheet, DeviceInfo } from 'react-native';
import { colors } from '../../../../constants/styleGuide';

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
    paddingBottom: 8,
  },
  subTitle: {
    color: colors.light.slateGray,
    textAlign: 'center',
    marginTop: 30,
  },
  imageContainer: {
    marginTop: 52,
    alignItems: 'center',
  },
  image: {
    width: 305,
    height: 340,
  },
  button: {
    marginBottom: DeviceInfo.isIPhoneX_deprecated ? 35 : 25,
  },
};

export default StyleSheet.create(styles);
