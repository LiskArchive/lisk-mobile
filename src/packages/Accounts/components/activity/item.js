import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { fromRawLsk } from 'utilities/conversions';
import { stringShortener } from 'utilities/helpers';
import { getTxConstant, isTransfer } from 'packages/Send/constants';
import loadingAnimation from 'assets/animations/loading-dots.json';
import Blur from 'components/shared/blur';
import FormattedNumber from 'components/shared/formattedNumber';
import FormattedDate from 'components/shared/formattedDate';
import { B, Small } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import Symbol from './symbol';
import getStyles from './styles';

const TimeStamp = ({
  styles,
  language,
  tx,
  t,
}) => {
  if (typeof tx.timestamp !== 'number') {
    return (
      <Small style={[styles.date, styles.theme.date]}>
        {t('Pending confirmation')}
      </Small>
    );
  }

  return (
    <FormattedDate
      locale={language}
      type={Small}
      style={[styles.date, styles.theme.date]}
    >
      {tx.timestamp * 1000}
    </FormattedDate>
  );
};

@connect(state => ({
  language: state.settings.language,
}))
class Item extends React.Component {
  componentDidMount() {
    if (typeof this.props.tx.timestamp !== 'number') {
      this.animation.play();
    }
  }

  showDetail = () => {
    const {
      navigate, tx, account, incognito
    } = this.props;

    navigate('TxDetail', { tx, account, incognito });
  };

  getAddressText = address => {
    const { t } = this.props;

    if (address === 'Unparsed Address') {
      return t('Unparsed Address');
    }

    return stringShortener(address, 6, 5);
  };

  // eslint-disable-next-line
  render() {
    const {
      styles,
      theme,
      tx,
      t,
      activeToken,
      account,
      followedAccounts,
      incognito,
      language,
    } = this.props;

    let direction = 'incoming';
    let address = tx.senderAddress;

    if (account === tx.senderAddress && isTransfer(tx)) {
      direction = 'outgoing';
      address = tx.recipientAddress;
    }

    let addressText = this.getAddressText(address);

    const followedAccount = followedAccounts[activeToken].find(
      fa => fa.address === address
    );
    if (followedAccount) {
      addressText = followedAccount.label;
    }

    const amount = direction === 'incoming'
      ? fromRawLsk(tx.amount)
      : `-${fromRawLsk(tx.amount)}`;

    return (
      <TouchableOpacity
        style={[styles.itemContainer, styles.theme.itemContainer]}
        onPress={this.showDetail}
      >
        <View style={styles.innerContainer}>
          <View style={[styles.itemColumn, styles.avatarContainer]}>
            <Symbol
              token={activeToken}
              theme={theme}
              moduleAssetId={tx.moduleAssetId}
              direction={direction}
              address={address}
            />
          </View>
          <View style={styles.column}>
            <B style={[styles.address, styles.theme.address]}>
              {!isTransfer(tx)
                ? t(getTxConstant(tx).title)
                : addressText}
            </B>
            <TimeStamp
              styles={styles}
              language={language}
              tx={tx}
              t={t}
            />
          </View>
        </View>
        {isTransfer(tx) && (
          <View style={[styles.column, styles.amountWrapper]}>
            {(tx.recipientAddress === tx.senderAddress)
              || incognito ? null : (
              <View style={[styles[direction], styles.theme[direction]]}>
                <FormattedNumber
                  trim={true}
                  tokenType={activeToken}
                  type={B}
                  style={[
                    styles[`${direction}Amount`],
                    styles.theme[`${direction}Amount`],
                  ]}
                  language={language}
                >
                  {amount}
                </FormattedNumber>
              </View>
              )}
            {tx.recipientAddress !== tx.senderAddress && incognito ? (
              <Blur value={amount} direction={direction} />
            ) : null}
            {
              (typeof tx.timestamp !== 'number') && (
                <View style={styles.pendingIcon}>
                  <LottieView
                    source={loadingAnimation}
                    ref={(el) => {
                      this.animation = el;
                    }}
                    style={{}}
                  />
                </View>
              )
            }
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default withTheme(translate()(Item), getStyles());
