//
//  MessagesManager+MessagesViewControllerDelegate.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 17.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import Messages

extension MessagesManager: MessagesViewControllerDelegate {
  func didBecomeActive(with conversation: MSConversation) {
  }

  func didSelect(message: MSMessage, conversation: MSConversation) {
    guard self.hasListeners && self.didSelectEventLock == false else { return }

    self.sendEvent(withName: Events.DID_SELECT_MESSAGE.rawValue, body: [
      "message": Mappers.messageToObject(message: message),
      "conversation": Mappers.conversationToObject(conversation: conversation)
      ])
  }

  func didReceive(message: MSMessage, conversation: MSConversation) {
    guard self.hasListeners else { return }

    self.sendEvent(withName: Events.DID_RECEIVE_MESSAGE.rawValue, body: [
      "message": Mappers.messageToObject(message: message),
      "conversation": Mappers.conversationToObject(conversation: conversation)
      ])
  }

  func didStartSending(message: MSMessage, conversation: MSConversation) {
    guard self.hasListeners else { return }

    self.didSelectEventLock = false
    self.sendEvent(withName: Events.DID_START_SENDING_MESSAGE.rawValue, body: [
      "message": Mappers.messageToObject(message: message),
      "conversation": Mappers.conversationToObject(conversation: conversation)
      ])
  }

  func didCancelSending(message: MSMessage, conversation: MSConversation) {
    guard self.hasListeners else { return }

    self.didSelectEventLock = false
    self.sendEvent(withName: Events.DID_CANCEL_SENDING_MESSAGE.rawValue, body: [
      "message": Mappers.messageToObject(message: message),
      "conversation": Mappers.conversationToObject(conversation: conversation)
      ])
  }

  func didTransition(to presentationStyle: MSMessagesAppPresentationStyle) {
    guard self.hasListeners else { return }

    self.sendEvent(withName: Events.PRESENTATION_STYLE_CHANGED.rawValue, body: [
      "presentationStyle": Mappers.presentationStyleToString(style: presentationStyle)])
  }
}
