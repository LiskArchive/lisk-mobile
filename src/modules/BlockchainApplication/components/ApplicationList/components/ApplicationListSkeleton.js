import React from 'react';
import { View } from 'react-native';

import ApplicationRowSkeleton from '../../ApplicationRow/components/ApplicationRowSkeleton';

/**
 * Skeleton UI placeholder for ApplicationList loading state.
 * @param {React.CSSProperties} style - Custom styles to add to the main component
 * container (optional).
 */
export default function ApplicationListSkeleton({ style }) {
  const skeletonsCount = 5;

  return (
    <View style={style}>
      {[...new Array(skeletonsCount)].map((_, index) => (
        <ApplicationRowSkeleton
          key={index}
          style={{ marginBottom: index < skeletonsCount ? 16 : 0 }}
        />
      ))}
    </View>
  );
}
