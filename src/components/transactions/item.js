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
  componentDidMount() {
    if (typeof this.props.tx.timestamp !== 'number') {
      this.animation.play();
    }
  }

  showDetail = () => {
    const {
      navigate, tx, account, incognito,
    } = this.props;

    navigate({
      routeName: 'TxDetail',
      params: { tx, account, incognito },
    });
  }

  getAddressText = (address) => {
    const { t } = this.props;

    if (address === 'Unparsed Address') {
      return t('Unparsed Address');
    }

    return stringShortener(address, 10, 3);
  }

  render() {
    const {
      styles, theme, tx, t, activeToken,
      account, followedAccounts, incognito,
    } = this.props;

    let direction = 'incoming';
    let address = tx.senderAddress;

    if (account === tx.senderAddress && tx.type === 0) {
      direction = 'outgoing';
      address = tx.recipientAddress;
    }

    let addressText = this.getAddressText(address);

    const followedAccount = followedAccounts[activeToken].find(fa => fa.address === address);
    if (followedAccount) {
      addressText = followedAccount.label;
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
              (activeToken === 'LSK' &&
              (tx.type !== 0 || tx.recipientAddress === tx.senderAddress)) ?
              t(transactions[txTypes[tx.type]].title) :
              addressText
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
        {tx.type === 0 && (
          <View style={[styles.column, styles.amountWrapper]}>
            {
              (activeToken === 'LSK' && tx.recipientAddress === tx.senderAddress) || incognito ?
                null :
                <View style={[styles[direction], styles.theme[direction]]}>
                  <FormattedNumber
                    trim={true}
                    tokenType={activeToken}
                    type={B}
                    style={[styles[`${direction}Amount`], styles.theme[`${direction}Amount`]]}
                  >
                    {amount}
                  </FormattedNumber>
                </View>
            }
            {
              tx.recipientAddress !== tx.senderAddress && incognito ?
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
        )}
      </TouchableOpacity>
    );
  }
}

export default withTheme(translate()(Item), getStyles());
