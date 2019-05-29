
import { Platform } from 'react-native';
import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'column',
      paddingBottom: 24,
    },
    titleContainer: {
      overflow: 'hidden',
      paddingRight: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
    },
    headerButton: {
      transform: [
        { rotate: '45deg' },
      ],
      width: 60,
      height: 40,
      marginTop: (Platform.OS === 'ios') ? 6 : 12,
    },
    subtitle: {
      maxWidth: '100%',
    },
    form: {
      paddingBottom: 10,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
      ...Platform.select({
        android: {
          height: 48,
          paddingLeft: 25,
        },
        ios: {
          height: 48,
          paddingBottom: 10,
          paddingLeft: 25,
        },
      }),
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 0,
      left: 20,
      bottom: 18,
    },
    addressContainer: {
      width: '100%',
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    subtitle: {
      color: colors.light.slateGray,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
  },
});
