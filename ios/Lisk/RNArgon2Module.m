//
//  RNArgon2Module.m
//  Lisk
//
//  Created by Daniel Ayomide on 23/08/2023.
//

#import <React/RCTBridgeModule.h>
#import <CatCrypto/CatCrypto.h>

@interface RCT_EXTERN_MODULE(RNArgon2, NSObject)

RCT_EXTERN_METHOD(argon2: (NSString *)password salt:(NSString *)salt config:(NSDictionary *)config resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
