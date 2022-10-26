import { colors } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    checkbox: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.light.sparkleGray,
      height: 20,
      width: 20,
      borderRadius: 4,
      marginRight: 10,
    },
    active: {
      borderColor: colors.light.ultramarineBlue,
    },
  },
};
