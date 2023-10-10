import { Platform } from 'react-native';

import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getExternalBlockchainApplicationDetailsStyles() {
  const safeAreaPadding = Platform.OS === 'android' ? 0 : 44;
  const logoMarginTop = 35;

  return {
    common: {
      container: {
        flex: 1,
      },
      header: {
        height: 200,
        position: 'relative',
        overflow: 'hidden',
        paddingTop: safeAreaPadding,
      },
      logoContainer: {
        marginTop: -logoMarginTop,
        marginBottom: Platform.select({ ios: -32, android: 10 }),
        height: 70,
        width: 70,
        borderRadius: 35,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      body: {
        flex: 1,
        paddingTop: logoMarginTop + 16,
        paddingHorizontal: boxes.boxPadding,
      },
      titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      },
      title: {
        fontSize: fonts.size.h4,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      },
      column: {
        justifyContent: 'center',
        marginBottom: 8,
      },
      logo: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      label: {
        fontSize: fonts.size.base,
        marginBottom: 12,
      },
      value: {
        fontSize: fonts.size.base,
      },
      url: {
        fontSize: fonts.size.input,
        fontWeight: '500',
        marginLeft: 8,
        color: colors.light.ultramarineBlue,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      },
      itemBody: {
        marginLeft: 8,
      },
      itemTitle: {
        fontSize: 14,
        fontWeight: '600',
      },
      itemSubtitle: {
        fontSize: 12,
      },
      itemImage: {
        height: 32,
        width: 32,
        borderRadius: 25,
        borderColor: colors.light.platinumGray,
        borderWidth: 1,
      },
      divider: {
        marginVertical: 16,
        borderTopWidth: 1,
      },
      dividerSmall: {
        marginTop: 8,
        marginBottom: 16,
        borderTopWidth: 1,
      },
      disconnectButton: {
        color: colors.light.furyRed,
      },
      footer: {
        padding: boxes.boxPadding,
        paddingBottom: safeAreaPadding,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      label: {
        color: colors.light.blueGray,
      },
      value: {
        color: colors.light.zodiacBlue,
      },
      itemTitle: {
        color: colors.light.zodiacBlue,
      },
      itemSubtitle: {
        color: colors.light.smoothGray,
      },
      divider: {
        borderColor: colors.light.platinumGray,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black,
      },
      title: {
        color: colors.dark.ghost,
      },
      label: {
        color: colors.dark.blueGray,
      },
      value: {
        color: colors.dark.white,
      },
      itemTitle: {
        color: colors.dark.white,
      },
      itemSubtitle: {
        color: colors.dark.mountainMist,
      },
      divider: {
        borderColor: colors.dark.volcanicSand,
      },
    },
  };
}
