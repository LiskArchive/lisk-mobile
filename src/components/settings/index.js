import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { H1, H4 } from '../toolBox/typography';
import ItemTitle from './itemTitle';
import LogoutButton from '../logoutButton';
import styles from './styles';
import { colors } from '../../constants/styleGuide';

@connect(state => ({
  settings: state.settings,
}), {})
class Settings extends React.Component {
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
                settings.sensorType === 'Face ID' ?
                  <View style={styles.item}>
                    <ItemTitle
                      navigation={navigation}
                      target={target}
                      targetStateLabel={targetStateLabel}
                      icon='face-id-small'
                      iconSize={21}
                      title='Face ID'/>
                  </View> : null
              }
              {
                (settings.sensorType === 'Touch ID' ||
                settings.sensorType === 'Fingerprint') ?
                  <View style={styles.item}>
                    <ItemTitle
                      navigation={navigation}
                      target={target}
                      targetStateLabel={targetStateLabel}
                      icon='touch-id-small'
                      iconSize={21}
                      title='Touch ID'/>
                  </View> : null
              }
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
      </View>);
  }
}

export default Settings;
