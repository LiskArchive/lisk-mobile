import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    body: {
      padding: boxes.boxPadding,
      flex: 1,
    },
    footer: {
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      marginBottom: boxes.boxPadding,
    },
    input: {
      marginTop: 24,
    },
    scanButtonTitle: {
      fontSize: 14,
      marginLeft: 8,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addressContainer: {
      width: '100%',
    },
    avatar: {
      position: 'absolute',
      zIndex: 1,
      left: 30,
      top: 63,
    },
    address: {
      fontWeight: 'bold',
      flex: 1,
    },
    staticAddressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    staticAvatar: {
      marginRight: 8,
    },
    row: {
      marginTop: 24,
      marginBottom: 4,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    label: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      marginBottom: 8,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    scanButtonTitle: {
      color: colors.light.maastrichtBlue,
    },
    label: {
      color: colors.light.maastrichtBlue,
    },
    address: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    scanButtonTitle: {
      color: colors.dark.platinum,
    },
    label: {
      color: colors.dark.platinum,
    },
    address: {
      color: colors.dark.white,
    },
  },
});
