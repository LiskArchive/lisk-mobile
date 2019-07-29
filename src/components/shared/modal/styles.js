import { Platform } from 'react-native';
import { themes, colors, boxes } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';
import { deviceType } from '../../../utilities/device';

export default () => ({
  common: {
    modal: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    wrapper: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
    },
    titleContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 50,
      zIndex: 2,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    title: {
      paddingTop: 15,
      paddingBottom: 15,
      width: '100%',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      left: 0,
      top: Platform.OS === 'ios' ? 8 : 0,
      zIndex: 2,
    },
    contentContainer: {
      paddingHorizontal: boxes.boxPadding,
      paddingTop: boxes.boxPadding + 50,
      // TODO: Replace with SafeAreaView
      paddingBottom: deviceType() === 'iOSx' ? boxes.boxPadding + 20 : boxes.boxPadding,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    titleContainer: {
      backgroundColor: colors.light.whiteSmoke,
    },
    title: {
      color: colors.light.maastrichtBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    subHeader: {
      color: colors.dark.slateGray,
    },
    titleContainer: {
      backgroundColor: colors.dark.headerBg,
      borderBottomColor: setColorOpacity(colors.dark.white, 0.24),
      borderBottomWidth: 1,
    },
    title: {
      color: colors.dark.white,
    },
  },
});
