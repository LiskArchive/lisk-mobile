import React from 'react';
import { NavigationActions } from 'react-navigation';
import { removePassphraseFromKeyChain } from '../../../utilities/passphrase';
import { IconButton } from '../../toolBox/button';
import { colors } from '../../../constants/styleGuide';
import withTheme from '../../withTheme';
import getStyles from './styles';

class SignOutButton extends React.Component {
  onClick = () => {
    // clean active account
    this.props.signOut();
    removePassphraseFromKeyChain();

    // navigate to the signIn page
    this.props.navigation
      .dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'SignIn',
          params: {
            signOut: true,
          },
        })],
      }));
  }

  render() {
    const { theme, styles } = this.props;

    return (
      <IconButton
        icon='logout'
        iconSize={18}
        title='Sign out'
        color={colors[theme].blue}
        onClick={this.onClick}
        titleStyle={[styles.title, styles.theme.title]}
        style={styles.button}
      />
    );
  }
}

export default withTheme(SignOutButton, getStyles());
