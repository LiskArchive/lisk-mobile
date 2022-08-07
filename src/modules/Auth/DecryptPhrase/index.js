/* eslint-disable max-statements */
import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks/useTheme';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import { translate } from 'react-i18next';
import DropDownHolder from 'utilities/alert';
import {
  useAccounts,
} from 'modules/Accounts/hooks/useAccounts';
import PasswordForm from '../components/PasswordForm';
import getStyles from './styles';

const DecryptPhrase = ({
  account, route, nextStep, t
}) => {
  const navigation = useNavigation();
  const { setAccount } = useAccounts();
  const { styles } = useTheme({ styles: getStyles });

  const { title, encryptedData } = route.params;
  let encryptedAccount;
  if (account) {
    encryptedAccount = account;
  } else {
    encryptedAccount = JSON.parse(encryptedData);
  }

  const onSubmit = async (password) => {
    try {
      const { successRoute } = route.params;
      const decryptedAccount = await decryptAccount(encryptedAccount.encryptedPassphrase, password);
      if (nextStep && typeof nextStep === 'function') {
        nextStep({
          recoveryPhrase: decryptedAccount,
          encryptedAccount,
        });
      } else {
        setAccount(encryptedAccount);
        navigation.navigate(successRoute);
      }
    } catch (error) {
      DropDownHolder.error(t('Error'), t('auth.setup.decryptPassphraseError'));
    }
  };

  return <SafeAreaView style={[styles.container, styles.theme.wrapper]} >
    <HeaderBackButton
      title={title}
      onPress={navigation.goBack}
    />
    <PasswordForm address={encryptedAccount.metadata.address} onSubmit={onSubmit} />
  </SafeAreaView>;
};

export default translate()(DecryptPhrase);
