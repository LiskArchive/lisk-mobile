import React, { useEffect } from 'react';
import {
  LogBox,
  View,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { translate } from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import withTheme from 'components/shared/withTheme';
import PassphraseSvg from 'assets/svgs/PassphraseSvg';
import UploadSvg from 'assets/svgs/UploadSvg';
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
}) => {
  const signOut = route.params?.signOut;
  const dispatch = useDispatch();

  const init = () => {
    SplashScreen.hide();
  };

  useEffect(() => {
    dispatch(settingsRetrieved());
    init();
  }, []);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Splash animate={!signOut} showSimplifiedView={false} />
        <View>
          <AuthTypeItem illustration={<PassphraseSvg />} label={t('auth.setup.secret_phrase')} />
          <AuthTypeItem illustration={<UploadSvg />} label={t('auth.setup.restore_file')} />
        </View>
        <CreateAccount />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(
  translate()(AuthMethod),
  getStyles()
);
