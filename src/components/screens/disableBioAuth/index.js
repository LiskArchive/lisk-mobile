import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'contexts/ThemeContext';
import { View } from 'react-native';
import i18next from 'i18next';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { getAccountPasswordFromKeyChain } from 'modules/Auth/utils/passphrase';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import CopyPassphraseToClipboard from 'components/shared/CopyPassphraseToClipboard/CopyPassphraseToClipboard';
import { settingsUpdated } from 'modules/Settings/store/actions';
import getStyles from './styles';

const DisableBioAuth = ({ route, navigation }) => {
  const [currentAccount] = useCurrentAccount();
  const title = route.params?.title ?? 'Bio Auth';
  const { styles } = useTheme({ styles: getStyles() });
  const [recoveryPhrase, setRecoveryPhrase] = useState('');

  const decryptCurrentAccount = async () => {
    const accountDetails = await getAccountPasswordFromKeyChain(currentAccount.metadata.address);
    const accountPassword = accountDetails?.password;
    if (accountPassword) {
      const { recoveryPhrase: decryptedRecoveryPhrase } = await decryptAccount(
        currentAccount.encryptedPassphrase,
        accountPassword
      );
      setRecoveryPhrase(decryptedRecoveryPhrase);
    }
  };

  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(settingsUpdated({ biometricsEnabled: false }));
    navigation.pop();
  };

  useEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: (props) => (
        <HeaderBackButton title={title} onPress={navigation.goBack} {...props} />
      ),
    });
    decryptCurrentAccount();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, styles.theme.container]}>
        <View style={styles.passphraseContainer}>
          <CopyPassphraseToClipboard passphrase={recoveryPhrase} />
        </View>

        <PrimaryButton onClick={confirm} title={i18next.t('Disable bioAuth', { title })} />
      </View>
    </View>
  );
};

export default DisableBioAuth;
