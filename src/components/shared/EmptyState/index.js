import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import EmptyIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import { P } from 'components/shared/toolBox/typography';

import getEmptyStateStyles from './styles';

export default function EmptyState({ message, style = {} }) {
  const { styles } = useTheme({ styles: getEmptyStateStyles() });

  return (
    <View style={[styles.container, style?.container]}>
      <EmptyIllustrationSvg />
      <P style={[styles.messageText, styles.theme.messageText, style?.messageText]}>{message}</P>
    </View>
  );
}
