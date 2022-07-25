import React, { useEffect } from 'react';
import {
  LogBox,
  View,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from 'react-i18next';
import RNFS from 'react-native-fs';
import SplashScreen from 'react-native-splash-screen';
import DocumentPicker from 'react-native-document-picker';
import withTheme from 'components/shared/withTheme';
import PassphraseSvg from 'assets/svgs/PassphraseSvg';
import UploadSvg from 'assets/svgs/UploadSvg';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import {
  settingsRetrieved
} from '../../Settings/actions';
import getStyles from './styles';
import Splash from '../components/splash';
import CreateAccount from '../components/createAccount';
import AuthTypeItem from '../components/AuthType';

// there is a warning in RNOS module. remove this then that warning is fixed
LogBox.ignoreAllLogs();

// eslint-disable-next-line max-statements
const AuthMethod = ({
  styles,
  route,
  t,
  navigation,
}) => {
  const signOut = route.params?.signOut;
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const { accounts } = useAccounts();

  const init = () => {
    SplashScreen.hide();
  };

  useEffect(() => {
    if (settings.showedIntro) {
      dispatch(settingsRetrieved());
      init();
      if (accounts.length) {
        navigation.navigate('ManageAccount');
      }
    } else {
      navigation.push('Intro');
    }
  }, []);

  const selectEncryptedJSON = async () => {
    try {
      const file = await DocumentPicker.pickSingle({ type: DocumentPicker.types.allFiles });
      await RNFS.readFile(file.uri);
      /**
       * TODO: Confirm valid file and show necessary error if any
       */
      navigation.navigate('DecryptPhrase', { title: 'auth.setup.decryptPassphrase', address: 'lskqzpfr3uq8bm2jee5dkv4ns79uuswjzc9bbpezu', successRoute: 'SecretRecoveryPhrase' });
    } catch (error) {
      console.log(error);
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
          <AuthTypeItem illustration={<PassphraseSvg />} label={t('auth.setup.secret_phrase')} onPress={() => navigation.navigate('SecretRecoveryPhrase')} testID="secret-phrase" />
          <AuthTypeItem illustration={<UploadSvg />} label={t('auth.setup.restore_file')} onPress={selectEncryptedJSON} testID="restore-from-file" />
        </View>
        <CreateAccount onPress={createAccount} />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(
  translate()(AuthMethod),
  getStyles()
);
