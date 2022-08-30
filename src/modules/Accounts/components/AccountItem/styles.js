import {
  themes, colors, fonts
} from 'constants/styleGuide';

export default function getAccountItemStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
      },
      modal: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      },
      screen: {
        borderRadius: 10,
        borderWidth: 0.4,
        padding: 16,
        marginVertical: 8
      },
      avatar: {
        marginRight: 16,
      },
      username: {
        fontFamily: fonts.family.contextSemiBold,
        marginBottom: 4,
        fontSize: fonts.size.base,
      },
      address: {
        fontSize: 14,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
      }
    },

    [themes.light]: {
      container: {
        borderColor: colors.light.platinumGray,
      },
      wrapper: {
        backgroundColor: colors.light.white,
      },
      username: {
        color: colors.light.zodiacBlue,
      },
      address: {
        color: colors.light.blueGray
      }
    },

    [themes.dark]: {
      container: {
        borderColor: colors.light.volcanicSand,
      },
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      username: {
        color: colors.dark.white,
      },
      address: {
        color: colors.light.ghost
      }
    }
  };
}
