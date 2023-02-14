import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getAccountDetailsStyles() {
  return {
    common: {
      container: {
        padding: boxes.boxPadding,
        flex: 1,
      },
      accountCard: {
        backgroundColor: colors.light.ultramarineBlue,
        padding: 24,
        borderRadius: 20,
      },
      row: {
        flexDirection: 'row',
      },
      switchContainer: {
        alignSelf: 'flex-start',
        padding: 8,
      },
      detailsContainer: {
        flex: 1,
        paddingHorizontal: 8,
      },
      usernameText: {
        fontFamily: fonts.family.contextBold,
        fontSize: fonts.size.h3,
        marginBottom: 4,
      },
      addressText: {
        fontFamily: fonts.family.context,
      },
      buttonContainer: {
        marginTop: 40,
      },
      button: {
        flex: 1,
        borderRadius: 30,
        borderWidth: 1,
        padding: 16,
        borderColor: colors.light.platinumGray,
      },
      requestButton: {
        marginRight: 16,
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
      tokenListContainer: {
        marginTop: 32,
      },
      transactionListContainer: {
        marginTop: 32,
      },
    },
    [themes.light]: {
      usernameText: {
        color: colors.light.platinumGray,
      },
      addressText: {
        color: colors.light.platinumGray,
      },
    },
    [themes.dark]: {
      usernameText: {
        color: colors.light.platinumGray,
      },
      addressText: {
        color: colors.light.platinumGray,
      },
    },
  };
}
