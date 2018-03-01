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
    console.log('Did update', this.props.accounts);
    if (this.props.accounts.list.length > 0) {
      console.log('should Redirect');
    }
  }

  render() {
    return (<Text>Lisk Mobile</Text>);
  }
}

export default Landing;
