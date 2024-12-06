/* eslint-disable max-statements */
import React, { useEffect, useRef, useState } from 'react';
import { LogBox, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useTheme } from 'contexts/ThemeContext';
import { validateRecoveryPhrase } from 'modules/Auth/utils';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { settingsRetrieved, settingsUpdated } from 'modules/Settings/store/actions';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H2 } from 'components/shared/toolBox/typography';
import HeaderLogo from 'components/shared/HeaderLogo/HeaderLogo';
import RecoveryPhaseSvg from 'assets/svgs/RecoveryPhaseSvg';
import UploadSvg from 'assets/svgs/UploadSvg';
// import CreateAccount from '../CreateAccountButton/CreateAccountButton';
import AuthTypeItem from '../AuthType';

import getStyles from './styles';
import { selectEncryptedFile } from '../../utils/documentPicker';
import { retrieveAccountsPasswordMapFromKeychain } from '../../utils/recoveryPhrase';
import Version2MigrationScreen from '../Version2MigrationScreen/Version2MigrationScreen';

// there is a warning in RNOS module. remove this then that warning is fixed
LogBox.ignoreAllLogs();

export default function AuthMethod({ route }) {
  const navigation = useNavigation();
  const timeout = useRef();
  const [isScreenReady, setScreenReady] = useState(false);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [v2RecoveryPhrase, setV2RecoveryPhrase] = useState('');

  const { accounts } = useAccounts();

  const { styles } = useTheme({
    styles: getStyles(),
  });

  useEffect(() => {
    const setBiometricSensorType = async () => {
      try {
        const sensorType = await FingerprintScanner.isSensorAvailable();
        dispatch(settingsUpdated({ sensorType }));
      } catch (error) {
        dispatch(settingsUpdated({ sensorType: null }));
      }
    };

    setBiometricSensorType();
    dispatch(settingsRetrieved());
    if (accounts.length && !route.params?.authRequired) {
      navigation.navigate('AccountsManagerScreen');
    }

    // if (settings.showedIntro) {
    //   setBiometricSensorType();
    //   dispatch(settingsRetrieved());
    //   if (accounts.length && !route.params?.authRequired) {
    //     navigation.navigate('AccountsManagerScreen');
    //   }
    // } else {
    //   navigation.push('Intro');
    // }
  }, [settings.showedIntro, accounts.length, dispatch, navigation, route.params?.authRequired]);

  useEffect(() => {
    const checkVersion2Migration = async () => {
      const { password: recoveryPhrase } = await retrieveAccountsPasswordMapFromKeychain();
      const validity = validateRecoveryPhrase(recoveryPhrase);
      if (!validity.length && !accounts.length) {
        setV2RecoveryPhrase(recoveryPhrase);
      }
    };

    if (!accounts?.length && settings.showedIntro) {
      checkVersion2Migration();
    }
  }, [settings.showedIntro, accounts]);

  useEffect(() => {
    timeout.current = setTimeout(() => setScreenReady(true), 500);
    return () => clearTimeout(timeout.current);
  }, []);

  const selectEncryptedJSON = async () => {
    try {
      const encryptedData = await selectEncryptedFile(() =>
        Toast.show({
          type: 'error',
          text2: i18next.t('auth.setup.restoreFromFileErrorMessage'),
        })
      );

      if (encryptedData) {
        navigation.navigate('DecryptRecoveryPhraseScreen', {
          title: 'auth.setup.decryptRecoveryPhrase',
          encryptedData,
          successRoute: 'AccountsManagerScreen',
          enableBioAuth: true,
        });
      }
    } catch {
      Toast.show({
        type: 'error',
        text2: i18next.t('auth.setup.restoreFromFileErrorMessage'),
      });
    }
  };

  // const handleCreateAccountClick = () => navigation.navigate('Register');

  const handleGoBackClick = () => navigation.navigate('AccountsManagerScreen');

  const showBackButton = accounts.length > 0;

  if (!isScreenReady) {
    return <SafeAreaView style={[styles.container, styles.theme.container]} />;
  }

  if (v2RecoveryPhrase) {
    return <Version2MigrationScreen recoveryPhrase={v2RecoveryPhrase} />;
  }

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]} testID="auth-method-screen">
      {showBackButton && <HeaderBackButton onPress={handleGoBackClick} />}

      <View style={[styles.body]}>
        <HeaderLogo style={{ container: { marginTop: 40 } }} />

        <H2 style={[styles.title, styles.theme.title]} testID="add-account-title">
          {i18next.t('auth.setup.authMethodTitle')}
        </H2>

        <AuthTypeItem
          illustration={<RecoveryPhaseSvg />}
          label={i18next.t('auth.setup.secretPhrase')}
          onPress={() => navigation.navigate('RecoveryPhrase')}
          testID="secret-phrase"
        />

        <AuthTypeItem
          illustration={<UploadSvg />}
          label={i18next.t('auth.setup.restoreFromFile')}
          onPress={selectEncryptedJSON}
          testID="restore-from-file"
        />
      </View>

      {/* <CreateAccount onPress={handleCreateAccountClick} style={{ container: styles.footer }} /> */}
    </SafeAreaView>
  );
}
