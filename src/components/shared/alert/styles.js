import { colors, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    titleStyle: {
      fontSize: fonts.size.input,
      textAlign: 'left',
      fontWeight: 'bold',
      color: colors.light.white,
      backgroundColor: 'transparent',
      fontFamily: fonts.family.heading,
      marginBottom: 4,
    },
    messageStyle: {
      fontSize: fonts.size.input,
      textAlign: 'left',
      color: colors.light.white,
      backgroundColor: 'transparent',
    },
  },
});
