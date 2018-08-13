import { StyleSheet, Platform } from 'react-native';
import { Header } from 'react-navigation';

const styles = {
  back: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 6,
  },
  logo: {
    lineHeight: 40,
    top: -11,
  },
};

export default StyleSheet.create(styles);
