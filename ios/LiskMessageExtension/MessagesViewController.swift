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
  var moduleInitialiser: RNModuleInitialiser?
  var bridge: RCTBridge?

  override func willBecomeActive(with conversation: MSConversation) {
    super.willBecomeActive(with: conversation)
    self.presentReactNativeView()
  }

  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    self.removeAllChildViewControllers()
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

  private func removeAllChildViewControllers() {
    for child in self.children {
      child.willMove(toParent: nil)
      child.view.removeFromSuperview()
      child.removeFromParent()
    }
  }

  private func presentReactNativeView() {
    self.removeAllChildViewControllers()
    self.moduleInitialiser = RNModuleInitialiser(messagesVC: self)
    self.bridge = RCTBridge(delegate: moduleInitialiser, launchOptions: nil)

    let rootView = RCTRootView(bridge: bridge, moduleName: "LiskMessageExtension", initialProperties: nil)
    let rootViewController = UIViewController()
    rootViewController.view = rootView

    let loadingView = Bundle.main.loadNibNamed("Loading", owner: nil, options: nil)![0] as! UIView
    loadingView.frame = self.view.bounds


    rootView?.loadingView = loadingView
    rootView?.loadingViewFadeDelay = 0
    rootView?.loadingViewFadeDuration = 0

    self.addChild(rootViewController)

    rootViewController.view.frame = self.view.bounds
    rootViewController.view.translatesAutoresizingMaskIntoConstraints = false

    self.view.addSubview(rootViewController.view)
    NSLayoutConstraint.activate([
      rootViewController.view.leftAnchor.constraint(equalTo: self.view.leftAnchor),
      rootViewController.view.rightAnchor.constraint(equalTo: self.view.rightAnchor),
      rootViewController.view.topAnchor.constraint(equalTo: self.view.topAnchor),
      rootViewController.view.bottomAnchor.constraint(equalTo: self.view.bottomAnchor),
      ])

    self.didMove(toParent: self)
  }
}
