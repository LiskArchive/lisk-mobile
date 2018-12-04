import { Platform } from 'react-native';
import { fonts, themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    main: {
      flex: 1,
      fontSize: Platform.OS === 'ios' ? 18 : 20,
      textAlign: 'center',
      marginHorizontal: 16,
      fontFamily: fonts.family.heading,
    },
  },
  [themes.light]: {
    main: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    main: {
      color: colors.dark.white,
    },
  },
});
