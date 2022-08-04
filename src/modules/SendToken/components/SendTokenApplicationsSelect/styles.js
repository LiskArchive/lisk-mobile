import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenApplicationsSelectStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding
      },
      container: {
        flex: 1,
      },
      applicationNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      applicationLogoImage: {
        borderRadius: 50,
        width: 24,
        height: 24,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      accountAddress: {
        marginLeft: 8,
        color: colors.light.blueGray
      }
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      accountAddress: {
        color: colors.light.blueGray
      }
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      accountAddress: {
        color: colors.light.whiteSmoke
      }
    },
  };
}
