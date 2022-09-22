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
      padding: boxes.boxPadding,
    },
    input: {
      marginTop: 8,
    },
    scanButtonTitle: {
      fontSize: 14,
      paddingLeft: 8,
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
      marginTop: 4,
      marginBottom: 8,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      fontWeight: '400',
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
      color: colors.light.slateGray,
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
