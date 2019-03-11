import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { translate } from 'react-i18next';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Symbol from './symbol';
import FormattedDate from '../formattedDate';
import { B, Small } from '../toolBox/typography';
import { stringShortener } from '../../utilities/helpers';
import loadingAnimation from '../../assets/animations/loading-dots.json';
import transactions from '../../constants/transactions';
import Blur from './blur';
import withTheme from '../withTheme';
import getStyles from './styles';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

class Item extends React.Component {
  showDetail = () => {
    const {
      navigate, tx, account, incognito,
    } = this.props;

    navigate({
      routeName: 'TxDetail',
      params: { tx, account, incognito },
    });
  }

  componentDidMount() {
    if (typeof this.props.tx.timestamp !== 'number') {
      this.animation.play();
    }
  }

  render() {
    const {
      styles, theme, tx, t, activeToken,
      account, followedAccounts, incognito,
    } = this.props;

    let direction = 'incoming';
    let address = tx.senderAddress;
    let addressShortened = stringShortener(tx.senderAddress, 10, 3);

    if (account === tx.senderAddress && tx.type === 0) {
      direction = 'outgoing';
      address = tx.recipientAddress;
      addressShortened = stringShortener(tx.recipientAddress, 10, 3);
    }

    const followedAccount = followedAccounts.find(fa => fa.address === address);
    if (followedAccount) {
      addressShortened = followedAccount.label;
    }

    const amount = direction === 'incoming' ? fromRawLsk(tx.amount) : `-${fromRawLsk(tx.amount)}`;

    return (
      <TouchableOpacity
        style={[styles.itemContainer, styles.theme.itemContainer]}
        onPress={this.showDetail}>
        <View style={styles.innerContainer}>
        <View style={[styles.itemColumn, styles.avatarContainer]}>
          <Symbol
            token={activeToken}
            theme={theme}
            type={tx.type}
            direction={direction}
            sender={tx.senderAddress}
            recipient={tx.recipientAddress}
            address={address}
            />
        </View>
        <View style={styles.column}>
          <B style={[styles.address, styles.theme.address]}>
            {
              (tx.type === 0 && (tx.recipientAddress !== tx.senderAddress)) ?
              addressShortened :
              t(transactions[txTypes[tx.type]].title)
            }
          </B>
          {
            typeof this.props.tx.timestamp !== 'number' ?
            <Small style={[styles.date, styles.theme.date]}>
              {t('Pending confirmation')}
            </Small> :
            <FormattedDate type={Small} style={[styles.date, styles.theme.date]}>
              {tx.timestamp}
            </FormattedDate>
          }
        </View>
        </View>
        <View style={[styles.column, styles.amountWrapper]}>
          {
            (tx.type === 0 && (tx.recipientAddress !== tx.senderAddress)) && !incognito ?
              <B style={[styles.amount, styles[direction], styles.theme[direction]]}>
                <FormattedNumber trim={true}>{amount}</FormattedNumber>
              </B> :
              null
          }
          {
            (tx.type === 0 && (tx.recipientAddress !== tx.senderAddress)) && incognito ?
              <Blur value={amount} direction={direction} /> :
              null
          }
          {
            typeof tx.timestamp !== 'number' ?
              <View style={styles.pendingIcon}>
                <LottieView
                  source={loadingAnimation}
                  ref={(el) => { this.animation = el; }}
                  style={{}}
                />
              </View> :
              null
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export default withTheme(translate()(Item), getStyles());
