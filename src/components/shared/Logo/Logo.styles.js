import { colors } from 'constants/styleGuide';

export default function getLogoStyles(size) {
  return {
    common: {
      image: {
        borderRadius: 50,
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      initialsContainer: {
        width: size,
        height: size,
        borderRadius: 50,
        backgroundColor: colors.light.silverGrey,
        justifyContent: 'center',
        alignItems: 'center',
      },
      initials: {
        color: colors.light.zodiacBlue,
        fontSize: size / 2.5,
        fontWeight: 'bold',
      },
    },
  };
}
