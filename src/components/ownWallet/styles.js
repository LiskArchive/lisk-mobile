import { colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      alignContent: 'space-around',
      backgroundColor: colors.white,
    },
    scrollView: {
      marginTop: -10,
    },
    accountSummary: {
      zIndex: 2,
    },
  },
});
