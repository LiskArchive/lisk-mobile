import React from 'react';
import { View, Platform } from 'react-native';
import connect from 'redux-connect-decorator';
import { accountSignedOut as accountSignedOutAction } from '../../actions/accounts';
import { H1, H4, P } from '../toolBox/typography';
import FingerprintOverlay from '../fingerprintOverlay';
import ItemTitle from './itemTitle';
import SignOutButton from '../signOutButton';
import { colors, themes } from '../../constants/styleGuide';
import currencies from '../../constants/currencies';
import withTheme from '../withTheme';
import SwitchButton from './switchButton';
import Picker from '../picker'; // eslint-disable-line
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import getStyles from './styles';

@connect(state => ({
  settings: state.settings,
}), {
  accountSignedOut: accountSignedOutAction,
  settingsUpdated: settingsUpdatedAction,
})
class Settings extends React.Component {
  state = {
    error: null,
    show: false,
  }

  setError = (error) => {
    this.setState({ error: error.message });
  }

  showDialog = () => {
    this.setState({ error: null, show: true });
  }

  hideDialog = () => {
    this.setState({ show: false });
  }

  changeCurrency = (currency) => {
    this.props.settingsUpdated({
      currency,
    });
  }

  switchTheme = () => {
    this.props.settingsUpdated({
      theme: this.props.settings.theme === themes.dark ? themes.light : themes.dark,
    });
  }

  toggleIncognito = () => {
    this.props.settingsUpdated({
      incognito: !this.props.settings.incognito,
    });
  }

  render() {
    const {
      styles, theme, navigation, settings,
    } = this.props;

    let target = 'EnableBioAuth';

    const targetStateLabel = ['Off', theme === themes.light ? colors.light.black : colors.dark.gray4];
    if (settings.sensorType && settings.hasStoredPassphrase) {
      targetStateLabel[0] = 'On';
      targetStateLabel[1] = colors[theme].green;
      target = 'DisableBioAuth';
    }
    const sensorStatus = <P style={{ color: targetStateLabel[1] || colors[theme].gray1 }}>
      {targetStateLabel[0]}
    </P>;

    return (
      <View style={[styles.container, styles.theme.container]}>
        <H1 style={styles.theme.header}>Settings</H1>
        <View style={styles.group}>
          <H4 style={styles.theme.subHeader}>Security</H4>
          {
            settings.sensorType ?
              <View style={[styles.item, styles.theme.item]}>
                <ItemTitle
                  navigation={navigation}
                  showDialog={this.showDialog}
                  hideDialog={this.hideDialog}
                  setError={this.setError}
                  target={target}
                  authenticate={true}
                  targetStateLabel={sensorStatus}
                  icon={settings.sensorType === 'Face ID' ? 'face-id-small' : 'touch-id-small'}
                  iconSize={settings.sensorType === 'Face ID' ? 18 : 20}
                  title={settings.sensorType}/>
              </View> : null
          }
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              icon='enable-incognito'
              iconSize={20}
              targetStateLabel={
                <SwitchButton
                  style={styles.switch}
                  value={settings.incognito}
                  theme={theme}
                  onSyncPress={this.toggleIncognito} />
              }
              title='Incognito mode'/>
          </View>
        </View>
        {
          (settings.sensorType && settings.hasStoredPassphrase) ?
            <View style={[styles.item, styles.theme.item]}>
              <ItemTitle
                navigation={navigation}
                target='PassphraseBackup'
                authenticate={true}
                showDialog={this.showDialog}
                hideDialog={this.hideDialog}
                setError={this.setError}
                icon='backup'
                iconSize={20}
                title='Backup your passphrase'/>
            </View> : null
        }
        <View style={styles.group}>
          <H4 style={styles.theme.subHeader}>General</H4>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              target='About'
              icon='about'
              iconSize={20}
              title='About Lisk'/>
          </View>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              icon='dark-mode'
              iconSize={20}
              targetStateLabel={
                <SwitchButton
                  style={styles.switch}
                  value={settings.theme === themes.dark}
                  theme={theme}
                  onSyncPress={this.switchTheme} />
              }
              title='Dark mode'/>
          </View>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon='terms'
              iconSize={20}
              title='Currency'
              targetStateLabel={
                <Picker
                  options={currencies}
                  value={settings.currency}
                  onChange={this.changeCurrency}
                  valueWrapper={P}
                  valueStyle={{
                    color: theme === themes.light ? colors.light.black : colors.dark.gray4,
                  }}
                />
              } />
          </View>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon='terms'
              target='Terms'
              iconSize={20}
              title='Terms of use'/>
          </View>
          <View style={[styles.item, styles.theme.item]}>
            <SignOutButton navigation={navigation} signOut={this.props.accountSignedOut} />
          </View>
        </View>
        {
          Platform.OS === 'android' ?
          <FingerprintOverlay error={this.state.error} show={this.state.show} /> : null
        }
      </View>
    );
  }
}

export default withTheme(Settings, getStyles());
