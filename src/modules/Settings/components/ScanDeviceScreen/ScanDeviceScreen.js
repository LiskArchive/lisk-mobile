/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { View, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScanDeviceAnimation from 'assets/animations/ScanDeviceAnimation';
import NoHarmfulAppIllustration from 'assets/svgs/NoHarmfulAppIllustration';
import i18next from 'i18next';
import { P } from 'components/shared/toolBox/typography';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';

import InfoComponent from '../../../../components/shared/infoComponent';
import HarmfulAppRow from '../HarmfulAppRow';
import getStyles from './ScanDevice.styles';

const { VerifyAppsModule } = NativeModules;

export default function ScanDeviceScreen() {
  const navigation = useNavigation();
  const { styles } = useTheme({ styles: getStyles() });
  const [isLoading, setIsLoading] = useState(true);
  const [harmfulAppsList, setHarmfulAppsList] = useState([]);

  useEffect(() => {
    VerifyAppsModule.checkForHarmfulApps()
      .then((data) => {
        setIsLoading(false);
        setHarmfulAppsList(data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title={i18next.t('settings.menu.scanDevice')} onPress={navigation.goBack} />

      <View style={styles.innerContainer}>
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('settings.scanDevice.description')}
        </P>
        {harmfulAppsList.length ? (
          <View style={styles.appList}>
            <View style={styles.info}>
              <InfoComponent text="Hey" buttonText="Oh" variant="warning" />
            </View>
            {harmfulAppsList.map((app) => (
              <HarmfulAppRow key={app.packageName} packageName={app.packageName} />
            ))}
          </View>
        ) : null}
        <View style={styles.illustrationContainer}>
          {isLoading && <ScanDeviceAnimation />}
          {!isLoading && !harmfulAppsList.length && (
            <View style={styles.harmfulContainer}>
              <NoHarmfulAppIllustration size={1.5} />
              <P style={[styles.description, styles.noHarmfulText, styles.theme.description]}>
                {i18next.t('settings.scanDevice.noHarmfulText')}...
              </P>
            </View>
          )}
        </View>
        {isLoading && (
          <P style={[styles.description, styles.scanning, styles.theme.description]}>
            {i18next.t('settings.scanDevice.scanning')}...
          </P>
        )}
      </View>
    </SafeAreaView>
  );
}
