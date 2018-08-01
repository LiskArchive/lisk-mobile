
import React from 'react';
import connect from 'redux-connect-decorator';
import { Button } from 'react-native-elements';
import { accountLoggedOut as accountLoggedOutAction } from '../../actions/accounts';

@connect(() => ({}), {
  accountLoggedOut: accountLoggedOutAction,
})
class LogoutButton extends React.Component {
  render() {
    const { accountLoggedOut, navigation } = this.props;
    return <Button title='Logout' onPress={() => {
      accountLoggedOut();
      navigation.navigate('Login');
    }
    } buttonStyle ={{ backgroundColor: 'transparent' }}/>;
  }
}

export default LogoutButton;

