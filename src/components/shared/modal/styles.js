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
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      overflow: 'hidden',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 20,
      paddingLeft: 25,
    },
    title: {
      paddingTop: 15,
      paddingBottom: 15,
    },
    closeButton: {
      zIndex: 2,
    },
    contentContainer: {
      padding: boxes.boxPadding,
      paddingBottom:
        deviceType() === 'iOSx' ? boxes.boxPadding + 20 : boxes.boxPadding,
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
      backgroundColor: colors.dark.mainBg,
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
