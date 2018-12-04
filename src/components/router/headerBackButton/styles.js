import { Platform } from 'react-native';

export default () => ({
  common: {
    main: {
      width: 60,
      height: 40,
      marginTop: (Platform.OS === 'ios') ? 0 : 6,
    },
  },
});
