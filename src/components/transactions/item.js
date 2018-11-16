import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Avatar from '../avatar';
import FormattedDate from '../formattedDate';
import { B, Small } from '../toolBox/typography';
import { stringShortener } from '../../utilities/helpers';
import loadingAnimation from '../../assets/animations/loading-dots.json';
import transactions from '../../constants/transactions';
import withTheme from '../withTheme';
import getStyles from './styles';
import darkMediumOutgoing from '../../assets/images/amountBlur/outgoing/darkMedium.png';
import darkSmallOutgoing from '../../assets/images/amountBlur/outgoing/darkSmall.png';
import darkMediumIncoming from '../../assets/images/amountBlur/incoming/darkMedium.png';
import darkSmallIncoming from '../../assets/images/amountBlur/incoming/darkSmall.png';
import lightMediumOutgoing from '../../assets/images/amountBlur/outgoing/lightMedium.png';
import lightSmallOutgoing from '../../assets/images/amountBlur/outgoing/lightSmall.png';
import lightMediumIncoming from '../../assets/images/amountBlur/incoming/lightMedium.png';
import lightSmallIncoming from '../../assets/images/amountBlur/incoming/lightSmall.png';

const blurs = {
  outgoing: {
    darkMedium: darkMediumOutgoing,
    darkSmall: darkSmallOutgoing,
    lightMedium: lightMediumOutgoing,
    lightSmall: lightSmallOutgoing,
  },
  incoming: {
    darkMedium: darkMediumIncoming,
    darkSmall: darkSmallIncoming,
    lightMedium: lightMediumIncoming,
    lightSmall: lightSmallIncoming,
  },
};


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
    const {
      styles, tx, account, incognito, theme,
    } = this.props;
    let direction = 'incoming';
    let address = tx.senderId;
    let addressShortened = stringShortener(tx.senderId, 10, 3);
    if (account === tx.senderId && tx.type === 0) {
      direction = 'outgoing';
      address = tx.recipientId;
      addressShortened = stringShortener(tx.recipientId, 10, 3);
    }
    const amount = direction === 'incoming' ? fromRawLsk(tx.amount) : `-${fromRawLsk(tx.amount)}`;
    const amountSize = amount.length > 2 ? 'Medium' : 'Small';

    return (<TouchableOpacity
      style={[styles.itemContainer, styles.theme.itemContainer]}
      onPress={this.showDetail.bind(this, tx, account)}>
      <View style={styles.innerContainer}>
      <View style={[styles.itemColumn, styles.avatarContainer]}>
        {
          (tx.type === 0 && (tx.recipientId !== tx.senderId)) ?
          <Avatar address={address} size={50} style={styles.theme.avatar} /> :
          <Image source={transactions[txTypes[tx.type]].image} style={styles.image} />
        }
      </View>
      <View style={styles.column}>
        <B style={[styles.address, styles.theme.address]}>
          {(tx.type === 0 && (tx.recipientId !== tx.senderId)) ?
            addressShortened : transactions[txTypes[tx.type]].title}
        </B>
        {
          typeof this.props.tx.timestamp !== 'number' ?
          <Small style={styles.date}>Pending confirmation</Small> :
          <FormattedDate type={Small} style={[styles.date, styles.theme.date]}>
            { tx.timestamp }
          </FormattedDate>
        }
      </View>
      </View>
      <View style={[styles.column, styles.amountWrapper]}>
        {
          (tx.type === 0 && (tx.recipientId !== tx.senderId)) && !incognito ?
            <B style={[
              styles.amount, styles.theme.amount,
              styles[direction], styles.theme[direction],
            ]}>
              <FormattedNumber>{amount}</FormattedNumber>
            </B> : null
        }
        {
          (tx.type === 0 && (tx.recipientId !== tx.senderId)) && incognito ?
            <View style={styles.amount}>
              <Image style={styles[`blur${amountSize}`]}
                source={blurs[direction][`${theme}${amountSize}`]} />
            </View> : null
        }
        {
          typeof this.props.tx.timestamp !== 'number' ?
            <View style={styles.pendingIcon}>
              <LottieView
                source={loadingAnimation}
                ref={(el) => { this.animation = el; }}
                style={{}}/>
            </View> : null
        }
      </View>
    </TouchableOpacity>);
  }
}

export default withTheme(Item, getStyles());
