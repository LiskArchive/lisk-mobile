import { themes, colors, fonts } from 'constants/styleGuide'

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    homeContainer: {
      paddingTop: 20,
    },
    body: {
      padding: 20,
      flex: 1,
    },
    topContainer: {
      paddingLeft: 20,
      marginRight: 60,
    },
    discreteContainer: {
      marginRight: 10,
    },
    accountCard: {
      backgroundColor: colors.light.ultramarineBlue,
      padding: 20,
      borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    switchContainer: {
      alignSelf: 'flex-start',
      padding: 10,
    },
    avatar: {
      marginRight: 20,
    },
    accountDetails: {
      flex: 1,
      paddingHorizontal: 10,
    },
    username: {
      fontFamily: fonts.family.contextBold,
      fontSize: fonts.size.h3,
      marginBottom: 5,
    },
    address: {
      fontFamily: fonts.family.context,
    },
    buttonContainer: {
      marginTop: 20,
    },
    button: {
      flex: 1,
      margin: 10,
      borderRadius: 30,
      borderWidth: 1,
      padding: 10,
      borderColor: colors.light.platinumGray,
    },
    sendButton: {
      backgroundColor: colors.light.white,
    },
    buttonText: {
      textAlign: 'center',
      color: colors.light.platinumGray,
    },
    sendButtonText: {
      color: colors.light.ultramarineBlue,
    },
  },
  [themes.light]: {
    username: {
      color: colors.light.platinumGray,
    },
    address: {
      color: colors.light.platinumGray,
    },
  },
  [themes.dark]: {
    username: {
      color: colors.light.platinumGray,
    },
    address: {
      color: colors.light.platinumGray,
    },
  },
})
