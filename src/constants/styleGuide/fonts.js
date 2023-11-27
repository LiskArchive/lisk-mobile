const commercialFontFamily = {
  heading: 'Gilroy-Bold',
  context: 'BasierCircle-Regular',
  contextBold: 'BasierCircle-Bold',
  contextSemiBold: 'BasierCircle-SemiBold',
};

const freeFontFamily = {
  heading: 'OpenSans-Bold',
  context: 'OpenSans-Regular',
  contextBold: 'OpenSans-Bold',
  contextSemiBold: 'OpenSans-SemiBold',
};

export default {
  family: {
    ...(process.env.USE_COMMERCIAL_FONTS ? commercialFontFamily : freeFontFamily),
    recoveryPhrase: 'Dots-Regular',
    recoveryPhraseText: 'PTMono-Regular',
  },
  size: {
    h1: 26,
    h2: 24,
    h3: 22,
    h4: 20,
    base: 16,
    small: 13,
    input: 14,
  },
};
