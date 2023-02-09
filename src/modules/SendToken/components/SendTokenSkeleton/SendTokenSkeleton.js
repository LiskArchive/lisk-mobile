import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Skeleton from 'components/shared/Skeleton/Skeleton';
import { getSendTokenSkeletonStyles } from './SendTokenSkeleton.styles';

/**
 * Skeleton UI placeholder for SendToken form loading state.
 */
export default function SendTokenSkeleton() {
  const { styles } = useTheme({ styles: getSendTokenSkeletonStyles() });

  const SKELETON_FIELDS_COUNT = 4;

  return (
    <View style={[styles.container]}>
      <Skeleton height={16} style={{ container: styles.progressBarContainer }} />

      {[...new Array(SKELETON_FIELDS_COUNT)].map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton height={16} width={80} style={{ container: styles.fieldLabelContainer }} />

          <Skeleton height={56} style={{ container: styles.fieldInputContainer }} />
        </React.Fragment>
      ))}
    </View>
  );
}
