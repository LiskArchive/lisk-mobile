import { NativeModules } from 'react-native';

const { RNArgon2 } = NativeModules;

export const getKeyFromPasswordWithArgon2 = async (options) => {
  const { parallelism, password } = options;
  const salt = options.salt.toString('hex');

  const result = await RNArgon2.argon2(password, salt, {
    iterations: 3,
    memory: 65536,
    parallelism,
    hashLength: 32,
    mode: 'argon2id',
  });
  const key = Buffer.from(result.rawHash, 'hex');
  return key;
};
