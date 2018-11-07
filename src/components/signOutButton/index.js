import React from 'react';
import connect from 'redux-connect-decorator';
import { NavigationActions } from 'react-navigation';
import {
  accountSignedOut as accountSignedOutAction,
} from '../../actions/accounts';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

const onClick = (navigation, accountSignedOut) => {
  // clean active account
  accountSignedOut();
  // navigate to the signIn page
  navigation
    .dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'SignIn',
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
  accountSignedOut: accountSignedOutAction,
})
class SignOutButton extends React.Component {
  render() {
    const {
      navigation, styles, titleStyle, style, accountSignedOut,
    } = this.props;
    return <IconButton
      icon='logout'
      iconSize={18}
      title='Sign out'
      color={colors.primary5}
      onClick={() => onClick(navigation, accountSignedOut)}
      titleStyle={[styles.title, titleStyle]}
      style ={[styles.button, style]} />;
  }
}

export default withTheme(SignOutButton, getStyles());
