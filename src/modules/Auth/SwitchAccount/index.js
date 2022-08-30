/* eslint-disable max-len */
import React from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';
import { translate } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useAccounts, useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { IconButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import AccountItem from '../components/SwipeableAccountItem';
import getStyles from './styles';

const SwitchAccount = ({
  styles,
  t,
  navigation,
}) => {
  const { accounts } = useAccounts();
  const [account, setAccount] = useCurrentAccount();

  const selectAccount = acc => {
    setAccount(acc);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title={t('auth.setup.switchAccount')}
        onPress={navigation.goBack} />
      <ScrollView style={styles.container} >
        {accounts.map(acc =>
          <AccountItem key={acc.metadata.address} account={acc} onPress={() => selectAccount(acc)} active={acc.metadata.address === account.metadata?.address} />)}
      </ScrollView>
      <View style={styles.bottom} >
        <IconButton
          onPress={() => navigation.navigate('AuthMethod')}
          color={colors.light.ultramarineBlue}
          icon="user"
          iconStyle={styles.icon}
          iconSize={20}
          title={t('auth.setup.buttons.addAccount')}
          style={[styles.button, styles.outline, styles.theme.outline]}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(
  translate()(SwitchAccount),
  getStyles()
);
