import { themes, colors } from '../../../../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      paddingHorizontal: 20,
      paddingTop: 20
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      fontSize: 15,
      marginBottom: 5,
    },
    infoButton: {
      paddingHorizontal: 10
    },
    feeButton: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 5,
      borderRadius: 30,
      borderWidth: 1.5,
      paddingVertical: 8,
      marginTop: 5,
      borderColor: colors.light.ghost
    },
    feeText: {
      textAlign: 'center'
    }
  },

  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue
    },
    feeText: {
      color: colors.dark.blueGray
    },
    activeText: {
      color: colors.light.zodiacBlue
    },
    activeFee: {
      borderColor: colors.light.ultramarineBlue
    }
  },
  [themes.dark]: {
    title: {
      color: colors.dark.whiteSmoke
    },
    feeText: {
      color: colors.dark.blueGray
    },
    activeText: {
      color: colors.dark.white
    },
    activeFee: {
      borderColor: colors.dark.ultramarineBlue
    }
  }
});
