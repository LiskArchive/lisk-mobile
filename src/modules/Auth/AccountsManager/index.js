import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { H2, P } from 'components/shared/toolBox/typography';
import { useAccounts, useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { IconButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';

import getAccountsManagerStyles from './styles';

export default function AccountsManager({
  mode = 'screen',
  onAccountSelect,
  item: Item,
  style
}) {
  const navigation = useNavigation();

  const { accounts } = useAccounts();
  const [, setAccount] = useCurrentAccount();

  const { styles, theme } = useTheme({ styles: getAccountsManagerStyles() });

  function handleSelectAccountClick(account) {
    setAccount(account);
    navigation.navigate('Main');
    if (onAccountSelect) onAccountSelect(account);
  }

  return (
    <View
      style={[
        styles.container,
        styles.theme.container,
        style?.container
      ]}
    >
      <H2 style={[styles.title, styles.theme.title, style?.title]}>
        {i18next.t('auth.setup.manageAccounts')}
      </H2>

      {mode === 'modal' && (
        <P
          style={[
            styles.description,
            styles.theme.description,
            style?.description
          ]}
        >
          You can switch your account and also remove any account
          you&apos;re not using at the moment
        </P>
      )}

      <InfiniteScrollList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <Item
            key={item.metadata.address}
            account={item}
            onPress={() => handleSelectAccountClick(item)}
          />
        )}
        renderSpinner
        // TODO: Integrate pagination props when useAccounts
        // is refactored to use react-query.
      />

      <IconButton
        onPress={() => navigation.navigate('AuthMethod')}
        color={colors.light.ultramarineBlue}
        icon="user"
        iconStyle={styles.icon}
        iconSize={20}
        title={i18next.t('auth.setup.buttons.addAnotherAccount')}
        style={[styles.button, styles.outline, styles.theme.outline]}
      />

      <IconButton
        onPress={() => navigation.navigate('DeleteAccount')}
        color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
        icon="delete-bookmark"
        iconStyle={styles.icon}
        iconSize={20}
        titleStyle={[styles.theme.remove]}
        title={i18next.t('auth.setup.buttons.removeAccount')}
        style={[styles.button, styles.outline, styles.theme.outline]}
      />
    </View>
  );
}
