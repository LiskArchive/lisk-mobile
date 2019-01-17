//
//  MessagesViewController.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 16.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import Messages

protocol MessagesViewControllerDelegate {
  func didTransition(to presentationStyle: MSMessagesAppPresentationStyle)
  func didBecomeActive(with conversation: MSConversation)
  func didSelect(message: MSMessage, conversation: MSConversation)
  func didReceive(message: MSMessage, conversation: MSConversation)
  func didStartSending(message: MSMessage, conversation: MSConversation)
  func didCancelSending(message: MSMessage, conversation: MSConversation)
}

class MessagesViewController: MSMessagesAppViewController {
  var delegate: MessagesViewControllerDelegate?

  override func willBecomeActive(with conversation: MSConversation) {
    super.willBecomeActive(with: conversation)
    self.presentReactNativeView(conversation: conversation)
  }

  override func didBecomeActive(with conversation: MSConversation) {
    self.delegate?.didBecomeActive(with: conversation)
  }

  override func didSelect(_ message: MSMessage, conversation: MSConversation) {
    self.delegate?.didSelect(message: message, conversation: conversation)
  }

  override func didReceive(_ message: MSMessage, conversation: MSConversation) {
    self.delegate?.didReceive(message: message, conversation: conversation)
  }

  override func didStartSending(_ message: MSMessage, conversation: MSConversation) {
    self.delegate?.didStartSending(message: message, conversation: conversation)
  }

  override func didCancelSending(_ message: MSMessage, conversation: MSConversation) {
    self.delegate?.didCancelSending(message: message, conversation: conversation)
  }

  override func didTransition(to presentationStyle: MSMessagesAppPresentationStyle) {
    self.delegate?.didTransition(to: presentationStyle)
  }

  func presentReactNativeView(conversation: MSConversation) {
    let moduleInitialiser = RNModuleInitialiser(messagesVC: self)
    let bridge = RCTBridge(delegate: moduleInitialiser, launchOptions: nil)
    let rootView = RCTRootView(bridge: bridge, moduleName: "LiskMessageExtension", initialProperties: nil)

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.addChild(rootViewController)
    rootViewController.view.frame = self.view.bounds

    self.view.addSubview(rootViewController.view)
    self.didMove(toParent: rootViewController)
  }
}
