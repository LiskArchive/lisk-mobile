import React from 'react';
import { ScrollView, View, Platform } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import { H4, P } from '../../../shared/toolBox/typography';
import FingerprintOverlay from '../../../shared/fingerprintOverlay';
import ItemTitle from './itemTitle';
import SignOutButton from './signOutButton';
import SignOutModal from './signOutModal';
import { colors, themes } from '../../../../constants/styleGuide';
import withTheme from '../../../shared/withTheme';
import SwitchButton from '../../../shared/toolBox/switchButton';
import { settingsUpdated as settingsUpdatedAction } from '../../../../actions/settings';
import ModalHolder from '../../../../utilities/modal';
import { accountSignedOut as accountSignedOutAction } from '../../../../actions/accounts';
import getStyles from './styles';

@connect(
  state => ({
    settings: state.settings,
  }),
  {
    settingsUpdated: settingsUpdatedAction,
    accountSignedOut: accountSignedOutAction,
  }
)
class Settings extends React.Component {
  state = {
    error: null,
    show: false,
  };

  setError = error => {
    this.setState({ error: error.message });
  };

  showDialog = () => {
    this.setState({ error: null, show: true });
  };

  hideDialog = () => {
    this.setState({ show: false });
  };

  switchTheme = () => {
    this.props.settingsUpdated({
      theme:
        this.props.settings.theme === themes.dark ? themes.light : themes.dark,
    });
  };

  toggleIncognito = () => {
    this.props.settingsUpdated({
      incognito: !this.props.settings.incognito,
    });
  };

  signOut = () => {
    this.props.accountSignedOut();
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn', params: { signOut: true } }],
    });
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      styles, theme, navigation, settings, t
    } = this.props;

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

    return (
      <View style={[styles.container, styles.theme.container]}>
        <ScrollView style={styles.innerContainer}>
          <View style={styles.group}>
            <H4 style={[styles.subHeader, styles.theme.subHeader]}>
              {t('Security')}
            </H4>
            {settings.sensorType ? (
              <View style={[styles.item, styles.theme.item]}>
                <ItemTitle
                  navigation={navigation}
                  showDialog={this.showDialog}
                  hideDialog={this.hideDialog}
                  setError={this.setError}
                  target={target}
                  authenticate={true}
                  targetStateLabel={sensorStatus}
                  icon={
                    settings.sensorType === 'Face ID'
                      ? 'face-id-small'
                      : 'touch-id-small'
                  }
                  iconSize={settings.sensorType === 'Face ID' ? 18 : 20}
                  title={settings.sensorType}
                />
              </View>
            ) : null}

            {settings.sensorType && settings.hasStoredPassphrase ? (
              <View style={[styles.item, styles.theme.item]}>
                <ItemTitle
                  navigation={navigation}
                  target="PassphraseBackup"
                  authenticate={true}
                  showDialog={this.showDialog}
                  hideDialog={this.hideDialog}
                  setError={this.setError}
                  icon="backup"
                  title={t('Backup your passphrase')}
                  iconSize={22}
                />
              </View>
            ) : null}

            <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
              <ItemTitle
                icon="enable-incognito"
                targetStateLabel={
                  <SwitchButton
                    value={settings.incognito}
                    theme={theme}
                    onSyncPress={this.toggleIncognito}
                  />
                }
                title={t('Discreet mode')}
                description={t('Hide balance and transaction amounts.')}
              />
            </View>
          </View>

          <View style={styles.group}>
            <H4 style={[styles.subHeader, styles.theme.subHeader]}>
              {t('General')}
            </H4>
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                icon="dark-mode"
                targetStateLabel={
                  <SwitchButton
                    value={settings.theme === themes.dark}
                    theme={theme}
                    onSyncPress={this.switchTheme}
                  />
                }
                title={t('Dark mode')}
              />
            </View>

            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                icon="currency"
                title={t('Currency')}
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
                title={t('About Lisk')}
              />
            </View>

            <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
              <ItemTitle
                navigation={navigation}
                icon="terms"
                target="Terms"
                title={t('Terms of use')}
              />
            </View>
          </View>

          <View style={[styles.group, styles.signOut]}>
            <View style={[styles.item, styles.theme.item, styles.itemNoBorder]}>
              <SignOutButton
                onClick={() =>
                  ModalHolder.open({
                    title: 'Signing out',
                    component: SignOutModal,
                    callback: this.signOut,
                  })
                }
              />
            </View>
          </View>
        </ScrollView>
        {Platform.OS === 'android' && Platform.Version < 23 ? (
          <FingerprintOverlay
            onModalClosed={this.hideDialog}
            error={this.state.error}
            show={this.state.show} />
        ) : null}
      </View>
    );
  }
}

export default withTheme(translate()(Settings), getStyles());
