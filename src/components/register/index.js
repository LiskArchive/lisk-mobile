import React from 'react';
import MultiStep from '../multiStep';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import styles from './styles';

class Register extends React.Component {
  componentDidMount() {
    this.nav.move({ to: 5 });
  }

  render() {
    return (
      <MultiStep
        ref={(el) => { this.nav = el; }}
        showNav={true}
        styles={styles}
        hideSteps={true}
        interactive={true}
        backButtonTitle='Back'>
        <Intro title='step 1' group='page 1'></Intro>
        <SafeKeeping title='step 2' group='page 2'></SafeKeeping>
        <Confirm title='step 3' group='page 3'></Confirm>
        <Success title='step 4' group='page 4'></Success>
      </MultiStep>
    );
  }
}

export default Register;
