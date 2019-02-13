import React, { Component } from 'react';
import {
  ScrollView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import { getPassphraseFromKeyChain } from '../../utilities/passphrase';
import ThemeContext from '../../contexts/theme';
import Confirm from './confirm';
import TxDetail from './txDetail';
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

  componentDidMount = () => {
    getPassphraseFromKeyChain().then((account) => {
      if (account) {
        this.userData = {
          passphrase: account.password,
          address: account.username,
        };
        this.setState({
          passphrase: account.password,
          address: {
            value: account.username,
            validity: -1,
          },
          avatarPreview: true,
        }, () => setTimeout(() => MessagesManager.hideLaunchScreen(), 100));
      } else {
        MessagesManager.hideLaunchScreen();
      }
    });

    MessagesManager.getActiveConversation((conversation, message) =>
      this.setState({
        conversation,
        message,
        parsedData: message.url ? this.parseUrl(message.url) : {},
      }));

    MessagesManager.getPresentationStyle(presentationStyle =>
      this.setState({ presentationStyle }));

    MessagesEvents.addListener(
      'onPresentationStyleChanged',
      ({ presentationStyle }) => this.setState({ presentationStyle }),
    );

    MessagesEvents.addListener(
      'didSelectMessage',
      ({ conversation, message }) => this.setState({
        conversation,
        message,
        parsedData: this.parseUrl(message.url),
      }),
    );

    MessagesEvents.addListener(
      'didStartSendingMessage',
      ({ conversation }) => this.setState({
        conversation,
        message: {},
        state: 'requested',
        avatarPreview: !!this.userData.address,
        address: {
          value: this.userData.address || '',
          validity: -1,
        },
      }),
    );
  };

  keyBoardFocused = () => {
    MessagesManager.updatePresentationStyle('expanded');
  }

  composeMessage = ({
    address, amount, state = 'requested', id, recipientAddress,
  }) => {
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
        // eslint-disable-next-line no-console
        .then(() => true).catch(console.log);
    }
  };

  onTogglePresentationStyle = () => {
    MessagesManager.updatePresentationStyle(this.state.presentationStyle === 'expanded' ? 'compact' : 'expanded')
      // eslint-disable-next-line no-console
      .then(presentationStyle => this.setState({ presentationStyle })).catch(console.log);
  };

  parseUrl = (url) => {
    const parsedData = url.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
    return JSON
      .parse(
        `{"${parsedData}"}`,
        (key, value) => (key === '' ? value : decodeURIComponent(value)),
      );
  }

  render() {
    const {
      address, message, parsedData, avatarPreview, state,
      passphrase, presentationStyle, conversation,
    } = this.state;

    const Element = () => {
      if (message.url) {
        switch (parsedData.state) {
          case 'rejected':
            return <Rejected status='rejected' sharedData={parsedData} />;
          case 'transferred':
            return (
              <TxDetail
                account={{ address: address.value }}
                sharedData={parsedData}
                txID={parsedData.txID}
              />
            );
          default:
            return (
              <Confirm
                state={state}
                message={message}
                conversation={conversation}
                sharedData={parsedData}
                passphrase={passphrase}
                composeMessage={this.composeMessage}
              />
            );
        }
      }
      return null;
    };

    let content = <SignInWarning />;

    if (passphrase) {
      content = message.url ? <Element /> : (
        <Form
          MessagesEvents={MessagesEvents}
          avatarPreview={avatarPreview}
          presentationStyle={presentationStyle}
          keyBoardFocused={this.keyBoardFocused}
          inputAddress={address}
          composeMessage={this.composeMessage}
        />
      );
    }

    return (
      <ThemeContext.Provider value="light">
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {process.env.NODE_ENV === 'development' && <DevSettings />}
          {content}
        </ScrollView>
      </ThemeContext.Provider>
    );
  }
}

export default LiskMessageExtension;
