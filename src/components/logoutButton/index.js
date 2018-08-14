
import React from 'react';
import connect from 'redux-connect-decorator';
import { NavigationActions } from 'react-navigation';
import { LabelButton } from '../toolBox/button';
import styles from './styles';

class LogoutButton extends React.Component {
  render() {
    const { navigation } = this.props;
    return <LabelButton title='' onClick={() => {
      navigation
        .dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Landing' })],
        }));
    }} style ={styles.button}>Logout</LabelButton>;
  }
}

export default LogoutButton;
