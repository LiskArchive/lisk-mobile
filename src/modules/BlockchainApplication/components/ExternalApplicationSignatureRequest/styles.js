import { themes, boxes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default {
  common: {
    container: {
      flex: 1,
      marginTop: 8,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 8,
    },
    applicationLogoImage: {
      borderRadius: 50,
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
    },
    title: {
      textAlign: 'center',
      marginBottom: 16,
    },
    applicationTitle: {
      fontSize: fonts.size.base,
      textAlign: 'center',
      marginBottom: 16,
    },
    urlContainer: {
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    url: {
      marginLeft: 4,
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold,
      fontSize: 14,
    },
    applicationChainIDContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    itemBody: {
      marginLeft: 8,
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: '600',
    },
    itemSubtitle: {
      fontSize: 13,
    },
    labelContainer: {
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      marginRight: 4,
      marginBottom: 8,
    },
    chainIDContainer: {
      flexDirection: 'row',
      padding: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 16,
      marginBottom: 8,
    },
    chainIDValue: {
      fontSize: 14,
      fontWeight: '600',
    },
    chainIDLabel: {
      fontSize: 14,
      marginRight: 4,
    },
    description: {
      fontFamily: fonts.family.regular,
      fontSize: fonts.size.input,
    },
    value: {
      fontSize: fonts.size.input,
    },
    permissions: {
      color: colors.light.blueGray,
    },
    horizontalLine: {
      borderBottomColor: colors.light.platinumGray,
      borderBottomWidth: 1,
      marginTop: boxes.boxPadding,
      marginBottom: boxes.boxPadding,
    },
    footer: {
      flexDirection: 'row',
      marginTop: boxes.boxPadding,
    },
    switchButton: {
      marginTop: 10,
      borderWidth: 0,
    },
    switchTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchText: {
      color: colors.light.ultramarineBlue,
      marginHorizontal: 10,
    },
    buttonLeft: {
      flex: 1,
      marginRight: 8,
    },
    buttonRight: {
      flex: 1,
      marginLeft: 8,
    },
    button: {
      flex: 1,
    },
    buttonMarginVertical: {
      marginVertical: 8,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.light.platinumGray,
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
    text: {
      color: colors.light.zodiacBlue,
    },
    label: {
      color: colors.light.blueGray,
    },
    chainIDLabel: {
      color: colors.light.smoothGray,
    },
    errorMessage: {
      color: colors.light.burntSieanna,
    },
    chainIDContainer: {
      backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.1),
    },
    chainIDValue: {
      color: colors.light.ultramarineBlue,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    description: {
      color: colors.light.white,
    },
    label: {
      color: colors.dark.smoothGray,
    },
    chainIDLabel: {
      color: colors.dark.smoothGray,
    },
    text: {
      color: colors.dark.white,
    },
    chainIDContainer: {
      backgroundColor: setColorOpacity(colors.dark.ultramarineBlue, 0.3),
    },
    chainIDValue: {
      color: colors.dark.ultramarineBlue,
    },
  },
};
