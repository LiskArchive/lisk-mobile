import { colors, fonts, boxes } from 'constants/styleGuide';
import { deviceType } from 'utilities/device';

const type = deviceType();

let normalMarginTop = type === 'iOSx' ? -3 : 0;

if (type === 'android') {
  normalMarginTop = 0;
}

export default () => ({
  common: {
    title: {
      fontFamily: fonts.family.heading,
      fontSize: 24,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: normalMarginTop,
      paddingRight: 20,
      paddingTop: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      marginTop: normalMarginTop,
      paddingTop: 10,
    },
    flex: {
      flex: 1,
      justifyContent: 'center',
    },
    cancelButton: {
      color: colors.light.ultramarineBlue,
      marginLeft: 16,
    },
    input: {
      paddingBottom: 8,
      paddingTop: 8,
      fontFamily: fonts.family.context,
    },
  },
});
