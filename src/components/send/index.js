import React from 'react';
import connect from 'redux-connect-decorator';
import MultiStep from '../multiStep';
import Form from './form';
import Overview from './overview';
import Confirm from './confirm';
import Result from './result';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  account: state.accounts.active,
}), {})
class Send extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarVisible: !(params && params.tabBar),
      headerLeft: (params && params.showButtonLeft) ? <IconButton
      icon='back'
      title=''
      onPress={() => {
        params.action();
      }}
      style={params && params.styles.back}
      color={colors.white} /> : <IconButton color='transparent' icon='back'/>,
    };
  };

  componentDidMount() {
    const { styles, navigation } = this.props;
    this.subs = [
      navigation.addListener('didFocus', () => this.didFocus()),
    ];
    navigation.setParams({ showButtonLeft: false, styles });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  didFocus() {
    const { navigation } = this.props;
    if (navigation.getParam('initialize', false)) {
      this.nav.move({
        to: 2,
        stepData: {
          address: this.props.account.address,
          amount: 0.1,
          reference: 'Account initialization',
        },
      });
    } else this.nav.reset();
  }

  render() {
    const { styles, navigation } = this.props;
    return (<MultiStep
        finalCallback={() => {
          navigation.navigate({ routeName: 'OwnWallet' });
        }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        ref={(el) => { this.nav = el; }}>
        <Form title='form' navigation={navigation}/>
        <Confirm title='confirm' navigation={navigation} />
        <Overview title='overview' navigation={navigation} />
        <Result title='result' navigation={navigation}/>
      </MultiStep>);
  }
}

export default withTheme(Send, getStyles());
