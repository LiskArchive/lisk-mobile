const common = {
  black: '#000',
  white: '#fff',
  brandingBlue: '#013165',
  actionBlue: '#17499B',
  actionBlueAccent: '#3C7FB4',
  actionRed: '#C80039',
  actionRedAccent: '#ff6236',
};

const light = {
  ...common,
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
};

const dark = {
  ...common,
  tabBarBgNavy: '#00152D',
  screenBgNavy: '#01071E',
  blue: '#49ACFF',
  green: '#49C4A4',
  yellow: '#FFBA40',
  red: '#ED1313',
  gray1: '#74869B',
  gray2: '#9EA8B4',
  gray3: '#D9E7F1',
  gray4: '#DDEAF4',
  gray5: '#373E4F', // @TODO: this is also used in 320-dark-mode-settings-screen branch with the same name
};

export default {
  light,
  dark,
};
