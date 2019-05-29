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

  /*
   * @TODO
   * keeping existing colors for the back-compatiblity and
   * not to break existing dynamic accesses like `colors[theme].blue`
   */
  gray5: '#eaf1f4',
  gray6: '#f9fbfd',
  navigationBg: '#FAFCFE',
  inputBorder: '#9EA8B4',
};

const dark = {
  ...common,
  outgoingArrow: common.platinum,

  gray4: '#DDEAF4',
  gray5: '#373E4F',
  navigationBg: '#00152D',
  inputBorder: '#9EA8B4',
};

export default {
  light,
  dark,
};
