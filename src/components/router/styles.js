import { StyleSheet, Platform } from 'react-native';

const styles = {
  back: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 6,
  },
  logo: {
    top: -11,
  },
  settings: {
    paddingTop: 0,
    paddingLeft: 20,
    width: 55,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 6,
  },
};

export default StyleSheet.create(styles);
