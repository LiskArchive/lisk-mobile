import { cryptography } from '@liskhq/lisk-client';
import { decryptAccount } from './decryptAccount';

const recoveryPhrase = 'target cancel solution recipe vague faint bomb convince pink vendor fresh patrol';
const encryptedPassphrase = {
  kdf: 'argon2id',
  kdfparams: {
    parallelism: 4,
    iterations: 1,
    memory: 2048,
    salt: '30fc0301d36fcdc7bd8204e19a0043fc',
  },
  cipher: 'aes-256-gcm',
  cipherparams: {
    iv: '281d21872c2d303e59850ce4',
    tag: '2458479edf6aea5c748021ae296e467d',
  },
  ciphertext:
    '44fdb2b132d353a5c65f04e5e3afdd531f63abc45444ffd4cdbc7dedc45f899bf5b7478947d57319ea8c620e13480def8a518cc05e46bdddc8ef7c8cfc21a3bd',
};

const privateKey = 'd92f8ffd3046fa9de33c21cef7af6f1315e289003c19f9b23ce6d499c8641d4e0792fecbbecf6e7370f7a7b217a9d159f380d3ecd0f2760d7a55dd3e27e97184';
const publicKey = '0792fecbbecf6e7370f7a7b217a9d159f380d3ecd0f2760d7a55dd3e27e97184';
const defaultKeys = {
  privateKey: Buffer.from(privateKey, 'hex'),
  publicKey: Buffer.from(publicKey, 'hex'),
};

jest.spyOn(cryptography.ed, 'getKeys').mockReturnValue(defaultKeys);
jest.spyOn(cryptography.encrypt, 'decryptMessageWithPassword').mockResolvedValue(JSON.stringify({
  recoveryPhrase,
}));

describe('decryptAccount', () => {
  it('decrypts account when the correct arguments are passed', async () => {
    const password = 'samplePassword@1';
    const res = await decryptAccount(encryptedPassphrase, password);
    expect(res).toEqual(recoveryPhrase);
  });
});
