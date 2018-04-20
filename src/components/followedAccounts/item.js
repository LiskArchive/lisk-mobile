import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';

class Item extends React.Component {
  showWallet(address) {
    this.props.navigate({
      routeName: 'Wallet',
      params: { address, key: 'address' }
    });
  }

  render () {
    const { address, index } = this.props;
    const style = (index % 2 === 0) ? styles.listItemEven : styles.listItemOdd; 
  
    return (<ListItem
      onPress={this.showWallet.bind(this, address)}
      title={address} />);
  }
}

export default Item;
