//
//  MessagesManagerBridge.m
//  LiskMessageExtension
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(MessagesManager, RCTEventEmitter)

RCT_EXTERN_METHOD(getActiveConversation: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(composeMessage:
                  (NSDictionary *)messageData
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(getPresentationStyle: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(updatePresentationStyle:
                  (NSString *)style
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(openURL:
                  (NSString *)urlString
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(showLaunchScreen)
RCT_EXTERN_METHOD(hideLaunchScreen)

@end
