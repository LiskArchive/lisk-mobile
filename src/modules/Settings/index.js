/* eslint-disable max-statements */
/* eslint-disable no-shadow */
/* eslint-disable complexity */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';

import { H4, P } from 'components/shared/toolBox/typography';
import FingerprintOverlay from 'components/shared/fingerprintOverlay';
import { themes } from 'constants/styleGuide';
import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import Stepper from 'components/shared/Stepper';
import SwitchButton from 'components/shared/toolBox/switchButton';
import Checkbox from 'components/shared/Checkbox';
import { settingsUpdated } from 'modules/Settings/store/actions';
import DecryptRecoveryPhrase from 'modules/Auth/components/DecryptRecoveryPhrase/DecryptRecoveryPhrase';
import app from 'constants/app';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import {
  getAccountPasswordFromKeyChain,
  storeAccountPasswordInKeyChain,
} from 'modules/Auth/utils/recoveryPhrase';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import EnableBioAuth from 'components/screens/enableBioAuth';
import HeaderBackButton from 'components/navigation/headerBackButton';
import DisableBioAuth from 'components/screens/disableBioAuth';
import PrivacySvg from 'assets/svgs/PrivacySvg';
import PhoneShakeSvg from 'assets/svgs/PhoneShakeSvg';
import { ItemTitle } from './components';

import getStyles from './styles';

export default function Settings() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const settings = useSelector((state) => state.settings);

  const [account] = useCurrentAccount();

  const modal = useModal();

  const { styles, theme } = useTheme({ styles: getStyles() });

  const setErrorMessage = (error) => {
    setError(error.message);
  };

  const showDialog = () => {
    setShow(true);
    setError(null);
  };

  const hideDialog = () => {
    setShow(false);
  };

  const backupRecoveryPhrase = () =>
    navigation.navigate('BackupRecoveryPhrase', {
      account,
    });

  const switchTheme = () =>
    dispatch(
      settingsUpdated({
        theme: settings.theme === themes.dark ? themes.light : themes.dark,
      })
    );

  const toggleUseDerivationPath = () =>
    dispatch(
      settingsUpdated({
        useDerivationPath: !settings.useDerivationPath,
      })
    );

  const toggleIncognito = () =>
    dispatch(
      settingsUpdated({
        discrete: !settings.discrete,
      })
    );

  const toggleShakePhone = () =>
    dispatch(
      settingsUpdated({
        enableShakePhone: !settings.enableShakePhone,
      })
    );

  const checkBiometricsFeature = async () => {
    const accountPassword = await getAccountPasswordFromKeyChain(account.metadata?.address);
    setBiometricsEnabled(Boolean(accountPassword && settings.sensorType));
  };

  const enableBioAuth = async (address, password) => {
    await storeAccountPasswordInKeyChain(address, password);
    modal.close();
    checkBiometricsFeature();
  };

  const toggleBiometrics = () => {
    if (biometricsEnabled) {
      modal.open(() => <DisableBioAuth onSubmit={checkBiometricsFeature} />);
    } else {
      modal.open(() => (
        <Stepper finalCallback={enableBioAuth}>
          <EnableBioAuth />
          <DecryptRecoveryPhrase
            account={account}
            route={{
              params: {
                address: account.metadata.address,
                title: 'settings.biometrics.decryptRecoveryPhraseTitle',
                description: 'settings.biometrics.decryptRecoveryPhraseDescription',
              },
            }}
            withNavigationHeader={false}
            navigation={navigation}
          />
        </Stepper>
      ));
    }
  };

  useEffect(() => {
    checkBiometricsFeature();
  }, [settings.sensorType, account.metadata.address]);

  const sensorStatus = <SwitchButton value={biometricsEnabled} onChange={toggleBiometrics} />;

  return (
    <NavigationSafeAreaView>
      <HeaderBackButton title={i18next.t('Settings')} noIcon />

      <ScrollView style={styles.innerContainer} testID={`${theme}-mode`}>
        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {i18next.t('settings.headers.security')}
          </H4>
          {settings.sensorType && (
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                showDialog={showDialog}
                hideDialog={hideDialog}
                setError={setErrorMessage}
                authenticate
                targetStateLabel={sensorStatus}
                icon={settings.sensorType === app.faceId ? 'face-id-small' : 'touch-id-small'}
                iconSize={settings.sensorType === app.faceId ? 18 : 20}
                title={settings.sensorType}
                description={i18next.t('settings.descriptions.biometrics', {
                  sensorType: settings.sensorType,
                })}
              />
            </View>
          )}

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              showDialog={showDialog}
              hideDialog={hideDialog}
              setError={setErrorMessage}
              icon="backup"
              title={i18next.t('settings.menu.backupRecoveryPhrase')}
              iconSize={22}
              onPress={backupRecoveryPhrase}
            />
          </View>

          <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
            <ItemTitle
              testID="enable-incognito"
              icon="enable-incognito"
              targetStateLabel={
                <SwitchButton value={settings.discrete} onChange={toggleIncognito} />
              }
              title={i18next.t('settings.menu.discreetMode')}
              description={i18next.t('settings.descriptions.discreetMode')}
            />
          </View>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              testID="dark-mode"
              icon={<PhoneShakeSvg width={20} height={20} />}
              targetStateLabel={
                <SwitchButton value={settings.enableShakePhone} onChange={toggleShakePhone} />
              }
              title={i18next.t('settings.menu.shakePhone')}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {i18next.t('settings.headers.general')}
          </H4>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              testID="dark-mode"
              icon="dark-mode"
              targetStateLabel={
                <SwitchButton value={settings.theme === themes.dark} onChange={switchTheme} />
              }
              title={i18next.t('settings.menu.darkMode')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon="currency"
              testID="currency"
              title={i18next.t('settings.menu.currency')}
              target="CurrencySelection"
              targetStateLabel={<P style={styles.theme.targetStateLabel}>{settings.currency}</P>}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {i18next.t('settings.headers.info')}
          </H4>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              target="About"
              testID="about"
              icon="about"
              title={i18next.t('settings.menu.about')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon="terms"
              testID="terms"
              target="Terms"
              title={i18next.t('settings.menu.terms')}
            />
          </View>

          <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
            <ItemTitle
              navigation={navigation}
              icon={<PrivacySvg />}
              testID="privacy"
              target="PrivacyPolicy"
              title={i18next.t('settings.menu.privacyPolicy')}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {i18next.t('settings.headers.advanced')}
          </H4>

          <View style={[styles.item, styles.theme.item]}>
            <Checkbox selected={!settings.useDerivationPath} onPress={toggleUseDerivationPath}>
              <P style={[styles.subtitle, styles.theme.subtitle]}>
                {i18next.t('settings.menu.enableDerivationPath')}
              </P>
            </Checkbox>
          </View>
        </View>
      </ScrollView>
      {Platform.OS === 'android' && Platform.Version < 23 ? (
        <FingerprintOverlay onModalClosed={hideDialog} error={error} show={show} />
      ) : null}
    </NavigationSafeAreaView>
  );
}
