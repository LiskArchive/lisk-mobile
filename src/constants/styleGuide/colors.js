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
  russianBlack: '#1C1C1E',
  neroBlack: '#1C1C1C',
  sapphireBlue: '#1C316A',
};

const light = {
  ...common,
  outgoingArrow: common.maastrichtBlue,
  headerBg: common.whiteSmoke,
};

const dark = {
  ...common,
  outgoingArrow: common.platinum,
  headerBg: common.russianBlack,
  homeHeaderBg: common.sapphireBlue,
  mainBg: common.black,
  footerBg: common.neroBlack,
  textInputBg: common.russianBlack,
};

export default {
  light,
  dark,
};
