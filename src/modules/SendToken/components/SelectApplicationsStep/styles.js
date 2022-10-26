import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getSendTokenSelectApplicationsStepStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      container: {
        flex: 1,
      },
      row: {
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
      accountName: {
        fontWeight: '500',
        fontSize: fonts.size.base,
        marginLeft: 8,
      },
      accountAddress: {
        marginLeft: 8,
      },
      text: {
        color: colors.light.blueGray,
      },
      placeholder: {
        fontSize: 16,
        color: colors.light.ghost,
        fontWeight: '400',
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      accountName: {
        color: colors.light.zodiacBlue,
      },
      accountAddress: {
        color: colors.light.blueGray,
      },
      text: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      accountName: {
        color: colors.light.whiteSmoke,
      },
      accountAddress: {
        color: colors.light.whiteSmoke,
      },
      text: {
        color: colors.light.whiteSmoke,
      },
    },
  };
}

export function getSendTokenRecipientAccountFieldStyles(styles) {
  return {
    containerStyle: {
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
      marginBottom: 8,
      ...styles?.container,
    },
    inputLabel: {
      marginBottom: 8,
      ...styles?.inputLabel,
    },
    input: {
      padding: 16,
      ...styles?.input,
    },
  };
}
