import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import Lisk from '@liskhq/lisk-client';
import { getPassphraseFromKeyChain } from '../../utilities/passphrase';
import ThemeContext from '../../contexts/theme';
// import styles from './styles';
import Confirm from './imessageConfirm';
import TxDetail from './txDetail';
import Form from './form';
import DevSettings from './devSettings';

const config = {
  nodes: ['https://testnet.lisk.io'],
  nethash: 'net',
};


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
    activePeer: null,
  };

  componentDidMount = () => {
    const liskAPIClient = new Lisk.APIClient(config.nodes, {
      nethash: config.nethash,
    });
    liskAPIClient.node.getConstants().then((response) => {
      // loadingFinished('getConstants');
      config.nethash = response.data.nethash;
      this.setState({
        activePeer: new Lisk.APIClient(config.nodes, {
          nethash: config.nethash,
        }),
      });
    });


    NativeModules.DevSettings.setIsDebuggingRemotely(true);
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
        });
      }
    });
    MessagesManager.getActiveConversation((conversation, message) =>
      this.setState({
        conversation,
        message,
        parsedData: this.parseUrl(message.url),
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
    address, amount, state = 'requested', id,
  }) => {
    if (address.validity !== 1) {
      const txID = id ? `&txID=${id}` : '';
      const url = `?address=${address.value}&amount=${amount}&state=${state}${txID}`;
      // this.setState({ url });
      MessagesManager.updatePresentationStyle('compact');
      MessagesManager.composeMessage({
        summaryText: 'Summary Text',
        url,
        layout: {
          imageTitle: '',
          caption: `${amount}LSK is ${state}`,
          subcaption: `by ${address.value}`,
        },
      })
        .then(() => true)
        .catch(console.log);
    }
  };

  onTogglePresentationStyle = () => {
    MessagesManager.updatePresentationStyle(this.state.presentationStyle === 'expanded' ? 'compact' : 'expanded')
      .then(presentationStyle => this.setState({ presentationStyle }))
      .catch(console.log);
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
      address, message, parsedData, avatarPreview,
      passphrase, activePeer, presentationStyle,
    } = this.state;

    const Element = () => {
      if (message.url && activePeer) {
        switch (parsedData.state) {
          case 'rejected':
            return <Text> this request has been rejected</Text>;
          case 'transferred':
            return <TxDetail
              account={{ address: address.value }}
              activePeer={activePeer}
              txID={parsedData.txID} />;
          default:
            return <Confirm
              sharedData={parsedData}
              passphrase={passphrase}
              activePeer={activePeer}
              composeMessage={this.composeMessage} />;
        }
      }
      return null;
    };


    return (
      <ThemeContext.Provider value="light">
        <ScrollView>
          {process.env.NODE_ENV === 'development' && <DevSettings />}

          {
            message.url ?
              <Element /> :
              <Form
                MessagesEvents={MessagesEvents}
                avatarPreview={avatarPreview}
                presentationStyle={presentationStyle}
                keyBoardFocused={this.keyBoardFocused}
                inputAddress={address}
                composeMessage={this.composeMessage} />
          }
        </ScrollView>
      </ThemeContext.Provider>
    );
  }
}

export default LiskMessageExtension;
