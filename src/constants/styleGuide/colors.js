const common = {
  black: '#000',
  white: '#fff',
  BTC: '#EC8D08',
  ultramarineBlue: '#4070F4',
  maastrichtBlue: '#0C142D',
  slateGray: '#71778B',
  blueGray: '#8A8CA2',
  ghost: '#BEC1CD',
  platinum: '#E1E3EA',
  mystic: '#EDF0F5',
  whiteSmoke: '#F5F7FA',
  burntSieanna: '#EC6968',
  ufoGreen: '#2AD67C',
};

const light = {
  ...common,
  outgoingArrow: common.maastrichtBlue,
  headerBg: common.whiteSmoke,
  ufoGreenTx: '#DFF9EB', // ufoGreen with 0.15 opacity - using setColorOpacity helper makes the color overlap itelf
};

const dark = {
  ...common,
  outgoingArrow: common.platinum,
  // dark mode's header color is not on the style guide
  headerBg: '#00152D',
  // homeHeaderBg is ultramarineBlue with 30% opacity
  homeHeaderBg: '#1b316a',
  ufoGreenTx: '#DFF9EB',
};

export default {
  light,
  dark,
};
