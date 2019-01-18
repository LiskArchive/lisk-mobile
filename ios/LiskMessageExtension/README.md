# Lisk iMessage Extension

iMessage extension for Lisk Mobile.

## How does it work?
As soon as `MessagesViewController` initializes and becomes active, we create a `RCTRootView` instance and make it the active view of the presented UI. React Native part of the code is located [here]('../../index.messages.js') and it communicates with the native part through a bridge.

## Native Module API
We export a native module called `MessagesManager` which can be accessed via React Native's [NativeModules](https://facebook.github.io/react-native/docs/native-modules-ios) and [NativeEventEmitter](https://facebook.github.io/react-native/docs/native-modules-ios#sending-events-to-javascript) utilities.

```jsx
import { NativeModules, NativeEventEmitter } from 'react-native';

const { MessagesManager } = NativeModules;
const MessagesEvents = new NativeEventEmitter(MessagesManager);
```

## Methods
### getActiveConversation(cb(conversation: Conversion, message: Message))
Returns the active conversation and selected message. You can call this on `componentDidMount` to initialise your flow.

### getPresentationStyle(cb(style: PresentationStyle))
Returns the current presentation style. You can call this on `componentDidMount` and keep the style in your state for updating the UI with respect to it.

### updatePresentationStyle(style: PresentationStyle) -> Promise
Can be used for updating the presentation style. Returns updated style on success case.

### composeMessage(message: MessageData) -> Promise
Can be used for composing and inserting a message object to the conversation. Returns a promise with success/error objects.

## Events
### didSelectMessage --> { conversation: Conversation, message: Message }
Called when user selects a message.

### didReceiveMessage --> { conversation: Conversation, message: Message }
Called when a message received from remote participicant.

### didStartSendingMessage --> { conversation: Conversation, message: Message }
Invoked when the user sends a message object.

### didCancelSendingMessage --> { conversation: Conversation, message: Message }
Invoked when the user deletes a message object from the Messages app’s input field.

### onPresentationStyleChanged --> { presentationStyle: PresentationStyle } 
Called when presentation style is changed by system or native UI controls.

## Models
### Conversation: Object
JS mapping for [MSConversation](https://developer.apple.com/documentation/messages/msconversation) object.

```js
{
  localParticipiantIdentifier: String,
  remoteParticipantIdentifiers: [String]
}
```

### Message: Object
JS mapping for [MSMessage](https://developer.apple.com/documentation/messages/msmessage) object.

```js
{
  senderParticipantIdentifier: String?,
  summaryText: String,
  url: String,
  shouldExpire: Bool
}
```

### MessageData: Object
Used for constructing the message and its layout on the iOS side.

```js
{
  url: String,
  summaryText: String?,
  layout: {
    imageTitle: String?,
    imageSubtitle: String?,
    caption: String,
    subcaption: String?,
    trailingCaption: String?,
    trailingSubcaption: String?
  },
}
```

<img src="https://docs-assets.developer.apple.com/published/af521ba258/MSMessageTemplateLayout_2x_93d9e9b7-b99c-4def-a8e1-2df50a710a52.png" width="320" />

### Presentation Style: String
Used for describing the presentation style

```
compact || expanded
```

<img src="https://cdn-images-1.medium.com/max/1600/1*XFJVw_uy8iTH3voNToP26w.png" width="320" />
