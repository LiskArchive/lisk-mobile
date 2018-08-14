import { StyleSheet, Platform } from 'react-native';

const styles = {
  back: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 6,
  },
  wrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
};

export default StyleSheet.create(styles);
