import { colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    title: {
      color: colors.light.black,
    },
    input: {
      color: colors.light.gray1,
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.light.actionRed4,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    errorMessage: {
      fontSize: 14,
      height: 26,
    },
  },
});
