import { View } from 'react-native';
import React from 'react';

import Skeleton from 'components/shared/Skeleton/Skeleton';

/**
 * Skeleton UI placeholder for ApplicationsStats loading state.
 */
export default function ApplicationsStatsSkeleton() {
  return (
    <View>
      <Skeleton
        width={120}
        height={24}
        style={{ container: { marginBottom: 16, marginTop: 20 } }}
      />
      <Skeleton width={120} height={24} style={{ container: { marginBottom: 16 } }} />
      <Skeleton width={120} height={24} style={{ container: { marginBottom: 24 } }} />

      <Skeleton height={96} style={{ container: { marginBottom: 16, width: '100%' } }} />
      <Skeleton height={96} style={{ container: { marginBottom: 16, width: '100%' } }} />
    </View>
  );
}
