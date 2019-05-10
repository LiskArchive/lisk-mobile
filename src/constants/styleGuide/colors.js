const common = {
  black: '#000',
  white: '#fff',
  brandingBlue: '#013165',
  actionBlue: '#17499B',
  actionBlueAccent: '#3C7FB4',
  actionRed: '#C80039',
  actionRedAccent: '#ff6236',
  BTC: '#EC8D08',
};

const light = {
  ...common,
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

  /*
   * @TODO
   * keeping existing colors for the back-compatiblity and
   * not to break existing dynamic accesses like `colors[theme].blue`
   */
  blue: '#2475b9',
  green: '#2DB390',
  yellow: '#FFB533',
  red: '#C80039',
  gray1: '#3c5068',
  gray2: '#74869b',
  gray3: '#8399aa',
  gray4: '#94a2ab',
  gray5: '#eaf1f4',
  gray6: '#f9fbfd',
  incomingBg: '#E4F5F1',
  boxBg: '#F5FBFE',
  sendBalanceBg: '#EFF4F9',
  navigationBg: '#FAFCFE',
  inputBorder: '#9EA8B4',
  /* /@TODO */
};

const dark = {
  ...common,
  blue: '#49ACFF',
  green: '#49C4A4',
  yellow: '#FFBA40',
  red: '#ED1313',
  gray1: '#74869B',
  gray2: '#9EA8B4',
  gray3: '#D9E7F1',
  gray4: '#DDEAF4',
  gray5: '#373E4F',
  gray6: '#E1E3EB',
  screenBgNavy: '#01071E',
  incomingBg: '#0B2131',
  boxBg: '#011832',
  sendBalanceBg: '#011832',
  navigationBg: '#00152D',
  inputBorder: '#9EA8B4',
};

export default {
  light,
  dark,
};
