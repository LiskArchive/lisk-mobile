import { NativeModules } from 'react-native';

const { RNArgon2 } = NativeModules;

// Define the function
export const getKeyFromPasswordWithArgon2 = async (options) => {
  const { parallelism, password, iterations } = options;
  const salt = options.salt.toString('hex');

  const result = await RNArgon2.argon2(password, salt, {
    iterations,
    memory: 64 * 1024,
    parallelism,
    hashLength: 32,
    mode: 'argon2id',
  });
  const key = Buffer.from(result.rawHash, 'hex');
  return key;
};
