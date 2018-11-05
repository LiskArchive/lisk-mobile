import { colors, themes } from '../../constants/styleGuide';
import { createThemedStyles } from '../../utilities/helpers';

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

  [themes.light]: {
    container: {
      backgroundColor: colors.white,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.black,
    },
  },
};

export default theme => createThemedStyles(styles, theme);
