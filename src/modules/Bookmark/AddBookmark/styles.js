import { Platform } from 'react-native'
import { themes, colors, boxes, fonts } from 'constants/styleGuide'

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    form: {
      paddingBottom: boxes.boxPadding,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
    scanButton: {
      position: 'absolute',
      right: 20,
      zIndex: 99,
      top: 24,
      paddingLeft: 10,
      paddingBottom: 10,
      width: 67,
      height: 30,
    },
    scanButtonTitle: {
      fontSize: 14,
      paddingLeft: 5,
    },
    longTitle: {
      width: 87,
    },
    addressContainer: {
      width: '100%',
    },
    addressInput: {
      ...Platform.select({
        android: {
          height: 48,
        },
        ios: {
          height: 48,
          paddingBottom: 10,
        },
      }),
    },
    addressInputWithAvatar: {
      paddingLeft: 40,
    },
    addressInputContainer: {
      ...Platform.select({
        android: {
          minHeight: 58,
        },
        ios: {
          minHeight: 48,
        },
      }),
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
      // paddingBottom: 0,
      marginRight: 10,
    },
    row: {
      marginTop: 25,
      marginBottom: 5,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    label: {
      marginTop: 5,
      marginBottom: 7,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
  },
  [themes.light]: {
    wrapper: {
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
    wrapper: {
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
})
