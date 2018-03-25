import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { fromRawLsk } from '../../utilities/conversions';

class Item extends React.Component {
  showDetail(tx) {
    this.props.navigation.navigate({
      routeName: 'TxDetail',
      params: { tx }
    });
  }
  render () {
    const { tx, account } = this.props;
    let arrow = account === tx.senderId  ? '→' : '←';
    arrow += tx.timestamp ? '' : '!';
    let recipient = tx.recipientId;
    
    if (tx.type === 3) {
      recipient = 'Vote';
    } else if (tx.type === 2) {
      recipient = 'Register Delegate';
    } else if (tx.type === 1) {
      recipient = 'Register Second Passphrase';
    }
  
    return (<ListItem
      onPress={this.showDetail.bind(this, tx)}
      key={tx.id}
      title={fromRawLsk(tx.amount)}
      subtitle={`${arrow} ${recipient}`} />);
  }
}

export default Item;
