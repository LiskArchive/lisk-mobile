import { colors } from 'constants/styleGuide';

export default () => ({
  common: {
    incognitoWrapper: {
      borderWidth: 1,
      marginRight: 10,
      width: 68,
      borderColor: colors.light.white,
      borderRadius: 25,
      padding: 2
    },
    incognitoIcon: {
      backgroundColor: colors.light.white,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15
    }
  },
});
