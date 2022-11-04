import { themes, colors, fonts } from 'constants/styleGuide';

export default function getExternalBlockchainApplicationDetailsStyles() {
  return {
    common: {
      container: {
        flex: 1,
        width: '100%',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      body: {
        flex: 1,
        marginBottom: 16,
      },
      title: {
        fontSize: fonts.size.h4,
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
      label: {
        fontSize: fonts.size.base,
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
      label: {
        color: colors.light.blueGray,
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
      label: {
        color: colors.dark.whiteSmoke,
      },
      value: {
        color: colors.dark.ghost,
      },
    },
  };
}
