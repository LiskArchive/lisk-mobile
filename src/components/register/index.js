import React from 'react';
import { View, Text } from 'react-native';
import MultiStep from '../multiStep';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import styles from './styles';

const NavButton = props => <View {...props} style={styles.navButton}></View>;

class Register extends React.Component {
  componentDidMount() {
    this.nav.move({ to: 5 });
  }

  render() {
    return (
      <View style={styles.container}>
        <MultiStep
          ref={(el) => { this.nav = el; }}
          showNav={true}
          styles={styles}
          hideSteps={true}
          interactive={true}
          groupButton={<NavButton />}
          backButtonTitle='Back'>
          <Intro title='step 1' group='page 1'></Intro>
          <SafeKeeping title='step 2' group='page 2'></SafeKeeping>
          <Confirm title='step 3' group='page 3'></Confirm>
          <Success title='step 4' group='page 4'></Success>
        </MultiStep>
      </View>
    );
  }
}

export default Register;
