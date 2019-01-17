import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  button: {
    margin: 12,
    fontSize: 24,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    margin: 12,
    color: 'white',
  },
});

const { MessagesManager } = NativeModules;
const MessagesEvents = new NativeEventEmitter(MessagesManager);

class LiskMessageExtension extends Component {
  state = {
    presentationStyle: '',
    message: '',
    conversation: '',
  }

  componentDidMount() {
    MessagesManager
      .getPresentationStyle(presentationStyle => this.setState({ presentationStyle }));

    MessagesEvents
      .addListener('onPresentationStyleChanged', ({ presentationStyle }) => this.setState({ presentationStyle }));

    MessagesEvents
      .addListener('didBecomeActive', ({ conversation }) => this.setState({ conversation }));

    MessagesEvents
      .addListener('didSelectMessage', ({ message, conversation }) => this.setState({ message, conversation }));
  }

  onReload = () => {
    NativeModules.DevMenu.reload();
  }

  onComposeTestMessage = () => {
    MessagesManager
      .composeMessage(`Test ${Date.now()}`)
      .then(MessagesManager.requestPresentationStyle('compact'))
      .catch(console.log);
  }

  onTogglePresentationStyle = () => {
    MessagesManager
      .requestPresentationStyle(this.state.presentationStyle === 'expanded' ? 'compact' : 'expanded')
      .then(presentationStyle => this.setState({ presentationStyle }))
      .catch(console.log);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          style={styles.button}
          onPress={this.onReload}
          title="Reload (buggy)"
        />

        <Text style={styles.text}>
          {`Current Presentation Style: ${this.state.presentationStyle}`}
        </Text>
        <Text style={styles.text}>
          {`Conversation: ${JSON.stringify(this.state.conversation)}`}
        </Text>
        <Text style={styles.text}>
          {`Message: ${JSON.stringify(this.state.message)}`}
        </Text>

        <Button
          style={styles.button}
          onPress={this.onComposeTestMessage}
          title="Compose Test Message"
        />

        <Button
          style={styles.button}
          onPress={this.onTogglePresentationStyle}
          title={`${this.state.presentationStyle === 'expanded' ? 'Collapse' : 'Expand'} the View!`}
        />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('LiskMessageExtension', () => LiskMessageExtension);
