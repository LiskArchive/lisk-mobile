import { StyleSheet, Platform } from 'react-native';

const styles = {
  back: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 6,
  },
  multiStepWrapper: {
    height: '100%',
  },
};

export default StyleSheet.create(styles);
