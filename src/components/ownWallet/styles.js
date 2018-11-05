import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  common: {
    container: {
      flex: 1,
      alignContent: 'space-around',
    },
    scrollView: {
      marginTop: -10,
    },
    accountSummary: {
      zIndex: 2,
    },
  },

  light: {
    container: {
      backgroundColor: colors.white,
    },
  },

  dark: {
    container: {
      backgroundColor: colors.black,
    },
  },
};

export const getStyles = (theme = 'light') => [StyleSheet.create(styles.common), StyleSheet.create(styles[theme])];
export default getStyles();
