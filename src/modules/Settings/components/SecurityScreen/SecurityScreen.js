/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';

import { themes, colors } from 'constants/styleGuide';
import { useModal } from 'hooks/useModal';
import { useTheme } from 'contexts/ThemeContext';
import Stepper from 'components/shared/Stepper';
import SwitchButton from 'components/shared/toolBox/switchButton';
import Icon from 'components/shared/toolBox/icon';
import { settingsUpdated } from 'modules/Settings/store/actions';
import DecryptRecoveryPhrase from 'modules/Auth/components/DecryptRecoveryPhrase/DecryptRecoveryPhrase';
import app from 'constants/app';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import {
  getAccountPasswordFromKeyChain,
  storeAccountPasswordInKeyChain,
} from 'modules/Auth/utils/recoveryPhrase';
import EnableBioAuth from 'components/screens/enableBioAuth';
import HeaderBackButton from 'components/navigation/headerBackButton';
import DisableBioAuth from 'components/screens/disableBioAuth';
import PhoneShakeSvg from 'assets/svgs/PhoneShakeSvg';
import ItemTitle from '../ItemTitle';

import getStyles from './SecurityScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecurityScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const settings = useSelector((state) => state.settings);

  const [account] = useCurrentAccount();

  const modal = useModal();

  const { styles, theme } = useTheme({ styles: getStyles() });

  const backupRecoveryPhrase = () =>
    navigation.navigate('BackupRecoveryPhrase', {
      account,
    });

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
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title={i18next.t('settings.menu.security')} onPress={navigation.goBack} />

      <ScrollView style={styles.innerContainer} testID={`${theme}-mode`}>
        <View style={styles.group}>
          {settings.sensorType && (
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                targetStateLabel={sensorStatus}
                icon={settings.sensorType === app.faceId ? 'face-id-small' : 'touch-id-small'}
                iconSize={settings.sensorType === app.faceId ? 18 : 20}
                title={settings.sensorType}
              />
            </View>
          )}

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              icon="backup"
              title={i18next.t('settings.menu.backupRecoveryPhrase')}
              iconSize={22}
              onPress={backupRecoveryPhrase}
              targetStateLabel={
                <Icon
                  name="forward"
                  size={16}
                  style={styles.arrowIcon}
                  color={theme === themes.light ? colors.light.blueGray : colors.dark.white}
                />
              }
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              testID="enable-incognito"
              icon="enable-incognito"
              targetStateLabel={
                <SwitchButton value={settings.discrete} onChange={toggleIncognito} />
              }
              title={i18next.t('settings.menu.discreetMode')}
              description={i18next.t('settings.menu.discreetModeDescription')}
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
      </ScrollView>
    </SafeAreaView>
  );
}
