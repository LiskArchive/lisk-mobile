/* eslint-disable no-shadow */
/* eslint-disable complexity */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { ScrollView, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { H4, P } from 'components/shared/toolBox/typography';
import FingerprintOverlay from 'components/shared/fingerprintOverlay';
import { themes } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import SwitchButton from 'components/shared/toolBox/switchButton';
import Checkbox from 'components/shared/Checkbox';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/store/actions';
import app from 'constants/app';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import HeaderBackButton from 'components/navigation/headerBackButton';
import PrivacySvg from 'assets/svgs/PrivacySvg';
import { ItemTitle } from './components';
import getStyles from './styles';
import { useModal } from '../../hooks/useModal';
import EnableBioAuth from '../../components/screens/enableBioAuth';
import DisableBioAuth from '../../components/screens/disableBioAuth';

// eslint-disable-next-line max-statements
const Settings = ({ styles, theme, navigation, settings, t, settingsUpdated }) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [account] = useCurrentAccount();
  const enableBiometricsModal = useModal(() => <EnableBioAuth />);
  const disableBiometricsModal = useModal(() => <DisableBioAuth />);

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

  const backupPassphrase = () =>
    navigation.navigate('BackupPassphrase', {
      account,
    });

  const switchTheme = () => {
    settingsUpdated({
      theme: settings.theme === themes.dark ? themes.light : themes.dark,
    });
  };

  const toggleUseDerivationPath = () =>
    settingsUpdated({
      useDerivationPath: !settings.useDerivationPath,
    });

  const toggleIncognito = () => {
    settingsUpdated({
      discrete: !settings.discrete,
    });
  };

  const toggleBiometrics = () => {
    if (settings.biometricsEnabled) {
      disableBiometricsModal.open();
    } else {
      enableBiometricsModal.open();
    }
  };

  const sensorStatus = (
    <SwitchButton value={settings.biometricsEnabled} onChange={toggleBiometrics} />
  );

  return (
    <NavigationSafeAreaView>
      <HeaderBackButton title={t('Settings')} noIcon />

      <ScrollView style={styles.innerContainer} testID={`${theme}-mode`}>
        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {t('settings.headers.security')}
          </H4>
          {settings.sensorType ? (
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                showDialog={showDialog}
                hideDialog={hideDialog}
                setError={setErrorMessage}
                authenticate={true}
                targetStateLabel={sensorStatus}
                icon={settings.sensorType === app.faceId ? 'face-id-small' : 'touch-id-small'}
                iconSize={settings.sensorType === app.faceId ? 18 : 20}
                title={settings.sensorType}
              />
            </View>
          ) : null}

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              showDialog={showDialog}
              hideDialog={hideDialog}
              setError={setErrorMessage}
              icon="backup"
              title={t('settings.menu.backupPassphrase')}
              iconSize={22}
              onPress={backupPassphrase}
            />
          </View>

          <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
            <ItemTitle
              testID="enable-incognito"
              icon="enable-incognito"
              targetStateLabel={
                <SwitchButton value={settings.discrete} onChange={toggleIncognito} />
              }
              title={t('settings.menu.discreetMode')}
              description={t('settings.descriptions.discreetMode')}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {t('settings.headers.general')}
          </H4>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              testID="dark-mode"
              icon="dark-mode"
              targetStateLabel={
                <SwitchButton value={settings.theme === themes.dark} onChange={switchTheme} />
              }
              title={t('settings.menu.darkMode')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon="currency"
              testID="currency"
              title={t('settings.menu.currency')}
              target="CurrencySelection"
              targetStateLabel={<P style={styles.theme.targetStateLabel}>{settings.currency}</P>}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>{t('settings.headers.info')}</H4>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              target="About"
              testID="about"
              icon="about"
              title={t('settings.menu.about')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon="terms"
              testID="terms"
              target="Terms"
              title={t('settings.menu.terms')}
            />
          </View>

          <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
            <ItemTitle
              navigation={navigation}
              icon={<PrivacySvg />}
              testID="privacy"
              target="PrivacyPolicy"
              title={t('settings.menu.privacyPolicy')}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subHeader, styles.theme.subHeader]}>
            {t('settings.headers.advanced')}
          </H4>

          <View style={[styles.item, styles.theme.item]}>
            <Checkbox selected={settings.useDerivationPath} onPress={toggleUseDerivationPath}>
              <P style={[styles.subtitle, styles.theme.subtitle]}>
                {t('settings.menu.enableDerivationPath')}
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
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  settingsUpdated: settingsUpdatedAction,
};

export default withTheme(
  translate()(connect(mapStateToProps, mapDispatchToProps)(Settings)),
  getStyles()
);
