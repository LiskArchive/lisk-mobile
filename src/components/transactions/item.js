import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';
import FormattedNumber from '../formattedNumber';
import Avatar from '../avatar';
import FormattedDate from '../formattedDate';
import { H4, Small } from '../toolBox/typography';
import { stringShortener } from '../../utilities/helpers';
import loadingAnimation from '../../assets/animations/loading-dots.json';
import transactions from '../../constants/transactions';

const txTypes = ['send', 'setSecondPassphrase', 'registerDelegate', 'vote'];

class Item extends React.Component {
  showDetail(tx) {
    this.props.navigate({
      routeName: 'TxDetail',
      params: { tx },
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
      onPress={this.showDetail.bind(this, tx)}>
      <View style={[styles.itemColumn, styles.avatar]}>
        <Avatar address={address} size={50} />
      </View>
      <View style={styles.column}>
        <H4 style={styles.address}>
          {tx.type === 0 ? addressShortened : transactions[txTypes[tx.type]].title}
        </H4>
        {
          typeof this.props.tx.timestamp !== 'number' ?
          <Small style={styles.date}>Pending confirmation</Small> :
          <FormattedDate type={Small} style={styles.date}>{ tx.timestamp }</FormattedDate>
        }
      </View>
      <View style={[styles.column, styles.amountWrapper]}>
      {
        tx.type === 0 ?
          <H4 style={[styles.amount, styles[direction]]}>
            <FormattedNumber>{amount}</FormattedNumber> Ⱡ
          </H4> : null
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
