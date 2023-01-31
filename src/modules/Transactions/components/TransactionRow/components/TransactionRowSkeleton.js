import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Skeleton from 'components/shared/Skeleton/Skeleton';

import getTransactionRowSkeletonStyles from './TransactionRowSkeleton.styles';

/**
 * Skeleton placeholder for the TransactionRow component.
 * @param {React.CSSProperties} style - Custom styles to add to the main component
 * container (optional).
 */
export default function TransactionRowSkeleton({ style }) {
  const { styles } = useTheme({ styles: getTransactionRowSkeletonStyles() });

  return (
    <View style={[styles.container, styles.theme.container, style]}>
      <View style={[styles.row]}>
        <Skeleton width={40} variant="circle" style={{ container: { marginRight: 8 } }} />

        <View>
          <Skeleton
            width={114}
            height={12}
            style={{ container: { borderRadius: 2, marginBottom: 8 } }}
          />

          <Skeleton width={60} height={8} style={{ container: { borderRadius: 2 } }} />
        </View>
      </View>

      <View>
        <Skeleton
          width={114}
          height={12}
          style={{ container: { borderRadius: 2, marginBottom: 8 } }}
        />

        <Skeleton width={32} height={8} style={{ container: { borderRadius: 2 } }} />
      </View>
    </View>
  );
}
