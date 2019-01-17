//
//  Mappers.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 17.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import Messages

class Mappers {
  static func messageToObject(message: MSMessage) -> [String: Any?] {
    return [
      "senderParticipantIdentifier": message.senderParticipantIdentifier.uuidString,
      "summaryText": message.summaryText,
      "url": message.url?.absoluteString,
      "shouldExpire": message.shouldExpire,
    ]
  }

  static func conversationToObject(conversation: MSConversation) -> [String: Any?] {
    return [
      "localParticipiantIdentifier": conversation.localParticipantIdentifier.uuidString,
      "remoteParticipantIdentifiers": conversation.remoteParticipantIdentifiers.map {$0.uuidString}
    ]
  }

  static func presentationStyleToString(style: MSMessagesAppPresentationStyle) -> String {
    return style == .compact ? "compact" : "expanded"
  }
}
