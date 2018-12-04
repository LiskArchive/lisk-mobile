import { Dimensions } from 'react-native';
import { themes, boxes, colors } from '../../../constants/styleGuide';

const { height } = Dimensions.get('window');
export default () => ({
  common: {
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: boxes.white,
      padding: boxes.boxPadding,
    },
    illustration: {
      width: '100%',
      height: height <= 640 ? 200 : 300,
      paddingBottom: 50,
    },
    button: {
      marginTop: 20,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
  },
});
