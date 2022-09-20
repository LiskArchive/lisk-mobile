import { boxes, colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    container: {
      padding: boxes.boxPadding,
      flex: 1,
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      marginBottom: 10,
      borderRadius: 25,
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },
    urlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    url: {
      marginLeft: 5,
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold,
    },
    label: {
      color: colors.light.blueGray,
      marginRight: 5,
    },
    subTitle: {
      fontFamily: fonts.family.contextSemiBold,
      marginBottom: 5,
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
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.light.platinumGray,
    },
    outlineButtonText: {
      color: colors.light.zodiacBlue,
    },
    buttonText: {
      fontFamily: fonts.family.contextSemiBold,
    },
  },
};
