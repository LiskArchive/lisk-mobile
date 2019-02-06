//
//  RNModuleInitialiser.swift
//  LiskMessageExtension
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
    let url = RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index.message", fallbackResource: nil)
    return url
  }

  func extraModules(for bridge: RCTBridge!) -> [RCTBridgeModule]! {
    var extraModules = [RCTBridgeModule]()

    let messagesManager = MessagesManager(messagesVC: self.messagesVC)
    self.messagesVC.delegate = messagesManager
    extraModules.append(messagesManager)
    return extraModules
  }
}
