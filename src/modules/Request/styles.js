import {
  themes, colors, boxes, fonts
} from 'constants/styleGuide';
import {
  deviceWidth,
} from 'utilities/device';

export default () => ({
  common: {
    wrapper: {
      height: '100%',
    },
    innerContainer: {
      flexDirection: 'column',
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
    body: {
      padding: boxes.boxPadding,
    },
    addressLabel: {
      fontSize: fonts.size.small,
      marginBottom: 8,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginBottom: 20,
    },
    avatar: {
      marginRight: 10,
    },
    tokenSvg: {
      marginLeft: 8,
    },
    address: {
      fontSize: fonts.size.base,
      maxWidth: '90%',
      marginRight: 15,
    },
    copyContainer: {
      alignItems: 'center',
      width: '100%',
    },
    shareContainer: {
      alignItems: 'center',
      height: 100,
    },
    modalContainer: {
      backgroundColor: colors.light.white,
      height: deviceWidth(),
      zIndex: 3,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      alignItems: 'center'
    },
    shareTextContainer: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    shareText: {
      fontSize: fonts.size.small,
    },
    closeButton: {
      alignSelf: 'flex-end',
      margin: 10,
      padding: 10,
      backgroundColor: colors.light.platinumGray,
      borderRadius: 50,
    }
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    innerContainer: {
      backgroundColor: colors.light.white,
    },
    addressLabel: {
      color: colors.light.slateGray,
    },
    address: {
      color: colors.light.maastrichtBlue,
    },
    shareText: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    innerContainer: {
      backgroundColor: colors.dark.mainBg,
    },
    addressLabel: {
      color: colors.light.platinum,
    },
    address: {
      color: colors.dark.white,
    },
    shareText: {
      color: colors.dark.ghost,
    },
  },
});
