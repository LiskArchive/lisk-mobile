import { deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { themes, colors, boxes, fonts } from 'constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default () => ({
  common: {
    container: {
      flexDirection: 'column',
      flex: 1,
      padding: boxes.boxPadding,
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    header: {
      textAlign: 'center',
      fontSize: fonts.size.h3,
      marginBottom: 10,
    },
    subHeader: {
      marginBottom: boxes.boxPadding,
      fontFamily: fonts.family.context,
    },
    row: {
      flexDirection: 'row',
      paddingRight: 50,
      marginBottom: isSmallScreen ? 8 : 10,
      paddingBottom: isSmallScreen ? 12 : 14,
    },
    rowTitle: {
      marginTop: 5,
      fontWeight: '500',
    },
    iconWrapper: {
      height: 36,
      borderRadius: 50,
      marginRight: 12,
      marginTop: 10,
    },
    description: {
      marginTop: 5,
    },
    label: {
      marginLeft: 12,
    },
    flex: {
      flex: 1,
    },
    semiFlex: {
      flex: 0.5,
    },
    secondaryButton: {
      flex: 0.5,
      marginRight: 24,
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 16,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    subHeader: {
      color: colors.light.slateGray,
    },
    rowTitle: {
      color: colors.light.maastrichtBlue,
    },
    description: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    subHeader: {
      color: colors.dark.slateGray,
    },
    rowTitle: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.platinum,
    },
  },
});
