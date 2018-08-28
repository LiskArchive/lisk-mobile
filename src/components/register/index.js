import React from 'react';
import { View, Text } from 'react-native';
import MultiStep from '../multiStep';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import { H4 } from '../toolBox/typography';
import styles from './styles';

const NavButton = props =>
  <Text {...props} style={[styles.navButton, props.disabled ? styles.disabledNavButton : null]} />;
const ActiveTitle = props => <H4 style={styles.activeGroupTitle} {...props} />;

class Register extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MultiStep
          ref={(el) => { this.nav = el; }}
          showNav={true}
          navStyles={styles}
          hideSteps={true}
          interactive={true}
          groupButton={NavButton}
          activeTitle={ActiveTitle}
          backButtonTitle='Back'>
          <Intro title='create' group='1. Creating your account'></Intro>
          <SafeKeeping title='safekeeping' group='2. Saving your passphrase'></SafeKeeping>
          <Confirm title='verify' group='3. Verifying your passphrase'></Confirm>
          <Success title='success' group='3. Verifying your passphrase'></Success>
        </MultiStep>
      </View>
    );
  }
}

export default Register;
