//
//  Mappers.swift
//  LiskMessageExtension
//

import Foundation
import Messages

class Mappers {
  static func messageToObject(message: MSMessage, withParticipiantIdentifier: Bool = true) -> [String: Any?] {
    return [
      "senderParticipantIdentifier": withParticipiantIdentifier ? message.senderParticipantIdentifier.uuidString : "",
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
