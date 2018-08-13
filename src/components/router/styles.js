import { StyleSheet, Platform } from 'react-native';
import { Header } from 'react-navigation';

const styles = {
  back: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? Math.floor((Header.HEIGHT - 30) / 2) : 6,
  },
  logo: {
    lineHeight: 40,
    top: -11,
  },
};

export default StyleSheet.create(styles);
