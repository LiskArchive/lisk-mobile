/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { LogBox, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { settingsRetrieved } from 'modules/Settings/store/actions';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H2 } from 'components/shared/toolBox/typography';
import HeaderLogo from 'components/shared/HeaderLogo/HeaderLogo';
import PassphraseSvg from 'assets/svgs/PassphraseSvg';
import UploadSvg from 'assets/svgs/UploadSvg';
import CreateAccount from '../components/CreateAccount';
import AuthTypeItem from '../components/AuthType';

import getStyles from './styles';
import { selectEncryptedFile } from '../utils/documentPicker';

// there is a warning in RNOS module. remove this then that warning is fixed
LogBox.ignoreAllLogs();

export default function AuthMethod({ route }) {
  const navigation = useNavigation();

  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const { accounts } = useAccounts();

  const { styles } = useTheme({
    styles: getStyles(),
  });

  useEffect(() => {
    if (settings.showedIntro) {
      dispatch(settingsRetrieved());

      if (accounts.length && !route.params?.authRequired) {
        navigation.navigate('AccountsManagerScreen');
      }
    } else {
      navigation.push('Intro');
    }
  }, [accounts.length, dispatch, navigation, route.params?.authRequired, settings.showedIntro]);

  const selectEncryptedJSON = async () => {
    try {
      const encryptedData = await selectEncryptedFile();
      /**
       * TODO: Confirm valid file and show necessary error if any
       */
      navigation.navigate('DecryptPhrase', {
        title: 'auth.setup.decryptPassphrase',
        encryptedData,
        successRoute: 'AccountsManagerScreen',
      });
    } catch (error) {
      // TODO: Handle error message
    }
  };

  const handleCreateAccountClick = () => navigation.navigate('Register');

  const handleGoBackClick = () => navigation.navigate('AccountsManagerScreen');

  const showBackButton = navigation.canGoBack() && accounts.length > 0;

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]} testID="auth-method-screen">
      {showBackButton && <HeaderBackButton onPress={handleGoBackClick} />}

      <View style={[styles.body]}>
        <HeaderLogo style={{ container: { marginTop: 40 } }} />

        <H2 style={[styles.title, styles.theme.title]} testID="add-account-title">
          {i18next.t('auth.setup.addAccountTitle')}
        </H2>

        <AuthTypeItem
          illustration={<PassphraseSvg />}
          label={i18next.t('auth.setup.secretPhrase')}
          onPress={() => navigation.navigate('SecretRecoveryPhrase')}
          testID="secret-phrase"
        />

        <AuthTypeItem
          illustration={<UploadSvg />}
          label={i18next.t('auth.setup.restoreFromFile')}
          onPress={selectEncryptedJSON}
          testID="restore-from-file"
        />
      </View>

      <CreateAccount onPress={handleCreateAccountClick} style={{ container: styles.footer }} />
    </SafeAreaView>
  );
}
