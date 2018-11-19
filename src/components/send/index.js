import React from 'react';
import connect from 'redux-connect-decorator';
import MultiStep from '../multiStep';
import Recipient from './recipient';
import Amount from './amount';
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
      tabBarVisible: params.tabBar,
      headerLeft: params.showButtonLeft ? (
        <IconButton
          icon='back'
          title=''
          onPress={params.action}
          style={params.styles && params.styles.back}
          color={colors.light.white}
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
    const { styles, navigation } = this.props;
    this.subs = [navigation.addListener('didFocus', this.didFocus)];
    navigation.setParams({ showButtonLeft: false, styles });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  didFocus = () => {
    if (this.props.navigation.getParam('initialize', false)) {
      this.nav.move({
        to: 2,
        stepData: {
          address: this.props.account.address,
          amount: 0.1,
          reference: 'Account initialization',
        },
      });
    } else {
      this.nav.reset();
    }
  }

  finalCallback = () => {
    this.props.navigation.navigate({ routeName: 'OwnWallet' });
  }

  render() {
    const { styles, navigation } = this.props;
    return (
      <MultiStep
        ref={(el) => { this.nav = el; }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        finalCallback={this.finalCallback}
      >
        <Recipient title='form' navigation={navigation} />
        <Amount title='amount' navigation={navigation} />
        <Confirm title='confirm' navigation={navigation} />
        <Overview title='overview' navigation={navigation} />
        <Result title='result' navigation={navigation} />
      </MultiStep>
    );
  }
}

export default withTheme(Send, getStyles());
