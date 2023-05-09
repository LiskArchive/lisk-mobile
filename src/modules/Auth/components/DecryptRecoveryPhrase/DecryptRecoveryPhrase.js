/* eslint-disable max-statements */
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { translate } from 'react-i18next';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import DropDownHolder from 'utilities/alert';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import PasswordForm from '../PasswordForm';
import getStyles from './DecryptRecoveryPhrase.styles';

const DecryptRecoveryPhrase = ({ account, showsHeader = true, route, nextStep, t, navigation }) => {
  const { setAccount } = useAccounts();
  const { styles } = useTheme({ styles: getStyles });
  const { title, encryptedData } = route.params;
  const encryptedAccount = account || JSON.parse(encryptedData);

  const onSubmit = async (password) => {
    try {
      const { successRoute } = route.params;
      const { recoveryPhrase } = await decryptAccount(encryptedAccount.crypto, password);
      if (nextStep && typeof nextStep === 'function') {
        nextStep({
          password,
          address: account.metadata.address,
          recoveryPhrase,
          encryptedAccount,
        });
      } else {
        setAccount(encryptedAccount);
        navigation.navigate(successRoute);
      }
    } catch (error) {
      DropDownHolder.error(t('Error'), t('auth.setup.decryptRecoveryPhraseError'));
    }
  };

  const Wrapper = showsHeader ? View : SafeAreaView;

  return (
    <Wrapper style={[styles.container, styles.theme.wrapper]}>
      {showsHeader && <HeaderBackButton title={title} onPress={navigation.goBack} />}
      <PasswordForm account={encryptedAccount} onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default translate()(DecryptRecoveryPhrase);
