import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import MultiStep from '../multiStep';
import Confirm from './confirm';
import Success from './success';
import SafeKeeping from './safeKeeping';
import Intro from './intro';
import { Small } from '../toolBox/typography';
import styles from './styles';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';

const NavButton = props =>
  <Text {...props} style={[styles.navButton, props.disabled ? styles.disabledNavButton : null]} />;
const ActiveTitle = props => <Small style={styles.activeGroupTitle} {...props} />;
let backCallback;
class Register extends React.Component {
  state = {
    showNav: true,
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    backCallback = () => {
      params.action();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backCallback);
    return {
      headerStyle: {
        backgroundColor: '#F9FDFF',
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
      },
      headerLeft: (params && params.action) ? <IconButton
        icon='back'
        title=''
        onPress={() => {
          params.action();
        }}
        style={styles.backButton}
        color={colors.grayScale1}/> :
        null,
      headerRight: (params && params.action) ? <IconButton color='transparent' icon='back'/> : null,
    };
  };
  hideNav = () => {
    this.setState({
      showNav: false,
    });
  }
  componentDidMount() {
    this.props.navigation.addListener('willBlur', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.pop();
        return true;
      });
    });
  }
  render() {
    const { navigation } = this.props;
    const noNavStyle = this.state.showNav ? {} : { paddingBottom: 0 };
    return (
      <View style={[styles.container, noNavStyle]}>
        <MultiStep
          ref={(el) => { this.nav = el; }}
          showNav={this.state.showNav}
          navStyles={styles}
          hideSteps={true}
          groupButton={NavButton}
          activeTitle={ActiveTitle}
          backButtonTitle='Back'>
          <Intro title='create' group='1. Creating your account' navigation={navigation}></Intro>
          <SafeKeeping title='safekeeping' group='2. Saving your passphrase' navigation={navigation}></SafeKeeping>
          <Confirm title='verify' group='3. Verifying your passphrase' navigation={navigation}></Confirm>
          <Success title='success' group='3. Verifying your passphrase'
            hideNav={this.hideNav}
            navigation={navigation}></Success>
        </MultiStep>
      </View>
    );
  }
}

export default Register;
