import React from 'react';
import connect from 'redux-connect-decorator';
import { Text, View } from 'react-native';
import BackgroundImage from '../background';
import Logo from '../logo';
import { activePeerSet as activePeerSetAction } from '../../actions/peers';
import { accountsRetrieved as accountsRetrievedAction } from '../../actions/accounts';
import styles from './styles';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Login
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(state => ({
  accounts: state.accounts,
}), {
  peerSet: activePeerSetAction,
  accountsRetrieved: accountsRetrievedAction,
})
class Landing extends React.Component {
  componentWillMount() {
    this.props.peerSet();
    this.props.accountsRetrieved();
  }

  componentDidUpdate() {
    if (!this.props.accounts.active) {
      this.props.navigation.navigate('Login');
    }
  }

  /**
   * @todo this Text need to be replaced by a snipper component
   */
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (<View style={styles.container}>
      <BackgroundImage />
      <Logo />
      <Text>Landing...</Text>
    </View>);
  }
}

export default Landing;
