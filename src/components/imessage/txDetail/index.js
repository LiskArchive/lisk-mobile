import React, { Fragment } from 'react';
import {
  ScrollView, View, Image,
  NativeModules,
} from 'react-native';
import FormattedDate from '../../formattedDate';
import withTheme from '../../withTheme';
import { fromRawLsk } from '../../../utilities/conversions';
import FormattedNumber from '../../formattedNumber';
import { B, P, H1, H3, A } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import Avatar from '../../avatar';
import Loading from '../../transactions/loading';
import transactions from '../../../constants/transactions';
import { tokenMap } from '../../../constants/tokens';
import { transactions as transactionsAPI } from '../../../utilities/api';
import arrowLight from '../../../assets/images/txDetail/arrow-light2x.png';
import arrowDark from '../../../assets/images/txDetail/arrow-dark2x.png';
import getStyles from './styles';
import { colors, themes } from '../../../constants/styleGuide';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

class TransactionDetail extends React.Component {
  state = {
    tx: {},
  }

  componentDidMount() {
    const { txID, sharedData } = this.props;

    if (txID) {
      transactionsAPI.get(tokenMap.LSK.key, ({ id: txID }))
        .then(({ data }) => {
          this.setState({
            tx: data[0] || {
              type: 0,
              recipientId: sharedData.recipientAddress,
              senderId: sharedData.address,
              amount: sharedData.amount,
              notRawLisk: true,
            },
          });
        })
        .catch(() => {
          this.setState({
            tx: {
              type: 0,
              recipientId: sharedData.recipientAddress,
              senderId: sharedData.address,
              amount: sharedData.amount,
              notRawLisk: true,
            },
          });
        });
    }
  }

  onOpenDeepLink = () => {
    NativeModules.MessagesManager.openURL(`lisk://transactions?id=${this.state.tx.id}`)
      // eslint-disable-next-line no-console
      .then(console.log).catch(console.log);
  };


  render() {
    const { styles, theme, account } = this.props;
    const { tx } = this.state;

    if (!tx.senderId) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Loading />
        </View>
      );
    }

    const walletAccountId = account.address;
    let arrowStyle;
    let amountStyle = [styles.outgoing, styles.theme.outgoing];
    let firstAddress = tx.senderId;
    let secondAddress = tx.recipientId;
    let amountSign = '-';

    if ((walletAccountId !== tx.senderId) && tx.type === 0) {
      arrowStyle = styles.reverseArrow;
      amountStyle = [styles.incoming, styles.theme.incoming];
      firstAddress = tx.recipientId;
      secondAddress = tx.senderId;
      amountSign = '';
    }

    return (
      <ScrollView style={[styles.container, styles.theme.container]}>
        <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
          <View style={styles.row}>
            {
              <Fragment>
                <Avatar address={firstAddress} size={50} />
                {
                  theme === themes.light ?
                    <Image source={arrowLight} style={[styles.arrow, arrowStyle]} /> :
                    <Image source={arrowDark} style={[styles.arrow, arrowStyle]} />
                }
                <Avatar address={secondAddress} size={50} />
              </Fragment>
            }
          </View>
          {(tx.type && tx.type !== 0) || (tx.recipientId === tx.senderId) ?
            <H3 style={amountStyle}>{transactions[txTypes[tx.type]].title}</H3> : null
          }
          {
            tx.type === 0 && (tx.recipientId !== tx.senderId) ?
              <H1 style={amountStyle}>
                {amountSign}
                <FormattedNumber>
                  {tx.notRawLisk ? tx.amount : fromRawLsk(tx.amount)}
                </FormattedNumber>
              </H1> : null
          }
          {
            tx.timestamp ?
              <FormattedDate
                format='MMM D, YYYY LTS'
                type={P}
                style={[styles.date, styles.theme.date]}
              >
                {tx.timestamp}
              </FormattedDate> : null
          }
        </View>
        <View style={[styles.detailRow, styles.theme.detailRow]}>
          <Icon
            name='send'
            size={22}
            style={styles.rowIcon}
            color={colors[theme].gray2}
          />
          <View style={styles.rowContent}>
            <P style={[styles.label, styles.theme.label]}>
              {tx.type !== 0 || (tx.recipientId === tx.senderId) ?
                <Fragment>Account address</Fragment> :
                <Fragment>Sender</Fragment>
              }
            </P>
            <View style={styles.addressContainer}>
              <A
                value={tx.senderId}
                style={[styles.value, styles.theme.value, styles.transactionId]}
              >
                {tx.senderId}
              </A>
            </View>
          </View>
        </View>

        {tx.type !== 0 || (tx.recipientId === tx.senderId) ?
          null :
          <View style={[styles.detailRow, styles.theme.detailRow]}>
            <Icon
              name='recipient'
              size={22}
              style={styles.rowIcon}
              color={colors[theme].gray2}
            />
            <View style={styles.rowContent}>
              <P style={[styles.label, styles.theme.label]}>Recipient</P>
              <View style={styles.addressContainer}>
                <A
                  value={tx.senderId}
                  style={[styles.value, styles.theme.value, styles.transactionId]}
                >
                  {tx.recipientId}
                </A>
              </View>
            </View>
          </View>
        }
        {
          (tx.asset && tx.asset.data) ?
            <View style={[styles.detailRow, styles.theme.detailRow]}>
              <Icon
                name='reference'
                size={22}
                style={styles.rowIcon}
                color={colors[theme].gray2}
              />
              <View style={styles.rowContent}>
                <P style={[styles.label, styles.theme.label]}>Reference</P>
                <B style={[styles.value, styles.theme.value, styles.referenceValue]}>
                  {tx.asset.data}
                </B>
              </View>
            </View> : null
        }
        <View style={[styles.detailRow, styles.theme.detailRow]}>
          <Icon
            name='confirmation'
            size={22}
            style={styles.rowIcon}
            color={colors[theme].gray2}
          />
          <View style={styles.rowContent}>
            <P style={[styles.label, styles.theme.label]}>Confirmations</P>
            <B style={[styles.value, styles.theme.value]}>{tx.confirmations || 'Not confirmed yet.'}</B>
          </View>
        </View>
        <A
          style={[styles.link, styles.theme.link]}
          onPress={this.onOpenDeepLink}
        >
          Read about this transaction
        </A>
      </ScrollView>
    );
  }
}

export default withTheme(TransactionDetail, getStyles());
