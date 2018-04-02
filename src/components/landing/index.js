import React from 'react';
import connect from 'redux-connect-decorator';
import { Text, View } from 'react-native';
import BackgroundImage from '../background';
import Logo from '../logo';
import { getNetwork, networks } from '../../utilities/networks';
import Router from '../router';
import { activePeerSet } from '../../actions/peers';
import { accountsRetrieved } from '../../actions/accounts';

@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {
  activePeerSet,
  accountsRetrieved,
})

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Login
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
class Landing extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      network: networks.mainNet.code,
    };
  }

  componentWillMount() {
    this.network = getNetwork(this.state.network);
    this.props.accountsRetrieved();
  }

  componentDidUpdate() {
    if (this.props.accounts.list.length > 0) {
      console.log('Redirect to Referrer or Transactions page');
    } else {
      console.log('Redirect to Login page');
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    // ToDo : this Text need to be replaced by a snipper component
    return (<View style={{
        flex: 1,
        backgroundColor: '#666',
      }}>
      <BackgroundImage />
      <Logo />
      <Text>Landing...</Text>
    </View>);
  }
}

export default Landing;
