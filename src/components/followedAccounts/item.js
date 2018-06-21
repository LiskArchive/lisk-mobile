import React from 'react';
import { Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import styles from './styles';

class Item extends React.Component {
  showWallet(address) {
    this.props.navigate({
      routeName: 'Wallet',
      params: { address, key: 'address' },
    });
  }

  render() {
    const { account, edit } = this.props;

    return (<ListItem
      rightIcon={
        <Icon name='edit' color='#666' size={18} onPress={() => edit(account.address)}/>
      }
      subtitle={account.label || ''}
      title={
        <Text style={styles.itemTitle} onPress={this.showWallet.bind(this, account.address)}>{account.address}</Text>
      } />);
  }
}

export default Item;
