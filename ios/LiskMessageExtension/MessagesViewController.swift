//
//  MessagesViewController.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 16.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import Messages

class MessagesViewController: MSMessagesAppViewController {
  override func viewDidLoad() {
    super.viewDidLoad()
  }

  // MARK: - Conversation Handling
  override func willBecomeActive(with conversation: MSConversation) {
    super.willBecomeActive(with: conversation)
    self.presentReactNativeView()
  }

  func presentReactNativeView() {
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
