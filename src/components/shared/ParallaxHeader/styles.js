import { Platform, Dimensions } from 'react-native';
import { colors, themes } from '../../../constants/styleGuide';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
// eslint-disable-next-line no-nested-ternary
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const DEFAULT_TITLE_COLOR = 'white';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: null,
      resizeMode: 'cover',
    },
    bar: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    headerTitle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: STATUS_BAR_HEIGHT,
      justifyContent: 'center',
    },
    headerText: {
      color: DEFAULT_TITLE_COLOR,
      textAlign: 'center',
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.ultramarineBlue
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.light.inkBlue
    }
  }
});
