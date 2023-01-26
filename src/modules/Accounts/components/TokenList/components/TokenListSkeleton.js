import React from 'react';
import { View } from 'react-native';

import TokenRowSkeleton from '../../TokenRow/components/TokenRowSkeleton';

export default function TokenListSkeleton() {
  const skeletonsCount = 2;

  return (
    <View>
      {[...new Array(skeletonsCount)].map((_, index) => (
        <TokenRowSkeleton key={index} style={{ marginBottom: index < skeletonsCount ? 16 : 0 }} />
      ))}
    </View>
  );
}
