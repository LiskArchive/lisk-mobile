import React from 'react';
import { ListItem } from 'react-native-elements';

class Item extends React.Component {
  showWallet(address) {
    this.props.navigate({
      routeName: 'Wallet',
      params: { address, key: 'address' },
    });
  }

  render() {
    const { address } = this.props;

    return (<ListItem
      onPress={this.showWallet.bind(this, address)}
      title={address} />);
  }
}

export default Item;
