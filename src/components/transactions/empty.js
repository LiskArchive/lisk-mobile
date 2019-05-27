import React from 'react';
import { Platform, View, Image, ActivityIndicator } from 'react-native';
import { translate } from 'react-i18next';
import emptyHomeLight from '../../assets/images/home/emptyHomeLight3x.png';
import emptyHomeDark from '../../assets/images/home/emptyHomeDark3x.png';
import { P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes } from '../../constants/styleGuide';

const EmptyState = ({
  theme,
  styles,
  refreshing,
  t,
  message,
  style = {},
}) => (
  <View style={[styles.emptyState, style]}>
    <View style={styles.emptyStateActivityIndicator}>
      {(Platform.OS === 'ios' && refreshing) ? <ActivityIndicator size="large" /> : null}
    </View>

    <View style={styles.noActivity}>
      <Image
        style={styles.empty}
        source={theme === themes.light ? emptyHomeLight : emptyHomeDark}
      />
      <P style={[styles.noTxTitle, styles.theme.noTxTitle]}>
        {message || t('You have no transactions yet.')}
      </P>
    </View>
  </View>
);

export default withTheme(translate()(EmptyState), getStyles());
