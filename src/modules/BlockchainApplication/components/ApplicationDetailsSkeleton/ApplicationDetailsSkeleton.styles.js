import { Platform } from 'react-native';

import { colors, boxes } from 'constants/styleGuide';

export default function getApplicationDetailsSkeletonStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      header: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomColor: colors.light.whiteSmoke,
        borderBottomWidth: 1,
        height: 148,
      },
      body: {
        flex: 1,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
        marginTop: 48,
      },
      logoContainer: {
        marginBottom: Platform.select({ ios: -32, android: 10 }),
      },
      titleContainer: {
        alignItems: 'center',
        marginTop: 48,
      },
      section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      item: {
        marginTop: 8,
      },
    },
  };
}
