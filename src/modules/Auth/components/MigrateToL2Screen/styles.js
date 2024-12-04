import { colors, themes, boxes } from 'constants/styleGuide';
import fonts from '../../../../constants/styleGuide/fonts';

export default function getAccountsManagerScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      headerLogoContainer: {
        marginVertical: 40,
        alignItems: 'center',
      },
      announcementContainer: {
        marginBottom: 24,
      },
      title: {
        textAlign: 'center',
        marginBottom: 8,
      },
      description: {
        textAlign: 'center',
        fontSize: fonts.size.small,
        maxWidth: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      link: {
        fontFamily: fonts.family.contextSemiBold,
        fontSize: fonts.size.small,
        flexDirection: 'row',
        alignItems: 'center',
      },
      linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
      },
      linkIcon: {
        marginBottom: -2,
        marginRight: 2,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white,
      },
      title: {
        color: colors.light.black,
      },
      description: {
        color: colors.light.blueGray,
      },
      link: {
        color: colors.light.ultramarineBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black,
      },
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.white,
      },
      link: {
        color: colors.dark.ultramarineBlue,
      },
    },
  };
}
