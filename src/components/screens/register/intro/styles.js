import { StyleSheet } from 'react-native';
import { deviceType } from '../../../../utilities/device';

const styles = {
  scrollContainer: {
    flexGrow: 1,
  },
  sliderImage: {
    width: 284,
    height: 375,
    marginTop: deviceType() === 'iOSx' ? 40 : 20,
  },
};

export default StyleSheet.create(styles);
