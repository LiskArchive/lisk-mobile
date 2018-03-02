import React from 'react';
import { Text } from 'react-native';
import { getNetwork, networks } from '../../utilities/networks';

/**
 * The container component containing login
 * and create account functionality
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
