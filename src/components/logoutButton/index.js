
import React from 'react';
import connect from 'redux-connect-decorator';
import { NavigationActions } from 'react-navigation';
import { LabelButton } from '../toolBox/button';
import { accountLoggedOut as accountLoggedOutAction } from '../../actions/accounts';
import styles from './styles';

@connect(() => ({}), {
  accountLoggedOut: accountLoggedOutAction,
})
class LogoutButton extends React.Component {
  render() {
    const { accountLoggedOut, navigation } = this.props;
    return <LabelButton title='' onClick={() => {
      accountLoggedOut();
      navigation.navigate('Login');
      setTimeout(() => {
        navigation
          .dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login', animationEnabled: false })],
          }));
      }, 150);
    }} style ={styles.button}>Logout</LabelButton>;
  }
}

export default LogoutButton;

