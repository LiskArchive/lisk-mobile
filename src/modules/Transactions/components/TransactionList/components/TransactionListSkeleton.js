import React from 'react';
import { View } from 'react-native';

import TransactionRowSkeleton from '../../TransactionRow/components/TransactionRowSkeleton';

/**
 * Skeleton UI placeholder for TransactionList loading state.
 */
export default function TransactionListSkeleton() {
  const skeletonsCount = 3;

  return (
    <View>
      {[...new Array(skeletonsCount)].map((_, index) => (
        <TransactionRowSkeleton
          key={index}
          style={{ marginBottom: index < skeletonsCount ? 16 : 0 }}
        />
      ))}
    </View>
  );
}
