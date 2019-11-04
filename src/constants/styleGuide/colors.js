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
  burntSieanna: '#EC6868',
  ufoGreen: '#2AD67C',
};

const light = {
  ...common,
  outgoingArrow: common.maastrichtBlue,
  headerBg: common.whiteSmoke,
};

const dark = {
  ...common,
  outgoingArrow: common.platinum,
  // dark mode's header color is not on the style guide
  headerBg: '#00152D',
  // homeHeaderBg is ultramarineBlue with 30% opacity
  homeHeaderBg: '#1b316a',
};

export default {
  light,
  dark,
};
