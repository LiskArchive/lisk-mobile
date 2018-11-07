import { Platform } from 'react-native';

export default () => ({
  common: {
    back: {
      width: 60,
      height: 40,
      marginTop: (Platform.OS === 'ios') ? 0 : 6,
    },
    multiStepWrapper: {
      height: '100%',
    },
  },
});
