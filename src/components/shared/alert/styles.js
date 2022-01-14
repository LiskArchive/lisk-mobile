import { colors, fonts } from '../../../constants/styleGuide';

export default () => ({
  common: {
    titleStyle: {
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'bold',
      color: colors.light.white,
      backgroundColor: 'transparent',
      fontFamily: fonts.family.heading,
    },
    messageStyle: {
      fontSize: fonts.size.small,
      textAlign: 'left',
      color: '#ECF2F9',
      backgroundColor: 'transparent',
      marginTop: 5,
    },
  },
});
