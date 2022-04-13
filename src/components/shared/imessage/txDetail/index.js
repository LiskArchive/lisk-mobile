import React from 'react';
import { ScrollView, View, NativeModules } from 'react-native';
import { tokenMap } from 'constants/tokens';
import { transactions as transactionsAPI } from 'utilities/api';
import { isTransfer } from 'constants/transactions';
import withTheme from '../../withTheme';
import Loading from '../../transactions/loading';
import getStyles from './styles';
import { PrimaryButton } from '../../toolBox/button';
import {
  TimeStamp,
  TxAmount,
  Sender,
  Recipient,
  Reference,
  Graphics,
  TxTitle,
  Confirmations,
} from './dataRows';

const getConfig = (styles, account, tx) => {
  if (account.address !== tx.senderAddress && isTransfer(tx)) {
    return {
      arrowStyle: styles.reverseArrow,
      amountStyle: [styles.incoming, styles.theme.incoming],
      firstAddress: tx.recipientAddress,
      secondAddress: tx.senderAddress,
      amountSign: '',
    };
  }

  return {
    arrowStyle: null,
    amountStyle: [styles.outgoing, styles.theme.outgoing],
    firstAddress: tx.senderAddress,
    secondAddress: tx.recipientAddress,
    amountSign: '-',
  };
};

class TransactionDetail extends React.Component {
  state = {
    tx: {},
  };

  componentDidMount() {
    const { txID, sharedData } = this.props;

    if (txID) {
      transactionsAPI
        .get(tokenMap.LSK.key, { id: txID })
        .then(({ data }) => {
          this.setState({
            tx: data[0] || {
              type: 0,
              recipientAddress: sharedData.recipientAddress,
              senderAddress: sharedData.address,
              amount: sharedData.amount,
              notRawLisk: true,
            },
          });
        })
        .catch(() => {
          this.setState({
            tx: {
              type: 0,
              recipientAddress: sharedData.recipientAddress,
              senderAddress: sharedData.address,
              amount: sharedData.amount,
              notRawLisk: true,
            },
          });
        });
    }
  }

  onOpenDeepLink = () => {
    NativeModules.MessagesManager.openURL(
      `lisk://transactions?id=${this.state.tx.id}`
    )
      // eslint-disable-next-line no-console
      .then(console.log)
      // eslint-disable-next-line no-console
      .catch(console.log);
  };

  render() {
    const {
      styles, theme, account, language
    } = this.props;
    const { tx } = this.state;

    if (!tx.senderAddress) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Loading />
        </View>
      );
    }

    const config = getConfig(styles, account, tx);

    return (
      <ScrollView
        contentContainerStyle={[styles.container, styles.theme.container]}
      >
        <View style={styles.innerContainer}>
          <View
            style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}
          >
            <Graphics
              styles={styles}
              theme={theme}
              config={config}
            />
            <TxTitle tx={tx} config={config} />
            <TxAmount
              config={config}
              tx={tx}
              language={language}
            />
            <TimeStamp timestamp={tx.timestamp} styles={styles} />
          </View>
          <Sender styles={styles} tx={tx} />
          <Recipient styles={styles} tx={tx} />
          <Reference styles={styles} tx={tx} />
          <Confirmations styles={styles} tx={tx} />
        </View>
        <PrimaryButton
          style={styles.button}
          onClick={this.onOpenDeepLink}
          title="Open in Lisk application"
        />
      </ScrollView>
    );
  }
}

export default withTheme(TransactionDetail, getStyles());
