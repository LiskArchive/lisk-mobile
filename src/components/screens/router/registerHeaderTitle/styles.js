import { fonts, colors } from '../../../../constants/styleGuide';
import { deviceType } from '../../../../utilities/device';

export default () => ({
  common: {
    main: {
      flex: 1,
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 16,
      marginTop: deviceType() === 'iOSx' ? -10 : -5,
      fontFamily: fonts.family.heading,
      color: colors.light.black,
    },
  },
});
