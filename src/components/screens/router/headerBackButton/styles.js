import { deviceType } from '../../../../utilities/device';

const type = deviceType();
let normalMarginTop = type === 'iOSx' ? -3 : 0;
let safeAreaMarginTop = type === 'iOSx' ? 50 : 20;

if (type === 'android') {
  normalMarginTop = 0;
  safeAreaMarginTop = 0;
}

export default () => ({
  common: {
    main: {
      width: 60,
      height: 40,
      marginTop: normalMarginTop,
    },
    safeArea: {
      marginTop: safeAreaMarginTop,
    },
  },
});
