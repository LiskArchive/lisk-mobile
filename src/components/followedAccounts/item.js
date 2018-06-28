import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import styles from './styles';
import { P } from '../toolBox/typography';

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
        <P style={styles.itemTitle}
          onPress={this.showWallet.bind(this, account.address)}>
          {account.address}
        </P>
      } />);
  }
}

export default Item;
