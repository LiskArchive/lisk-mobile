import { themes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default function getAccountCardStyles() {
  return {
    common: {
      container: {
        backgroundColor: colors.light.ultramarineBlue,
        padding: 24,
        borderRadius: 20,
        minHeight: 210,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      tryAgainButton: {
        marginTop: 24,
        marginBottom: 24,
      },
      switchContainer: {
        alignSelf: 'flex-start',
        padding: 8,
      },
      detailsContainer: {
        flex: 1,
        marginLeft: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
      },
      usernameText: {
        fontFamily: fonts.family.contextSemiBold,
        fontSize: fonts.size.h4,
        marginBottom: 4,
      },
      multisigContainer: {
        backgroundColor: colors.light.platinumGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 13,
        height: 25,
        width: 25,
      },
      addressText: {
        fontFamily: fonts.family.context,
        fontSize: fonts.size.base,
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
      sendButtonDisabled: {
        backgroundColor: setColorOpacity(colors.light.white, 0.7),
      },
      buttonText: {
        textAlign: 'center',
        color: colors.light.platinumGray,
      },
      sendButtonText: {
        color: colors.light.ultramarineBlue,
      },
      balanceContainer: {
        marginTop: 24,
      },
      balanceLabel: {
        fontFamily: fonts.family.context,
        fontWeight: '600',
        fontSize: fonts.size.small,
      },
      balanceText: {
        fontFamily: fonts.family.contextSemiBold,
        fontSize: fonts.size.h1,
      },
    },
    [themes.light]: {
      usernameText: {
        color: colors.light.platinumGray,
      },
      addressText: {
        color: colors.light.platinumGray,
      },
      balanceLabel: {
        color: colors.light.platinumGray,
      },
      balanceText: {
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
      balanceLabel: {
        color: colors.light.platinumGray,
      },
      balanceText: {
        color: colors.light.platinumGray,
      },
    },
  };
}
