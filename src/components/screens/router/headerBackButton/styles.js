import { deviceType } from '../../../../utilities/device';

const type = deviceType();
let marginTop = type === 'iOSx' ? -3 : 0;
if (type === 'android') {
  marginTop = 6;
}

export default () => ({
  common: {
    main: {
      width: 60,
      height: 40,
      marginTop,
    },
  },
});
