//
//  MessagesManager.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 16.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(MessagesManager)
class MessagesManager: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "MessagesManager"
  }

  let messagesVC: MessagesViewController

  init(messagesVC: MessagesViewController) {
    self.messagesVC = messagesVC
  }

  @objc
  func sayHello() {
    print("hello")
    print(self.messagesVC.activeConversation)
  }
}
