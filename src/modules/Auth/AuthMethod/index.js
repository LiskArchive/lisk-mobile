/* eslint-disable max-statements */
import React, { useEffect } from 'react';
import { LogBox, View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import SplashScreen from 'react-native-splash-screen';
import DocumentPicker from 'react-native-document-picker';

import { useTheme } from 'hooks/useTheme';
import PassphraseSvg from 'assets/svgs/PassphraseSvg';
import UploadSvg from 'assets/svgs/UploadSvg';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { settingsRetrieved } from '../../Settings/actions';
import getStyles from './styles';
import Splash from '../components/splash';
import CreateAccount from '../components/createAccount';
import AuthTypeItem from '../components/AuthType';

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

  const signOut = route.params?.signOut;

  const init = () => {
    SplashScreen.hide();
  };

  useEffect(() => {
    if (settings.showedIntro) {
      dispatch(settingsRetrieved());
      init();
      if (accounts.length && !route.params?.authRequired) {
        navigation.navigate('AccountsManagerScreen');
      }
    } else {
      navigation.push('Intro');
    }
  }, [accounts.length, dispatch, navigation, route.params?.authRequired, settings.showedIntro]);

  const selectEncryptedJSON = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.allFiles,
      });
      const encryptedData = await RNFS.readFile(file.uri);
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

  const createAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Splash animate={!signOut} showSimplifiedView={false} />

        <View>
          <AuthTypeItem
            illustration={<PassphraseSvg />}
            label={i18next.t('auth.setup.secret_phrase')}
            onPress={() => navigation.navigate('SecretRecoveryPhrase')}
            testID="secret-phrase"
          />

          <AuthTypeItem
            illustration={<UploadSvg />}
            label={i18next.t('auth.setup.restore_file')}
            onPress={selectEncryptedJSON}
            testID="restore-from-file"
          />
        </View>
        <CreateAccount onPress={createAccount} />
      </View>
    </SafeAreaView>
  );
}
