import { colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    title: {
      textAlign: 'center',
      color: colors.light.white,
      paddingBottom: 30,
    },
    readMoreButton: {
      marginBottom: 10,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    icon: {
      paddingLeft: 10,
    },
    readMoreText: {
      color: colors.light.white,
    },
    gotItText: {
      color: colors.light.ultramarineBlue
    },
    gotItButton: {
      backgroundColor: colors.light.white
    }
  }
});
