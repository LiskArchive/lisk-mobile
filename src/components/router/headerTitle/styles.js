import { fonts, themes, colors } from '../../../constants/styleGuide';
import { deviceType } from '../../../utilities/device';

export default () => ({
  common: {
    main: {
      flex: 1,
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 16,
      marginTop: deviceType() === 'iOSx' ? -10 : -5,
      fontFamily: fonts.family.heading,
    },
  },
  [themes.light]: {
    main: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    main: {
      color: colors.dark.white,
    },
  },
});
