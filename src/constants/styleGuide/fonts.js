const commercialFontFamily = {
  heading: 'Gilroy-Bold',
  context: 'BasierCircle-Regular',
  contextBold: 'BasierCircle-Bold',
  contextSemiBold: 'BasierCircle-SemiBold',
  contextLight: 'BasierCircle-Regular',
};

const freeFontFamily = {
  heading: 'OpenSans-Bold',
  context: 'OpenSans-Regular',
  contextBold: 'OpenSans-Bold',
  contextSemiBold: 'OpenSans-SemiBold',
  contextLight: 'OpenSans-Regular',
};

export default {
  family: {
    ...(process.env.useCommercialFonts ? commercialFontFamily : freeFontFamily),
    passphrase: 'Dots',
    passphraseText: 'PTMono',
  },
  size: {
    h1: 26,
    h2: 24,
    h3: 22,
    h4: 19,
    base: 16,
    small: 13,
    input: 13,
  },
};
