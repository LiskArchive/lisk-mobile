import { colors, themes } from 'constants/styleGuide';

export default {
  common: {
    container: {
      width: '100%',
      flex: 1,
    },
    urlContainer: {
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    titleHolder: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginHorizontal: 20
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    url: {
      color: colors.light.ultramarineBlue,
    },
  },
  [themes.light]: { title: { color: colors.light.zodiacBlue } },

  [themes.dark]: { title: { color: colors.dark.white } },
};
