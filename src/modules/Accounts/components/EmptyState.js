import React from 'react';
import {
  Platform, View, Image, ActivityIndicator
} from 'react-native';
import { translate } from 'react-i18next';
import { themes } from 'constants/styleGuide';
import emptyHomeLight from 'assets/images/home/emptyHomeLight3x.png';
import emptyHomeDark from 'assets/images/home/emptyHomeDark3x.png';
import { P } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const EmptyState = ({
  theme, styles, refreshing, t, message, style = {}
}) => (
  <View style={[styles.emptyState, style]} testID="empty-transaction-list" >
    <View style={styles.emptyStateActivityIndicator}>
      {Platform.OS === 'ios' && refreshing ? (
        <ActivityIndicator size="large" />
      ) : null}
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
