import { themes, colors, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    input: {
      fontSize: 18,
      marginTop: -20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputLabel: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
    },
    currencyContainer: {
      position: 'absolute',
      zIndex: 99,
      right: 20,
      top: 45
    },
    currencyText: {
      fontSize: fonts.size.input,
      fontFamily: fonts.family.context
    },
    currencyPrefix: {
      fontSize: 16
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: 10,
    }
  },

  [themes.light]: {
    inputLabel: {
      color: colors.light.maastrichtBlue
    },
    currencyText: {
      color: colors.light.slateGray
    },
    label: {
      color: colors.light.maastrichtBlue
    }
  },

  [themes.dark]: {
    inputLabel: {
      color: colors.dark.platinum
    },
    currencyText: {
      color: colors.light.blueGray
    },
    label: {
      color: colors.light.platinum
    }
  }
});
