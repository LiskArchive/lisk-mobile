/* eslint-disable max-len */
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { translate } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { IconButton } from 'components/shared/toolBox/button';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { colors } from 'constants/styleGuide';
import AccountItem from '../components/DeleteAccountItem';
import getStyles from './styles';
import RemoveAccountConfirmation from '../RemoveAccountConfirmation';

const DeleteAccount = ({ styles, t, navigation }) => {
  const { accounts, deleteAccountByAddress } = useAccounts();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();

  const selectAccount = (acc) => {
    setSelectedAccount(acc);
    setShowConfirm(true);
  };

  const deleteAccount = (acc) => {
    deleteAccountByAddress(acc.metadata.address);
    navigation.goBack();
  };

  const closeConfirmation = () => {
    setShowConfirm(false);
    setSelectedAccount(undefined);
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      {selectedAccount && showConfirm ? (
        <View style={styles.wrapper}>
          <IconButton
            icon="cross"
            size={25}
            onClick={closeConfirmation}
            style={styles.closeIcon}
            color={colors.dark.ultramarineBlue}
          />
          <RemoveAccountConfirmation
            onContinue={() => deleteAccount(selectedAccount)}
            encryptedJson={selectedAccount}
          />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <HeaderBackButton
            title={t('auth.setup.delete_account')}
            onPress={navigation.goBack}
          />
          <ScrollView style={styles.container}>
            {accounts.map((acc) => (
              <AccountItem
                key={acc.metadata.address}
                username={acc.metadata.name}
                address={acc.metadata.address}
                onPress={() => selectAccount(acc)}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default withTheme(translate()(DeleteAccount), getStyles());
