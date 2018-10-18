
import React from 'react';
import connect from 'redux-connect-decorator';
import { NavigationActions } from 'react-navigation';
import {
  accountLoggedOut as accountLoggedOutAction,
} from '../../actions/accounts';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';
import styles from './styles';

const onClick = (navigation, accountLoggedOut) => {
  // clean active account
  accountLoggedOut();
  // navigate to the login page
  navigation
    .dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'Login',
        params: {
          signOut: true,
        },
      })],
    }));
};

@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {
  accountLoggedOut: accountLoggedOutAction,
})
class LogoutButton extends React.Component {
  render() {
    const {
      navigation, titleStyle, style, accountLoggedOut,
    } = this.props;
    return <IconButton
      icon='logout'
      iconSize={18}
      title='Sign out'
      color={colors.primary5}
      onClick={() => onClick(navigation, accountLoggedOut)}
      titleStyle={[styles.title, titleStyle]}
      style ={[styles.button, style]} />;
  }
}

export default LogoutButton;
