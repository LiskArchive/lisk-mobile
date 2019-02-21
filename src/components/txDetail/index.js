import React, { Fragment } from 'react';
import { ScrollView, View, Image, RefreshControl } from 'react-native';
import connect from 'redux-connect-decorator';
import FormattedDate from '../formattedDate';
import withTheme from '../withTheme';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { B, P, H1, H3, A } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { IconButton } from '../toolBox/button';
import Avatar from '../avatar';
import Loading from '../transactions/loading';
import EmptyState from '../transactions/empty';
import transactions from '../../constants/transactions';
import { transactions as transactionsAPI } from '../../utilities/api';
import Blur from '../transactions/blur';
import arrowLight from '../../assets/images/txDetail/arrow-light2x.png';
import arrowDark from '../../assets/images/txDetail/arrow-dark2x.png';
import getStyles from './styles';
import { colors, themes } from '../../constants/styleGuide';
import { merge } from '../../utilities/helpers';

const txTypes = ['accountInitialization', 'setSecondPassphrase', 'registerDelegate', 'vote'];

@connect(state => ({
  followedAccounts: state.accounts.followed || [],
  account: state.accounts.active || {},
  activeToken: state.settings.token.active,
}), {})
class TransactionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerLeft: (
        <IconButton
          title=''
          icon='back'
          onPress={params.action}
          color={params.theme === themes.light ? colors.light.black : colors.dark.white}
        />
      ),
    };
  };

  state = {
    tx: null,
    refreshing: false,
  }

  componentDidMount() {
    const { theme, navigation } = this.props;
    const tx = navigation.getParam('tx', null);
    let backAction = () => navigation.pop();

    if (tx) {
      this.setState({ tx }, () => this.retrieveTransaction(tx.id));
    } else {
      this.retrieveTransaction(navigation.getParam('txId', false));
      backAction = () => navigation.navigate('Home');
    }

    navigation.setParams({
      theme,
      action: backAction,
    });
  }

  async retrieveTransaction(id, delay = 0) {
    const { navigation, account, activeToken } = this.props;
    const { tx: currentTx } = this.state;

    try {
      const { data } = await transactionsAPI.get(activeToken, {
        address: navigation.getParam('account', account.address),
        id,
      });

      const tx = data[0] || {};

      // don't have any transaction passed from the navigation and couldn't find any with the id
      // example: navigating from a deep link
      if (!tx.id && !currentTx) {
        this.setState({
          error: 'Transaction not found',
        });
      } else {
        setTimeout(() => this.setState(prevState => ({
          tx: merge(prevState.tx, tx),
          refreshing: false,
        })), delay);
      }
    } catch (error) {
      if (!currentTx) {
        this.setState({
          error: 'An error occurred, please try again.',
        });
      }
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => this.retrieveTransaction(this.state.tx.id, 1500));
  }

  navigate = (address) => {
    const { navigation, account } = this.props;
    if (address !== account.address) {
      navigation.navigate('Wallet', { address });
    }
  }

  getAccountLabel = (accountId) => {
    const followedAccount = this.props.followedAccounts.find(a => a.address === accountId);
    if (followedAccount) {
      return followedAccount.label;
    }
    return accountId;
  };

  render() {
    const {
      navigation, styles, theme, account,
    } = this.props;
    const { tx, error, refreshing } = this.state;

    if (error) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <EmptyState message={error} style={styles.empty} />
        </View>
      );
    }

    if (!tx) {
      return (
        <View style={[styles.container, styles.theme.container]}>
          <Loading />
        </View>
      );
    }

    const walletAccountAddress = navigation.getParam('account', account.address);
    const incognito = navigation.getParam('incognito', null);
    let arrowStyle;
    let amountStyle = [styles.outgoing, styles.theme.outgoing];
    let firstAddress = tx.senderAddress;
    let secondAddress = tx.recipientAddress;
    let amountSign = '-';
    let direction = 'outgoing';

    if ((walletAccountAddress !== tx.senderAddress) && tx.type === 0) {
      arrowStyle = styles.reverseArrow;
      amountStyle = [styles.incoming, styles.theme.incoming];
      firstAddress = tx.recipientAddress;
      secondAddress = tx.senderAddress;
      amountSign = '';
      direction = 'incoming';
    }

    const normalizedAmount = fromRawLsk(tx.amount);

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        )}
      >
        <View style={[styles.senderAndRecipient, styles.theme.senderAndRecipient]}>
          <View style={styles.row}>
            {tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
              <Image
                style={{ width: 50, height: 50 }}
                source={transactions[txTypes[tx.type]].image(theme)}
              /> :
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
          {tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
            <H3 style={amountStyle}>{transactions[txTypes[tx.type]].title}</H3> : null
          }
          {
            tx.type === 0 && (tx.recipientAddress !== tx.senderAddress) && !incognito ?
              <H1 style={amountStyle}>
                {amountSign}
                <FormattedNumber>
                  {fromRawLsk(tx.amount)}
                </FormattedNumber>
              </H1> : null
          }
          {
            tx.type === 0 && (tx.recipientAddress !== tx.senderAddress) && incognito ?
              <Blur
                value={normalizedAmount}
                direction={direction}
                style={styles.amountBlur}
              /> : null
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
              {tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
                <Fragment>Account address</Fragment> :
                <Fragment>Sender</Fragment>
              }
            </P>
            <View style={styles.addressContainer}>
              <A
                value={tx.senderAddress}
                onPress={() => this.navigate(tx.senderAddress)}
                style={[styles.value, styles.theme.value, styles.transactionId]}
              >
                {this.getAccountLabel(tx.senderAddress)}
              </A>
            </View>
          </View>
        </View>

        {tx.type !== 0 || (tx.recipientAddress === tx.senderAddress) ?
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
                  value={tx.senderAddress}
                  onPress={() => this.navigate(tx.recipientAddress)}
                  style={[styles.value, styles.theme.value, styles.transactionId]}
                >
                  {this.getAccountLabel(tx.recipientAddress)}
                </A>
              </View>
            </View>
          </View>
        }

        <View style={[styles.detailRow, styles.theme.detailRow]}>
          <Icon
            name='tx-fee'
            size={22}
            style={styles.rowIcon}
            color={colors[theme].gray2}
          />
          <View style={styles.rowContent}>
            <P style={[styles.label, styles.theme.label]}>Transaction Fee</P>
            <B style={[styles.value, styles.theme.value]}>
              <FormattedNumber>{fromRawLsk(tx.fee)}</FormattedNumber>
            </B>
          </View>
        </View>
        {
          (tx.data) ?
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
                  {tx.data}
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
        <View style={[styles.detailRow, styles.theme.detailRow]}>
          <Icon
            name='tx-id'
            size={22}
            style={styles.rowIcon}
            color={colors[theme].gray2}
          />
          <View style={styles.rowContent}>
            <P style={[styles.label, styles.theme.label]}>Transaction ID</P>
            <View style={styles.addressContainer}>
              <Share
                type={B}
                value={tx.id}
                icon={true}
                style={[styles.value, styles.theme.value, styles.transactionId]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(TransactionDetail, getStyles());
