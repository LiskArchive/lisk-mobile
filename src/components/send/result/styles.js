import { Dimensions } from 'react-native';
import { themes, boxes, colors } from '../../../constants/styleGuide';

const { height } = Dimensions.get('window');
export default () => ({
  common: {
    container: {
      height: '100%',
    },
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: boxes.white,
      paddingRight: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingTop: 37,
      paddingBottom: 35,
    },
    button: {
      marginTop: 20,
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
    },
    heading: {
      fontSize: 24,
      paddingBottom: 80,
    },
    subtitle: {
      marginTop: 7,
    },
    illustration: {
      width: '100%',
      height: height <= 640 ? 200 : 300,
      paddingBottom: 50,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    title: {
      color: colors.light.black,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    title: {
      color: colors.dark.white,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
  },
});
