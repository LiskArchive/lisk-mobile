import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { H1, H4 } from '../toolBox/typography';
import FingerprintOverlay from '../fingerprintOverlay';
import ItemTitle from './itemTitle';
import LogoutButton from '../logoutButton';
import styles from './styles';
import { colors } from '../../constants/styleGuide';

@connect(state => ({
  settings: state.settings,
}), {})
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

  render() {
    const { navigation, settings } = this.props;
    let target = 'EnableBioAuth';

    const targetStateLabel = ['Off', colors.black];
    if (settings.sensorType && settings.hasStoredPassphrase) {
      targetStateLabel[0] = 'On';
      targetStateLabel[1] = colors.success1;
      target = 'DisableBioAuth';
    }

    return (
      <View style={styles.container}>
        <H1>Settings</H1>
        {
          settings.sensorType ?
            <View style={styles.group}>
              <H4>Security</H4>
              {
                settings.sensorType ?
                  <View style={styles.item}>
                    <ItemTitle
                      navigation={navigation}
                      showDialog={this.showDialog}
                      hideDialog={this.hideDialog}
                      setError={this.setError}
                      target={target}
                      authenticate={true}
                      targetStateLabel={targetStateLabel}
                      icon={settings.sensorType === 'Face ID' ? 'face-id-small' : 'touch-id-small'}
                      iconSize={21}
                      title={settings.sensorType}/>
                  </View> : null
              }
            </View> : null
        }
        {
          (settings.sensorType && settings.hasStoredPassphrase) ?
            <View style={styles.item}>
              <ItemTitle
                navigation={navigation}
                target='PassphraseBackup'
                authenticate={true}
                showDialog={this.showDialog}
                hideDialog={this.hideDialog}
                setError={this.setError}
                icon='backup'
                iconSize={21}
                title='Backup your passphrase'/>
            </View> : null
        }
        <View style={styles.group}>
          <H4>About</H4>
          <View style={styles.item}>
            <ItemTitle
              navigation={navigation}
              target='About'
              icon='about'
              iconSize={21}
              title='About Lisk'/>
          </View>
          <View style={styles.item}>
            <ItemTitle
              navigation={navigation}
              icon='terms'
              target='Terms'
              iconSize={21}
              title='Terms of use'/>
          </View>
          <View style={styles.item}>
            <LogoutButton navigation={navigation} />
          </View>
        </View>
        <FingerprintOverlay error={this.state.error} show={this.state.show} />
      </View>);
  }
}

export default Settings;
