import { boxes, colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    container: {
      flex: 1,
    },
    imageContainer: {
      alignItems: 'center',
    },
    applicationLogoImage: {
      borderRadius: 50,
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      marginBottom: 8,
    },
    applicationTitle: {
      fontSize: fonts.size.base,
      textAlign: 'center',
      marginBottom: 16,
    },
    applicationUrlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    applicationUrl: {
      marginLeft: 4,
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold,
    },
    applicationChainIDContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    accountContent: {
      paddingLeft: 8,
    },
    labelContainer: {
      marginBottom: 8,
    },
    label: {
      color: colors.light.blueGray,
      marginRight: 4,
    },
    description: {
      fontFamily: fonts.family.regular,
      marginVertical: 4,
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
    buttonContainer: {
      flexDirection: 'row',
      paddingBottom: boxes.boxPadding,
    },
    button: {
      flex: 1,
      marginHorizontal: 4,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.light.platinumGray,
    },
  },
};
