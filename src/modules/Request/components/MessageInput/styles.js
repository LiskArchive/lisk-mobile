import { themes, colors } from 'constants/styleGuide';

export default () => ({
  common: {
    input: {
      flexWrap: 'wrap',
      flex: 1
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      fontSize: 15,
      color: colors.light.ultramarineBlue
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
      margin: 0,
    },
    addMessage: {
      paddingTop: 20,
    },
    circularProgress: {
      position: 'absolute',
      bottom: 16,
      right: 30,
      width: 20,
      height: 20
    },
    errorProgress: {
      bottom: 68,
    },
    labelRow: {
      paddingTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    label: {
      fontSize: 15
    },
    actionButton: {
      paddingRight: 10,
    },
    optional: {
      paddingHorizontal: 10,
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
