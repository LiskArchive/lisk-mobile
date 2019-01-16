//
//  RNModuleInitialiser.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 16.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

@objc(RNModuleInitialiser)
class RNModuleInitialiser: NSObject {
  let messagesVC: MessagesViewController

  init(messagesVC: MessagesViewController) {
    self.messagesVC = messagesVC
  }
}

extension RNModuleInitialiser: RCTBridgeDelegate {

  func sourceURL(for bridge: RCTBridge!) -> URL! {
    return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index.message", fallbackResource: nil)
  }

  func extraModules(for bridge: RCTBridge!) -> [RCTBridgeModule]! {
    var extraModules = [RCTBridgeModule]()

    let messagesManager = MessagesManager(messagesVC: self.messagesVC)
    extraModules.append(messagesManager)

    return extraModules
  }
}
