import React, { Component } from 'react';
import { ScrollView, NativeModules, NativeEventEmitter } from 'react-native';

import { retrieveAccountsPasswordMapFromKeychain } from 'modules/Auth/utils';
import { languageMap } from 'constants/languages';
import TransactionDetails from 'modules/Transactions/components/TransactionDetails';
import { ThemeContext } from '../../../contexts/ThemeContext';
import Confirm from './confirm';
import Pending from './pending';
import Form from './form';
import Rejected from './rejected';
import SignInWarning from './signInWarning';
import DevSettings from './devSettings';

const { MessagesManager } = NativeModules;
const MessagesEvents = new NativeEventEmitter(MessagesManager);

class LiskMessageExtension extends Component {
  state = {
    account: '',
    address: {
      value: '',
      validity: -1,
    },
    avatarPreview: false,
    num: [0, 0, 0, 0],
    presentationStyle: '',
    message: {},
    conversation: '',
    state: 'requested',
  };

  setAccount = () => {
    retrieveAccountsPasswordMapFromKeychain().then((account) => {
      if (account) {
        this.userData = {
          recoveryPhrase: account.password,
          address: account.username,
        };
        this.setState(
          {
            recoveryPhrase: account.password,
            address: {
              value: account.username,
              validity: -1,
            },
            avatarPreview: true,
          },
          () => setTimeout(() => MessagesManager.hideLaunchScreen(), 100)
        );
      } else {
        MessagesManager.hideLaunchScreen();
      }
    });
  };

  getMessageExcerpt = () => {
    MessagesManager.getActiveConversation((conversation, message) =>
      this.setState({
        conversation,
        message,
        parsedData: message.url ? this.parseUrl(message.url) : {},
      })
    );
  };

  setPresentationStyle = () => {
    MessagesManager.getPresentationStyle((presentationStyle) =>
      this.setState({ presentationStyle })
    );
  };

  bindPresentationStyleChanged = () => {
    MessagesEvents.addListener('onPresentationStyleChanged', ({ presentationStyle }) =>
      this.setState({ presentationStyle })
    );
  };

  bindMessageSelected = () => {
    MessagesEvents.addListener('didSelectMessage', ({ conversation, message }) =>
      this.setState({
        conversation,
        message,
        parsedData: this.parseUrl(message.url),
      })
    );
  };

  bindStartedSendingMessage = () => {
    MessagesEvents.addListener('didStartSendingMessage', ({ conversation }) =>
      this.setState({
        conversation,
        message: {},
        state: 'requested',
        avatarPreview: !!this.userData.address,
        address: {
          value: this.userData.address || '',
          validity: -1,
        },
      })
    );
  };

  bindKeyBoardFocused = () => {
    MessagesManager.updatePresentationStyle('expanded');
  };

  componentDidMount = () => {
    this.setAccount();
    this.getMessageExcerpt();
    this.setPresentationStyle();
    this.bindPresentationStyleChanged();
    this.bindMessageSelected();
    this.bindStartedSendingMessage();
  };

  composeMessage = ({ address, amount, state = 'requested', id, recipientAddress }) => {
    if (address.validity !== 1) {
      const recipient = `&recipientAddress=${recipientAddress}`;
      const txID = id ? `&txID=${id}` : '';
      const url = `?address=${address.value}&amount=${amount}&state=${state}${txID}${recipient}`;
      MessagesManager.updatePresentationStyle('compact');
      this.setState({ state });
      MessagesManager.composeMessage({
        summaryText: state === 'requested' ? `${state} ${amount} LSK` : '',
        url,
        layout: {
          imageName: state,
          imageTitle: '',
          caption: `${amount} LSK is ${state}`,
          subcaption: `by ${address.value}`,
        },
      })
        .then(() => true)
        // eslint-disable-next-line no-console
        .catch(console.log);
    }
  };

  onTogglePresentationStyle = () => {
    MessagesManager.updatePresentationStyle(
      this.state.presentationStyle === 'expanded' ? 'compact' : 'expanded'
    )
      .then((presentationStyle) => this.setState({ presentationStyle }))
      // eslint-disable-next-line no-console
      .catch(console.log);
  };

  parseUrl = (url) => {
    const parsedData = url.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
    return JSON.parse(`{"${parsedData}"}`, (key, value) =>
      key === '' ? value : decodeURIComponent(value)
    );
  };

  render() {
    const {
      address,
      message,
      parsedData,
      avatarPreview,
      state,
      recoveryPhrase,
      presentationStyle,
      conversation,
    } = this.state;
    const language = languageMap.en.code;

    const isSender =
      conversation.localParticipiantIdentifier === message.senderParticipantIdentifier;

    const Element = () => {
      if (message.url) {
        switch (parsedData.state) {
          case 'rejected':
            return <Rejected status="rejected" sharedData={parsedData} />;
          case 'transferred':
            return <TransactionDetails transactionId={parsedData.txID} />;
          default:
            return isSender ? (
              <Pending sharedData={parsedData} />
            ) : (
              <Confirm
                state={state}
                message={message}
                conversation={conversation}
                sharedData={parsedData}
                recoveryPhrase={recoveryPhrase}
                composeMessage={this.composeMessage}
                language={language}
              />
            );
        }
      }
      return null;
    };

    let content = <SignInWarning />;

    if (recoveryPhrase) {
      content = message.url ? (
        <Element />
      ) : (
        <Form
          MessagesEvents={MessagesEvents}
          avatarPreview={avatarPreview}
          presentationStyle={presentationStyle}
          keyBoardFocused={this.bindKeyBoardFocused}
          inputAddress={address}
          composeMessage={this.composeMessage}
        />
      );
    }

    return (
      <ThemeContext.Provider value="light">
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#F5F7FA' }}>
          {process.env.NODE_ENV === 'development' && <DevSettings />}
          {content}
        </ScrollView>
      </ThemeContext.Provider>
    );
  }
}

export default LiskMessageExtension;
