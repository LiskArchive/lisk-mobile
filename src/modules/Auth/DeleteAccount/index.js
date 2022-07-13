import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { translate } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useNavigation } from '@react-navigation/native';
import AccountItem from '../components/DeleteAccountItem';
import getStyles from './styles';

const DeleteAccount = ({ styles, t, nextStep }) => {
  const { accounts } = useAccounts();
  const navigation = useNavigation();

  const selectAccount = (encryptedAccount) => {
    nextStep({ encryptedAccount });
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.wrapper}>
          <HeaderBackButton
            title={t('auth.setup.delete_account')}
            onPress={navigation.goBack}
          />
          <ScrollView style={styles.container}>
            {accounts.map((acc) => (
              <AccountItem
                key={acc.metadata.address}
                account={acc}
                onPress={() => selectAccount(acc)}
              />
            ))}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};

export default withTheme(translate()(DeleteAccount), getStyles());
