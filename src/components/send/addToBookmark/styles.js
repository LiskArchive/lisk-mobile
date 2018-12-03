import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';
import { deviceType, tabBarHeight } from '../../../utilities/device';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: (deviceType() === 'android' ? tabBarHeight() : 0) + 24,
    },
    headerContainer: {
      paddingTop: 36,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    subHeader: {
      marginTop: 5,
    },
    form: {
      marginTop: 20,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
    address: {
      fontWeight: 'bold',
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      paddingBottom: 0,
      marginRight: 10,
    },
    row: {
      marginBottom: 4,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    label: {
      marginTop: 15,
      marginBottom: 7,
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
    link: {
      textAlign: 'center',
      marginBottom: 10,
    },
    linkWrapper: {
      marginTop: -37,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    subHeader: {
      color: colors.light.gray2,
    },
    label: {
      color: colors.light.gray1,
    },
    subtitle: {
      color: colors.light.gray2,
    },
    link: {
      color: colors.light.blue,
    },
    text: {
      color: colors.light.black,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    subHeader: {
      color: colors.dark.gray4,
    },
    label: {
      color: colors.dark.gray4,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
    link: {
      color: colors.dark.blue,
    },
    text: {
      color: colors.dark.white,
    },
  },
});
