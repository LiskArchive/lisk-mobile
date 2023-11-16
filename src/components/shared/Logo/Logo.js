import React from 'react';
import { View, Image } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';
import { getInitials } from 'utilities/helpers';

import getStyles from './Logo.styles';

export default function Logo({ uri, name, size = 40, style }) {
  const { styles } = useTheme({ styles: getStyles(size) });

  if (uri) {
    return <Image source={{ uri }} style={[styles.image, style]} />;
  }

  if (name) {
    const initials = getInitials(name);

    return (
      <View style={[styles.initialsContainer, style]}>
        <P style={styles.initials}>{initials}</P>
      </View>
    );
  }

  return null;
}
