/* eslint-disable no-shadow */
/* eslint-disable complexity */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { ScrollView, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { H4, P } from 'components/shared/toolBox/typography';
import FingerprintOverlay from 'components/shared/fingerprintOverlay';
import { colors, themes } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import SwitchButton from 'components/shared/toolBox/switchButton';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import app from 'constants/app';
import { ItemTitle } from './components';
import getStyles from './styles';

// eslint-disable-next-line max-statements
const Settings = ({
  styles,
  theme,
  navigation,
  settings,
  t,
  settingsUpdated,
}) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const setErrorMessage = error => {
    setError(error.message);
  };

  const showDialog = () => {
    setShow(true);
    setError(null);
  };

  const hideDialog = () => {
    setShow(false);
  };

  const switchTheme = () => {
    settingsUpdated({
      theme:
        settings.theme === themes.dark ? themes.light : themes.dark,
    });
  };

  const toggleIncognito = () => {
    settingsUpdated({
      discrete: !settings.discrete,
    });
  };

  let target = 'EnableBioAuth';

  let targetStateLabel = [t('Disabled'), colors.light.blueGray];
  if (settings.sensorType && settings.hasStoredPassphrase) {
    targetStateLabel = [
      t('Enabled'),
      theme === themes.light
        ? colors.light.maastrichtBlue
        : colors.dark.platinum,
    ];
    target = 'DisableBioAuth';
  }
  const sensorStatus = (
    <P style={{ color: targetStateLabel[1] || colors[theme].platinum }}>
      {targetStateLabel[0]}
    </P>
  );
  return <View testID='settings-screen' style={[styles.container, styles.theme.container]}>
    <ScrollView style={styles.innerContainer}>
      <View style={styles.group}>
        <H4 style={[styles.subHeader, styles.theme.subHeader]}>
          {t('Security')}
        </H4>
        {settings.sensorType ? (
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              showDialog={showDialog}
              hideDialog={hideDialog}
              setError={setErrorMessage}
              target={target}
              authenticate={true}
              targetStateLabel={sensorStatus}
              icon={
                settings.sensorType === app.faceId
                  ? 'face-id-small'
                  : 'touch-id-small'
              }
              iconSize={settings.sensorType === app.faceId ? 18 : 20}
              title={settings.sensorType}
            />
          </View>
        ) : null}

        <View style={[styles.item, styles.theme.item]}>
          <ItemTitle
            navigation={navigation}
            target="PassphraseBackup"
            showDialog={showDialog}
            hideDialog={hideDialog}
            setError={setErrorMessage}
            icon="backup"
            title={t('settings.menu.backupPassphrase')}
            iconSize={22}
          />
        </View>

        <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
          <ItemTitle
            testID="enable-incognito"
            icon="enable-incognito"
            targetStateLabel={
              <SwitchButton
                value={settings.incognito}
                theme={theme}
                onSyncPress={toggleIncognito}
              />
            }
            title={t('settings.menu.discreetMode')}
            description={t('settings.descriptions.discreetMode')}
          />
        </View>
      </View>

      <View style={styles.group}>
        <H4 style={[styles.subHeader, styles.theme.subHeader]}>
          {t('General')}
        </H4>
        <View style={[styles.item, styles.theme.item]}>
          <ItemTitle
            testID="dark-mode"
            icon="dark-mode"
            targetStateLabel={
              <SwitchButton
                value={settings.theme === themes.dark}
                theme={theme}
                onSyncPress={switchTheme}
              />
            }
            title={t('settings.menu.dark_mode')}
          />
        </View>

        <View style={[styles.item, styles.theme.item]}>
          <ItemTitle
            navigation={navigation}
            icon="currency"
            title={t('settings.menu.currency')}
            target="CurrencySelection"
            targetStateLabel={
              <P style={styles.theme.targetStateLabel}>
                {settings.currency}
              </P>
            }
          />
        </View>

      </View>

      <View style={styles.group}>
        <H4 style={[styles.subHeader, styles.theme.subHeader]}>
          {t('Info')}
        </H4>

        <View style={[styles.item, styles.theme.item]}>
          <ItemTitle
            navigation={navigation}
            target="About"
            icon="about"
            title={t('settings.menu.about')}
          />
        </View>

        <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
          <ItemTitle
            navigation={navigation}
            icon="terms"
            target="Terms"
            title={t('settings.menu.terms')}
          />
        </View>
      </View>
    </ScrollView>
    {Platform.OS === 'android' && Platform.Version < 23 ? (
      <FingerprintOverlay
        onModalClosed={hideDialog}
        error={error}
        show={show} />
    ) : null}
  </View>;
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  settingsUpdated: settingsUpdatedAction,
};

export default withTheme(translate()(
  connect(mapStateToProps, mapDispatchToProps)(Settings)
), getStyles());
