import { StyleSheet, Platform } from 'react-native';
import { Header } from 'react-navigation';

const styles = {
  iconButton: {
    width: 60,
    marginTop: (Platform.OS === 'ios') ? 6 : Math.floor((Header.HEIGHT - 30) / 2),
  },
  logo: {
    height: 39,
    width: 32,
    paddingTop: 2,
    paddingBottom: 5,
  },
};

export default StyleSheet.create(styles);
