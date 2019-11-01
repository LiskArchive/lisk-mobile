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
import { IconButton } from '../../shared/toolBox/button';
import { colors } from '../../../constants/styleGuide';
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
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerStyle: {
        backgroundColor: colors.light.headerBg,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
      },
      headerLeft: params.showButtonLeft ? (
        <IconButton
          icon="back"
          title={params.backButtonTitle || ''}
          onPress={() => (params.action ? params.action() : navigation.pop())}
          style={styles.backButton}
          color={colors.light.slateGray}
        />
      ) : (
        <IconButton color="transparent" icon="back" />
      ),
      headerRight: <IconButton color="transparent" icon="back" />,
    };
  };

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
    const action = this.props.navigation.getParam('action', false);

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
    const { navigation, t } = this.props;
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
          ></Intro>
          <SafeKeeping
            title="safekeeping"
            group={t('2. Saving your passphrase')}
            navigation={navigation}
          ></SafeKeeping>
          <Confirm
            title="verify"
            group={t('3. Verifying your passphrase')}
            navigation={navigation}
          ></Confirm>
          <Success
            title="success"
            group={t('4. Security reminder')}
            hideNav={this.hideNav}
            navigation={navigation}
          ></Success>
        </MultiStep>
      </View>
    );
  }
}

export default translate()(Register);
