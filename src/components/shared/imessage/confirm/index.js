import React, { Component } from 'react';
import { View } from 'react-native';

import { extractAddress } from 'modules/Auth/utils/accountKeys';
import { includeFee } from 'utilities/conversions.utils';
import { colors } from 'constants/styleGuide';
import FormattedNumber from '../../formattedNumber';
import { PrimaryButton, Button } from '../../toolBox/button';
import Avatar from '../../avatar';
import Icon from '../../toolBox/icon';
import { B, P, Small } from '../../toolBox/typography';
import styles from './styles';

class Confirm extends Component {
  state = {
    errorMessage: false,
    busy: false,
  };

  // eslint-disable-next-line max-statements
  send = async () => {
    if (this.state.busy) {
      return;
    }

    const {
      composeMessage,
      recoveryPhrase,
      sharedData: { address, amount },
    } = this.props;

    this.setState({ busy: true, errorMessage: '' });

    try {
      this.setState({ busy: false });

      // TODO: Consume transactions hooks instead when they are created.
      // const data = {
      //   recipientAddress: address,
      //   amount: toRawLsk(amount),
      //   recoveryPhrase,
      // };
      // const tx = await transactionsAPI.create(data);
      // const { id } = await transactionsAPI.broadcast(tx);
      // Recap when https://github.com/LiskHQ/lisk-mobile/issues/1463 is solved.

      composeMessage({
        id: '',
        address: { value: extractAddress(recoveryPhrase), validity: 0 },
        amount,
        state: 'transferred',
        recipientAddress: address,
      });
    } catch (error) {
      this.setState({
        busy: false,
        errorMessage: error.message || 'An error happened. Please try later.',
      });
    }
  };

  render() {
    const {
      composeMessage,
      conversation,
      message,
      state,
      language,
      sharedData: { address, amount },
    } = this.props;

    const { busy, errorMessage } = this.state;

    const isSender =
      conversation.localParticipiantIdentifier === message.senderParticipantIdentifier;
    const fee = 1e7;
    const totalAmount = isSender ? amount : includeFee(amount, fee);
    const description = isSender
      ? `Your request of ${totalAmount} LSK is pending response.`
      : `By accepting this request, you will send ${totalAmount} LSK (including transaction fee) from your account.`;

    const rejectMessage = () => {
      composeMessage({
        address: { value: address, validity: 0 },
        amount,
        state: 'rejected',
      });
    };

    return (
      <View style={styles.container}>
        {state === 'requested' ? (
          <View style={styles.innerContainer}>
            <View>
              <View style={[styles.row, styles.addressContainer]}>
                <B style={styles.title}>Requested by</B>
                <Avatar address={address || ''} style={styles.avatar} size={50} />
                <P style={[styles.text, styles.address]}>{address}</P>
              </View>
              <View style={styles.row}>
                <Icon name="amount" style={styles.icon} size={20} color={colors.light.slateGray} />
                <View style={styles.rowContent}>
                  <P style={styles.label}>Amount</P>
                  <B style={[styles.text]}>
                    <FormattedNumber language={language}>{amount}</FormattedNumber>
                  </B>
                </View>
              </View>
              {!isSender ? (
                <View style={styles.row}>
                  <Icon
                    name="tx-fee"
                    style={styles.icon}
                    size={20}
                    color={colors.light.slateGray}
                  />
                  <View style={styles.rowContent}>
                    <P style={styles.label}>Transaction fee</P>
                    <B style={[styles.text]}>
                      <FormattedNumber language={language}>0.1</FormattedNumber>
                    </B>
                  </View>
                </View>
              ) : null}
              <P style={styles.description}>{description}</P>
            </View>
            {isSender ? null : (
              <View>
                <View style={[styles.errorContainer, errorMessage ? styles.visible : null]}>
                  <Icon size={16} name="warning" style={styles.errorIcon} />
                  <Small style={styles.error}>{errorMessage}</Small>
                </View>
                <PrimaryButton
                  style={[styles.button, busy ? styles.buttonBusy : {}]}
                  onClick={this.send}
                  title={busy ? 'Transferring...' : 'Accept'}
                />
                <Button
                  disabled={busy}
                  style={styles.rejectButton}
                  onClick={rejectMessage}
                  title="Reject"
                />
              </View>
            )}
          </View>
        ) : (
          <View style={[styles.innerContainer, styles.confirmContainer]}>
            <B style={styles.confirmMessage}>
              You have {state} {amount} LSK. Send the message to let {address} know.
            </B>
          </View>
        )}
      </View>
    );
  }
}

export default Confirm;
