
import React from 'react';
import connect from 'redux-connect-decorator';
import { NavigationActions } from 'react-navigation';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';
import styles from './styles';

const onClick = navigation =>
  navigation
    .dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Landing' })],
    }));

class LogoutButton extends React.Component {
  render() {
    const { navigation, titleStyle, style } = this.props;
    return <IconButton
      icon='logout'
      iconSize={18}
      title='Logout'
      color={colors.primary5}
      onClick={() => onClick(navigation)}
      titleStyle={[styles.title, titleStyle]}
      style ={[styles.button, style]} />;
  }
}

export default LogoutButton;
