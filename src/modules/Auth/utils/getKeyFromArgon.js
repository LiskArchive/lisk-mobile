import { NativeModules } from 'react-native';

const { RNArgon2 } = NativeModules;

export const getKeyFromPasswordWithArgon2 = async (options) => {
  const { parallelism, password, iterations, memory, hashLength } = options;
  const salt = options.salt.toString('hex');

  const result = await RNArgon2.argon2(password, salt, {
    iterations,
    memory,
    parallelism,
    hashLength,
    mode: 'argon2id',
  });
  const key = Buffer.from(result.rawHash, 'hex');
  return key;
};
