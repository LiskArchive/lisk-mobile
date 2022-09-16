import { themes, colors, fonts } from 'constants/styleGuide';

export default function getDisconnectExternalBlockchainApplicationStyles() {
  return {
    common: {
      container: {
        flex: 1,
        width: '100%',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      },
      body: {
        flex: 1,
        marginBottom: 16,
        alignItems: 'center',
      },
      title: {
        fontSize: fonts.size.h3,
      },
      logo: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      },
      fieldContainerLast: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
      },
      text: {
        fontSize: fonts.size.base,
        textAlign: 'center',
      },
      value: {
        fontSize: fonts.size.base,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      text: {
        color: colors.light.zodiacBlue,
      },
      value: {
        color: colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black,
      },
      title: {
        color: colors.dark.ghost,
      },
      text: {
        color: colors.dark.ghost,
      },
      value: {
        color: colors.dark.ghost,
      },
    },
  };
}
