import React from 'react';
import { Text } from 'react-native';
import { getNetwork, networks } from '../../utilities/networks';

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
    }
  }

  render() {
    return (<Text>Lisk Mobile</Text>);
  }
}

export default Landing;
