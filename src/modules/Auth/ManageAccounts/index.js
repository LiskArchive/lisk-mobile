import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { H2 } from 'components/shared/toolBox/typography';
import { useAccounts, useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { IconButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import AccountItem from '../components/AccountItem';

import getManageAccountsStyles from './styles';

export default function ManageAccounts() {
  const navigation = useNavigation();

  const { accounts } = useAccounts();
  const [, setAccount] = useCurrentAccount();

  const { styles, theme } = useTheme({ styles: getManageAccountsStyles() });

  const selectAccount = account => {
    setAccount(account);
    navigation.navigate('Main');
  };

  return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <ScrollView style={styles.container} >
          <View style={[styles.body]}>
            <H2 style={styles.title} >{i18next.t('auth.setup.manageAccounts')}</H2>

            {accounts.map(account =>
              <AccountItem
               key={account.metadata.address}
               account={account}
               onPress={() => selectAccount(account)}
              />)}
          </View>
        </ScrollView>

        <View style={styles.bottom} >
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
      </View>
  );
}
