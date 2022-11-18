import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';

import getTokenListStyles from './styles';

export default function TokenListTabs({
  // tokens,
  lockedTokens,
  activeTab,
  onTokensClick,
  onLockedTokensClick,
}) {
  const { styles } = useTheme({
    styles: getTokenListStyles(),
  });

  return (
    <View style={[styles.tabsContainer]}>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === 0 && styles.theme.tabItemActive]}
        onPress={onTokensClick}
      >
        <P style={[styles.tabItemText, activeTab === 0 && styles.tabItemTextActive]}>
          {i18next.t('accounts.tokens')}
        </P>
      </TouchableOpacity>

      {!!lockedTokens && (
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 1 && styles.tabItemActive]}
          onPress={onLockedTokensClick}
        >
          <P style={[styles.tabItemText, activeTab === 1 && styles.tabItemTextActive]}>
            {i18next.t('accounts.lockedTokens')}
          </P>
        </TouchableOpacity>
      )}
    </View>
  );
}
