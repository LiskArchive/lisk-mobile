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
  static func messageToObject(message: MSMessage) -> Any {
    return [
      "summaryText": message.summaryText
    ]
  }

  static func conversationToObject(conversation: MSConversation) -> Any {
    return [
      "localParticipiantIdentifier": conversation.localParticipantIdentifier.uuidString,
    ]
  }

  static func presentationStyleToString(style: MSMessagesAppPresentationStyle) -> String {
    return style == .compact ? "compact" : "expanded"
  }
}
