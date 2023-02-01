import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Skeleton from 'components/shared/Skeleton/Skeleton';

import getApplicationRowSkeletonStyles from './ApplicationRowSkeleton.styles';

/**
 * Skeleton placeholder for the ApplicationRow component.
 * @param {React.CSSProperties} style - Custom styles to add to the main component
 * container (optional).
 */
export default function ApplicationRowSkeleton({ style }) {
  const { styles } = useTheme({ styles: getApplicationRowSkeletonStyles() });

  return (
    <View style={[styles.container, styles.theme.container, style]}>
      <View style={[styles.row]}>
        <Skeleton width={40} variant="circle" style={{ container: { marginRight: 16 } }} />

        <Skeleton width={114} height={12} style={{ container: { borderRadius: 2 } }} />
      </View>

      <Skeleton width={24} height={12} style={{ container: { borderRadius: 2 } }} />
    </View>
  );
}
