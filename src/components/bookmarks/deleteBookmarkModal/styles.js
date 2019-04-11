import { themes, colors, fonts, boxes } from '../../../constants/styleGuide';
import { deviceWidth } from '../../../utilities/device';

export default () => ({
  common: {
    container: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: boxes.boxPadding,
    },
    text: {
      textAlign: 'center',
      lineHeight: 22,
    },
    actionButton: {
      width: deviceWidth() - (boxes.boxPadding * 2),
      height: boxes.buttonHeight,
      borderWidth: 1,
      color: colors.light.white,
      borderRadius: boxes.buttonBorderRadius,
      margin: boxes.boxPadding,
      textAlign: 'center',
      lineHeight: boxes.buttonHeight,
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
    },
  },

  [themes.light]: {
    text: {
      color: colors.light.gray2,
    },
    actionButton: {
      borderColor: colors.light.red,
      backgroundColor: colors.light.red,
    },
    cancelButton: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    text: {
      color: colors.dark.gray2,
    },
    actionButton: {
      borderColor: colors.dark.red,
      backgroundColor: colors.dark.red,
    },
    cancelButton: {
      color: colors.dark.gray2,
    },
  },
});
