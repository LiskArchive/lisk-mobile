import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Skeleton from 'components/shared/Skeleton/Skeleton';

import getTokenRowSkeletonStyles from './TokenRowSkeleton.styles';

export default function TokenRowSkeleton({ style }) {
  const { styles } = useTheme({ styles: getTokenRowSkeletonStyles() });

  return (
    <View style={[styles.container, styles.theme.container, style]}>
      <View style={[styles.row]}>
        <Skeleton width={24} variant="circle" style={{ container: { marginRight: 8 } }} />

        <Skeleton width={64} height={8} style={{ container: { borderRadius: 2 } }} />
      </View>

      <View>
        <Skeleton
          width={148}
          height={12}
          style={{ container: { borderRadius: 2, marginBottom: 8 } }}
        />

        <Skeleton width={132} height={8} style={{ container: { borderRadius: 2 } }} />
      </View>
    </View>
  );
}
