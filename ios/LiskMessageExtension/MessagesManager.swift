//
//  MessagesManager.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 16.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import Messages

enum Events: String {
  case PRESENTATION_STYLE_CHANGED = "onPresentationStyleChanged"
  case DID_BECOME_ACTIVE = "didBecomeActive"
  case DID_SELECT_MESSAGE = "didSelectMessage"
  case DID_RECEIVE_MESSAGE = "didReceiveMessage"
}

@objc(MessagesManager)
class MessagesManager: RCTEventEmitter {
  let messagesVC: MessagesViewController

  override static func moduleName() -> String! {
    return "MessagesManager"
  }

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  override func supportedEvents() -> [String]! {
    return [
      Events.PRESENTATION_STYLE_CHANGED.rawValue,
      Events.DID_BECOME_ACTIVE.rawValue,
      Events.DID_SELECT_MESSAGE.rawValue,
    ]
  }

  init(messagesVC: MessagesViewController) {
    self.messagesVC = messagesVC
  }

  @objc func getPresentationStyle(_ callback: RCTResponseSenderBlock) {
    callback([Mappers.presentationStyleToString(style: self.messagesVC.presentationStyle)])
  }

  @objc func requestPresentationStyle(_ style: NSString, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let presentationStyle: MSMessagesAppPresentationStyle = (
      style == "compact" ? .compact : .expanded
    )

    self.messagesVC.requestPresentationStyle(presentationStyle)

    resolve(style)
  }

  @objc func getActiveConversation(_ callback: RCTResponseSenderBlock) {
    callback([self.messagesVC.activeConversation as Any])
  }

  private func createLayout(caption: NSString) -> MSMessageLayout {
    let layout = MSMessageTemplateLayout()
    layout.imageTitle = "ImageTitle"
    layout.caption = caption as String
    return layout
  }

  @objc func composeMessage(_ messageText: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let conversation = self.messagesVC.activeConversation else {
      fatalError("There's no conversation")
    }

    let session = conversation.selectedMessage?.session ?? MSSession()

    let message = MSMessage(session: session)
    message.layout = self.createLayout(caption: messageText)
    message.summaryText = "Message Summary Text"

    conversation.insert(message) { (error) in
      if error != nil {
        return reject("ERROR", "ERROR", error)
      }

      return resolve("Success!")
    }
  }
}

extension MessagesManager: MessagesViewControllerDelegate {
  func didBecomeActive(with conversation: MSConversation) {
    self.sendEvent(withName: Events.DID_BECOME_ACTIVE.rawValue, body: [
      "conversation": "conversation",
    ])
  }

  func didSelect(message: MSMessage, conversation: MSConversation) {
    self.sendEvent(withName: Events.DID_SELECT_MESSAGE.rawValue, body: [
      "message": Mappers.messageToObject(message: message),
      "conversation": Mappers.conversationToObject(conversation: conversation)
    ])
  }

  func didReceive(message: MSMessage, conversation: MSConversation) {
    print("didReceive", message, conversation)
  }

  func didTransition(to presentationStyle: MSMessagesAppPresentationStyle) {
    self.sendEvent(withName: Events.PRESENTATION_STYLE_CHANGED.rawValue, body: [
      "presentationStyle": Mappers.presentationStyleToString(style: presentationStyle)
    ])
  }
}
