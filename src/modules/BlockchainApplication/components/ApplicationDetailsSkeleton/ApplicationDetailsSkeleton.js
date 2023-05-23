import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Skeleton from 'components/shared/Skeleton/Skeleton';
import getStyles from './ApplicationDetailsSkeleton.styles';

export default function ApplicationDetailsSkeleton() {
  const { styles } = useTheme({
    styles: getStyles(),
  });

  return (
    <View>
      <View style={[styles.header]}>
        <Skeleton width={70} variant="circle" style={{ container: styles.logoContainer }} />
      </View>

      <View style={[styles.titleContainer]}>
        <Skeleton width={96} height={28} />
        <Skeleton width={128} height={18} style={{ container: styles.item }} />
      </View>

      <View style={[styles.body]}>
        <View style={[styles.section]}>
          <View>
            <Skeleton width={64} height={18} />
            <Skeleton width={112} height={28} style={{ container: styles.item }} />
          </View>

          <View>
            <Skeleton width={64} height={18} />
            <Skeleton width={112} height={28} style={{ container: styles.item }} />
          </View>
        </View>

        <View style={[styles.section, { marginTop: 72 }]}>
          <View>
            <Skeleton width={64} height={18} />
            <Skeleton width={112} height={28} style={{ container: styles.item }} />
          </View>

          <View>
            <Skeleton width={64} height={18} />
            <Skeleton width={112} height={28} style={{ container: styles.item }} />
          </View>
        </View>
      </View>
    </View>
  );
}
