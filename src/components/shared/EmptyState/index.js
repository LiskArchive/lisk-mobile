import React from 'react';
import {
  Platform, View, Image, ActivityIndicator
} from 'react-native';

import { themes } from 'constants/styleGuide';
import { useTheme } from 'hooks/useTheme';
import emptyHomeLight from 'assets/images/home/emptyHomeLight3x.png';
import emptyHomeDark from 'assets/images/home/emptyHomeDark3x.png';
import { P } from 'components/shared/toolBox/typography';
import getEmptyStateStyles from './styles';

export default function EmptyState({
  refreshing,
  message,
  style = {}
}) {
  const { styles, theme } = useTheme({ styles: getEmptyStateStyles() });

  return (
    <View style={[styles.container, style?.container]} >
      <View style={[styles.activityIndicator, style?.activityIndicator]}>
        {Platform.OS === 'ios' && refreshing && (
          <ActivityIndicator size="large" />
        )}
      </View>

      <View style={[styles.noActivity, style?.noActivity]}>
        <Image
          style={[styles.image, style?.image]}
          source={theme === themes.light ? emptyHomeLight : emptyHomeDark}
        />

        <P
          style={[
            styles.messageText,
            styles.theme.messageText,
            style?.messageText
          ]}
        >
          {message}
        </P>
      </View>
    </View>
  );
}

// t('You have no transactions yet.')
