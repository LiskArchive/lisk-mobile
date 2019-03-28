import { deviceType } from '../../../utilities/device';

const type = deviceType();
let marginTop = type === 'iOSx' ? 7 : 10;
if (type === 'android') {
  marginTop = 13;
}
export default () => ({
  common: {
    title: {
      margin: 0,
    },
    button: {
      margin: 0,
      width: 24,
      height: 24,
      borderRadius: 25,
      marginRight: 15,
      marginTop,
      paddingLeft: 6,
    },
  },
});
