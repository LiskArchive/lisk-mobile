# Lisk iMessage Extension

iMessage extension for Lisk Mobile.

## How does it work?

After `MessagesViewController` is initialized and active, we instatiate `RCTRootView` and set it as the active view of the presented UI. You can find the React Native module [here]('../../index.messages.js'). This module communicates with the native part through a bridge.

## Native Module API

We export a native module called `MessagesManager` which can be accessed via React Native's [NativeModules](https://facebook.github.io/react-native/docs/native-modules-ios) and [NativeEventEmitter].(https://facebook.github.io/react-native/docs/native-modules-ios#sending-events-to-javascript) utilities.

```jsx
import { NativeModules, NativeEventEmitter } from 'react-native'

const { MessagesManager } = NativeModules
const MessagesEvents = new NativeEventEmitter(MessagesManager)
```

## Methods

### showLaunchScreen()

Shows launch screen, which is shown by default.

### hideLaunchScreen()

Hides launch screen.

### getActiveConversation(cb(conversation: Conversion, message: Message))

Returns the active conversation and selected message. You can call this on `componentDidMount` to initialize your flow.

### getPresentationStyle(cb(style: PresentationStyle))

Returns the current presentation style. You can call this on `componentDidMount` and store the style in your state in order to update the UI respectively.

### updatePresentationStyle(style: PresentationStyle) -> Promise

This method can be used to update the presentation style. Returns updated style in case of success.

### composeMessage(message: MessageData) -> Promise

Can be used to compose and insert a message object to the conversation. Returns a promise instance.

### openURL(url: String) -> Promise

Can be used to open a URL. Recommended for opening the host app. Returns a promise instance.

## Events

### didSelectMessage --> { conversation: Conversation, message: Message }

Will be called when the user selects a message.

### didReceiveMessage --> { conversation: Conversation, message: Message }

Will be called when a message received from remote participant.

### didStartSendingMessage --> { conversation: Conversation, message: Message }

Will be invoked when the user sent a message object.

### didCancelSendingMessage --> { conversation: Conversation, message: Message }

Will be invoked when the user deletes a message object from the Messages app’s input field.

### onPresentationStyleChanged --> { presentationStyle: PresentationStyle }

Will be called when presentation style is changed by system or native UI controllers.

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

Used to construct the message content and layout on the iOS side.

```js
{
  url: String,
  summaryText: String?,
  layout: {
    imageName: String?, // image name to match from XCode assets
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

Used to describe the presentation style

```
compact || expanded
```

<img src="https://cdn-images-1.medium.com/max/1600/1*XFJVw_uy8iTH3voNToP26w.png" width="320" />
