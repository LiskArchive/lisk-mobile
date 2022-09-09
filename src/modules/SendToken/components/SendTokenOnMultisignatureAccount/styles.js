import { themes, colors, boxes } from 'constants/styleGuide'

export function getSendTokenOnMultisignatureAccountStyles() {
  return {
    common: {
      container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
      },
      buttonContainer: {
        padding: 8,
        marginTop: 8,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      button: {
        color: colors.light.ultramarineBlue,
      },
      copy: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      button: {
        color: colors.light.ultramarineBlue,
      },
      copy: {
        color: colors.light.white,
      },
    },
  }
}
