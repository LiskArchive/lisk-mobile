import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { translate } from 'react-i18next';
import MultiStep from '../../shared/multiStep';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import { Small } from '../../shared/toolBox/typography';
import styles from './styles';
import progressBar from '../../shared/progressBar';

const NavButton = props => (
  <Text
    {...props}
    style={[styles.navButton, props.disabled ? styles.disabledNavButton : null]}
  />
);
const ActiveTitle = props => (
  <Small style={styles.activeGroupTitle} {...props} />
);
class Register extends React.Component {

  state = {
    showNav: true,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressedAndroid
    );
  }

  componentWillUnmount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressedAndroid
    );
  }

  onBackButtonPressedAndroid = () => {
    const action = this.props.route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  };

  hideNav = () => {
    this.setState({
      showNav: false,
    });
  };

  render() {
    const { navigation, route, t } = this.props;
    const noNavStyle = this.state.showNav ? {} : { paddingBottom: 0 };
    return (
      <View style={[styles.container, noNavStyle]}>
        <MultiStep
          progressBar={progressBar}
          ref={el => {
            this.nav = el;
          }}
          showNav={this.state.showNav}
          navStyles={styles}
          hideSteps={true}
          groupButton={NavButton}
          activeTitle={ActiveTitle}
          showProgressBar
          progressStepContainerStyle={styles.progressStepContainer}
          backButtonTitle="Back"
        >
          <Intro
            title="create"
            group={t('1. Creating your account')}
            navigation={navigation}
            route={route}
          />
          <SafeKeeping
            title="safekeeping"
            group={t('2. Saving your passphrase')}
            navigation={navigation}
            route={route}
          />
          <Confirm
            title="verify"
            group={t('3. Verifying your passphrase')}
            navigation={navigation}
            route={route}
          />
          <Success
            title="success"
            group={t('4. Security reminder')}
            hideNav={this.hideNav}
            navigation={navigation}
          />
        </MultiStep>
      </View>
    );
  }
}

export default translate()(Register);
