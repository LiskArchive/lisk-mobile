export default {
  encryptedPassphrase: {
    ciphertext:
      'a6411a24f51cc006c6568d558fb67d458f67c737f5206e2f5d577502d67a16fff0d7b5fa765e5538e8ca2a5df8c13fc1b3fc17b4421ef9cc66a4687a943cabd7f94dbd0813f7b8ec7c61c11353ed56f8da073d095950f50a5e58ff078cfd1e6e602b0467cd51c4d0d09429724b37b3fb85bef604d078a857b0c94f534d0d1b264ae4436edd6061d356d5654aaff46cec46bf16e77ce28e1f69be701eceff16c63a6c992081c2d920e8c08e45cf3f4129698c7278846853a33bd93f52fe2b8e0fb1b6143effad13bb7b6e4b7915c983371352c300cd753d3099814080470d3e99d6475fbe7f1a3ec94fa99cfbf0378ebf39457d20b24099a99de56a186616f0e20c5356d5cb66cdcbc61efbce9ee2fce7231a6d613d79ed840a6a6b1b5bd8d4cf48c1e47532e19e2c6816ed6e0949b7d3425b73bb66e3bc6395',
    mac: 'ed6fc369e7d4cadfac0dccd7564ce1fcde38b5cf46d0b00da04a92ae058d668f',
    kdf: 'argon2id',
    kdfparams: {
      parallelism: 4,
      iterations: 1,
      memorySize: 2024,
      salt: 'b3e4e81ec5d09d9b5bd8640a131ff2d7',
    },
    cipher: 'aes-256-gcm',
    cipherparams: { iv: '299799843ecca3ffa44d2e79', tag: 'b491d9e943cee19ad9b56f2e24cf9bcd' },
    version: '1',
  },
  metadata: {
    name: 'manu',
    pubkey: 'a3f96c50d0446220ef2f98240898515cbba8155730679ca35326d98dcfb680f0',
    path: "m/44'/134'/0'",
    address: 'lske5sqed53fdcs4m9et28f2k7u9fk6hno9bauday',
    creationTime: '2022-10-12T13:31:52.928Z',
  },
  version: 1,
};
