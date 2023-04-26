/* eslint-disable no-bitwise */
export const isColorBright = (hexCode) => {
  const color = hexCode.substring(1); // strip #
  const rgb = parseInt(color, 16); // convert hex to decimal
  const red = (rgb >> 16) & 0xff; // extract red
  const green = (rgb >> 8) & 0xff; // extract green
  const blue = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709

  return luma > 40;
};
