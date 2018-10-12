import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';
import FormattedNumber from '../formattedNumber';
import Avatar from '../avatar';
import FormattedDate from '../formattedDate';
import { B, Small } from '../toolBox/typography';
import { stringShortener } from '../../utilities/helpers';
import loadingAnimation from '../../assets/animations/loading-dots.json';
import transactions from '../../constants/transactions';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

class Item extends React.Component {
  showDetail(tx, account) {
    this.props.navigate({
      routeName: 'TxDetail',
      params: { tx, account },
    });
  }

  componentDidMount() {
    if (typeof this.props.tx.timestamp !== 'number') {
      this.animation.play();
    }
  }

  render() {
    const { tx, account } = this.props;
    let direction = 'incoming';
    let address = tx.senderId;
    let addressShortened = stringShortener(tx.senderId, 10, 3);
    if (account === tx.senderId && tx.type === 0) {
      direction = 'outgoing';
      address = tx.recipientId;
      addressShortened = stringShortener(tx.recipientId, 10, 3);
    }
    const amount = direction === 'incoming' ? fromRawLsk(tx.amount) : `-${fromRawLsk(tx.amount)}`;

    return (<TouchableOpacity
      style={styles.itemContainer}
      onPress={this.showDetail.bind(this, tx, account)}>
      <View style={[styles.itemColumn, styles.avatar]}>
        {
          (tx.type === 0 && (tx.recipientId !== tx.senderId)) ?
          <Avatar address={address} size={50} /> :
          <Image source={transactions[txTypes[tx.type]].image} style={styles.image} />
        }
      </View>
      <View style={styles.column}>
        <B style={styles.address}>
          {(tx.type === 0 && (tx.recipientId !== tx.senderId)) ?
            addressShortened : transactions[txTypes[tx.type]].title}
        </B>
        {
          typeof this.props.tx.timestamp !== 'number' ?
          <Small style={styles.date}>Pending confirmation</Small> :
          <FormattedDate type={Small} style={styles.date}>{ tx.timestamp }</FormattedDate>
        }
      </View>
      <View style={[styles.column, styles.amountWrapper]}>
      {
        (tx.type === 0 && (tx.recipientId !== tx.senderId)) ?
          <B style={[styles.amount, styles[direction]]}>
            <FormattedNumber>{amount}</FormattedNumber> Ⱡ
          </B> : null
      }
        {
          typeof this.props.tx.timestamp !== 'number' ?
            <View style={styles.pendingIcon}>
              <LottieView source={loadingAnimation} ref={(el) => { this.animation = el; }}/>
            </View> : null
        }
      </View>
    </TouchableOpacity>);
  }
}

export default Item;
