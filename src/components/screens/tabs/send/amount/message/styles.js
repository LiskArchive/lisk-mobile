import { themes, colors } from '../../../../../../constants/styleGuide';

export default () => ({
  common: {
    input: {
      flexWrap: 'wrap',
      flex: 1
    },
    inputContainer: {},
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      fontSize: 15,
      color: colors.light.ultramarineBlue
    },
    addMessage: {
      paddingTop: 20,
      paddingHorizontal: 20
    },
    circularProgress: {
      position: 'absolute',
      bottom: 16,
      right: 30,
      width: 20,
      height: 20
    },
    labelRow: {
      paddingHorizontal: 20,
      paddingTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    label: {
      fontSize: 15
    },
    actionButton: {
      paddingHorizontal: 10
    },
    modalText: {
      fontSize: 15,
      marginBottom: 10,
    },
  },
  [themes.light]: {
    label: {
      color: colors.light.zodiacBlue
    },
    modalText: {
      color: colors.light.black
    },
  },

  [themes.dark]: {
    label: {
      color: colors.dark.whiteSmoke
    },
    modalText: {
      color: colors.dark.whiteSmoke

    },
  }
});
