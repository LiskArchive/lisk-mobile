import React from 'react';
import { View } from 'react-native';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';
import FormattedNumber from '../formattedNumber';
import Avatar from '../avatar';
import FormattedDate from '../formattedDate';
import { P, H4, Small } from '../toolBox/typography';
import { stringShortener } from '../../utilities/helpers';


class Item extends React.Component {
  showDetail(tx) {
    this.props.navigate({
      routeName: 'TxDetail',
      params: { tx },
    });
  }

  render() {
    const { tx, account } = this.props;
    // const confirmed = tx.timestamp !== undefined;
    let direction = 'incoming';
    let address = stringShortener(tx.senderId, 2);
    if (account === tx.senderId) {
      direction = 'outgoing';
      address = stringShortener(tx.recipientId, 2);
    }

    if (tx.type === 3) {
      address = 'Vote';
    } else if (tx.type === 2) {
      address = 'Register Delegate';
    } else if (tx.type === 1) {
      address = 'Register 2nd Passphrase';
    }

    const amount = direction === 'incoming' ? fromRawLsk(tx.amount) : `-${fromRawLsk(tx.amount)}`;

    return (<View style={styles.itemContainer} onPress={this.showDetail.bind(this, tx)}>
      <View style={[styles.itemColumn, styles.avatar]}>
        <Avatar address={address} size={50} />
      </View>
      <View style={styles.column}>
        <P style={styles.address}>{address}</P>
        <FormattedDate type={Small} style={styles.date}>{ tx.timestamp }</FormattedDate>
      </View>
      <View style={[styles.column, styles.amountWrapper]}>
        <H4 style={[styles.amount, styles[direction]]}>
          <FormattedNumber>{amount}</FormattedNumber> Ⱡ
        </H4>
      </View>
    </View>);
  }
}

export default Item;
