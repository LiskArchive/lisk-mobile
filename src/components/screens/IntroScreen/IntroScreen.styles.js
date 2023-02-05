import { themes, colors, boxes } from 'constants/styleGuide';

export default function getIntroScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
        justifyContent: 'space-between',
      },
      footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: boxes.boxPadding,
        height: 152,
      },
      lastSlideFooter: {
        padding: boxes.boxPadding,
        height: 152,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
    },
  };
}
