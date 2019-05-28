//
//  MessagesManagerBridge.m
//  LiskMessageExtension
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

/**
 * Same as RCT_EXPORT_MODULE, but uses __attribute__((constructor)) for module
 * registration. Useful for registering swift classes that forbids use of load
 * Used in RCT_EXTERN_REMAP_MODULE
 * To-Do this function should be remove after udating react-native to version 0.59.*
 */
#define RCT_EXPORT_MODULE_NO_LOAD(js_name, objc_name) \
RCT_EXTERN void RCTRegisterModule(Class); \
+ (NSString *)moduleName { return @#js_name; } \
__attribute__((constructor)) static void \
RCT_CONCAT(initialize_, objc_name)() { RCTRegisterModule([objc_name class]); }

#define RCT_EXTERN_MODULE_2(objc_name, objc_supername) \
RCT_EXTERN_REMAP_MODULE_2(, objc_name, objc_supername)

/**
 * Like RCT_EXTERN_MODULE, but allows setting a custom JavaScript name.
 * To-Do this function should be remove after udating react-native to version 0.59.*
 */
#define RCT_EXTERN_REMAP_MODULE_2(js_name, objc_name, objc_supername) \
objc_name : objc_supername \
@end \
@interface objc_name (RCTExternModule) <RCTBridgeModule> \
@end \
@implementation objc_name (RCTExternModule) \
RCT_EXPORT_MODULE_NO_LOAD(js_name, objc_name)

@interface RCT_EXTERN_MODULE_2(MessagesManager, RCTEventEmitter)

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
