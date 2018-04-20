
import React from 'react';
import connect from 'redux-connect-decorator';
import { Button } from 'react-native-elements';
import { accountLoggedOut } from '../../actions/accounts';

@connect(() => ({}), {
  accountLoggedOut,
})
class LogoutButton extends React.Component {
	render() {
		const { accountLoggedOut } = this.props;
		return <Button title='Logout' onPress={accountLoggedOut} buttonStyle ={{backgroundColor: "transparent"}}/>;
	}
}

export default LogoutButton;
	
