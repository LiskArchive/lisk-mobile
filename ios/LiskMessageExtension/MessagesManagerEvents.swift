//
//  MessagesManagerEvents.swift
//  LiskMessageExtension
//
//  Created by Altay Aydemir on 17.01.19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

enum Events: String {
  // Life Cycle
  case WILL_BECOME_ACTIVE = "willBecomeActive"
  case DID_BECOME_ACTIVE = "didBecomeActive"

  // UI - Message
  case DID_SELECT_MESSAGE = "didSelectMessage"
  case DID_RECEIVE_MESSAGE = "didReceiveMessage"
  case DID_START_SENDING_MESSAGE = "didStartSendingMessage"
  case DID_CANCEL_SENDING_MESSAGE = "didCancelSendingMessage"

  // UI - Layout
  case PRESENTATION_STYLE_CHANGED = "onPresentationStyleChanged"
}
