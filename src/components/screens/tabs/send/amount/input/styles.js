import { themes, colors, fonts } from '../../../../../../constants/styleGuide';

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
      marginTop: 20,
      paddingLeft: 20,
      paddingRight: 20
    },
    inputLabel: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
    },
    currencyContainer: {
      position: 'absolute',
      zIndex: 99,
      right: 30,
      top: 70
    },
    sendMaximumButton: {
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    sendMaximumText: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      color: colors.light.ultramarineBlue,
    },
    currencyText: {
      fontSize: fonts.size.input,
      fontFamily: fonts.family.context
    },
    currencyPrefix: {
      fontSize: 16
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
