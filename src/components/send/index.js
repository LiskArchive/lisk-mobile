import React from 'react';
import { BackHandler } from 'react-native';
import connect from 'redux-connect-decorator';
import MultiStep from '../multiStep';
import Recipient from './recipient';
import AddToBookmark from './addToBookmark';
import Amount from './amount';
import Reference from './reference';
import Overview from './overview';
import Confirm from './confirm';
import Result from './result';
import { IconButton } from '../toolBox/button';
import { themes, colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  accounts: state.accounts,
  settings: state.settings,
}), {})
class Send extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      tabBarVisible: params.tabBar,
      title: params.title || 'Send',
      headerLeft: params.showButtonLeft ? (
        <IconButton
          title=''
          icon='back'
          onPress={params.action}
          style={params.styles && params.styles.back}
          color={params.theme === themes.light ? colors.light.black : colors.dark.white}
        />
      ) : (
        <IconButton
          color='transparent'
          icon='back'
        />
      ),
    };
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.subs = [
      navigation.addListener('didFocus', this.didFocus),
      navigation.addListener('willBlur', this.willBlur),
    ];

    navigation.setParams({
      showButtonLeft: false,
    });
  }

  componentDidUpdate(prevProps) {
    this.checkQuery(prevProps.navigation.getParam('query', {}));
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  checkQuery = (prevQuery = {}) => {
    const query = this.props.navigation.getParam('query', {});

    if ((prevQuery !== query) && query && (Object.keys(query).length)) {
      this.nav.reset(query);
      this.props.navigation.setParams({
        query: {},
      });
    }
  }

  didFocus = () => {
    const {
      styles,
      theme,
      navigation,
      accounts,
    } = this.props;
    navigation.setParams({ styles, theme });
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressedAndroid);

    const accountInitialization = navigation.getParam('initialize', false);
    if (accountInitialization) {
      this.nav.move({
        to: 5,
        data: {
          address: accounts.active.address,
          amount: 0.1,
          reference: 'Account initialization',
        },
      });
    } else {
      this.checkQuery();
    }
  }

  willBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressedAndroid);
  }

  finalCallback = () => {
    this.props.navigation.navigate({ routeName: 'OwnWallet' });
  }

  onBackButtonPressedAndroid = () => {
    const action = this.props.navigation.getParam('action', false);

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  }

  render() {
    const {
      styles,
      accounts,
      navigation,
      settings,
    } = this.props;

    return (
      <MultiStep
        ref={(el) => { this.nav = el; }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        finalCallback={this.finalCallback}
      >
        <Recipient
          title='form'
          navigation={navigation}
          accounts={accounts}
        />
        <AddToBookmark
          title='addToBookmark'
          navigation={navigation}
        />
        <Amount
          title='amount'
          navigation={navigation}
          currency={settings.currency}
          accounts={accounts}
        />
        <Reference
          title="reference"
          navigation={navigation}
          account={accounts.active}
        />
        <Confirm title='confirm' navigation={navigation} />
        <Overview title='overview' navigation={navigation} />
        <Result title='result' navigation={navigation} />
      </MultiStep>
    );
  }
}

export default withTheme(Send, getStyles());
