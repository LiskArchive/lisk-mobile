//
//  RNArgon2Module.m
//  Lisk
//
//  Created by Daniel Ayomide on 23/08/2023.
//

import Foundation
import CatCrypto

@objc(RNArgon2)
class RNArgon2: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func argon2(_ password: String, salt: String, config: NSDictionary? = nil, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    
      // Initialize the Argon2 hashing context.
      let context = CatArgon2Context.init();
      let config = config as! Dictionary<String,Any>

      context.iterations = config["iterations", default: 2 ] as! Int;
      context.memory = config["memory", default: 32 * 1024 ] as! Int;
      context.parallelism = config["parallelism", default: 1 ] as! Int;
      context.salt = salt;
      context.hashLength = config["hashLength", default: 32 ] as! Int;
      context.mode = getArgon2Mode(mode: config["mode", default: "argon2id" ] as! String);

      let hasher = CatArgon2Crypto.init(context: context);
      let encodedHashResult = hasher.hash(password: password);

      // Check and handle if there was an error during encoding.
      if let encodingError = encodedHashResult.error {
          reject("E_ARGON2", "Unable to create encoded Argon2 hash", NSError(domain: "io.lisk.mobile", code: 200, userInfo: ["Error reason": "Encoded hash generation failed"]))
          return
      }

      // Set the hasher to hash as raw since encoded is the default
      hasher.context.hashResultType = .hashRaw;
      let rawHashResult = hasher.hash(password: password);

      // Check and handle if there was an error during raw hash generation.
      if let rawError = rawHashResult.error {
          reject("E_ARGON2", "Unable to create raw Argon2 hash", NSError(domain: "io.lisk.mobile", code: 201, userInfo: ["Error reason": "Raw hash generation failed"]))
          return
      }

      let rawHash = rawHashResult.hexStringValue();
      let encodedHash = encodedHashResult.stringValue();

      // Prepare the result dictionary to be sent back to JavaScript side.
      let resultDictionary: NSDictionary = [
          "rawHash" : rawHash,
          "encodedHash" : encodedHash,
      ]
      resolve(resultDictionary);
  }

  func getArgon2Mode(mode: String) -> CatArgon2Mode {
    switch mode {
    case "argon2d":
      return .argon2d
    case "argon2i":
      return .argon2i
    default:
      return .argon2id
    }
  }
}
