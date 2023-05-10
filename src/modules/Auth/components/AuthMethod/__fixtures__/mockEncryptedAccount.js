export const mockEncryptedAccount = {
  crypto: {
    ciphertext:
      '5f6596b488a7bdc02ded8f4d6b085ac06095e108a8810ab47607ff68bba3bb3f81d9659730e26d5495ccf08df0b746cf5aab62d8c8623e6decd9a86d6ad9eb0e478e606d01faecffab6a78b0d5884e6f3f14970e096451a46960b5644e755740bc1145db4be8c949906bba5af1e27df5a7c0b896b1dae3786184339fdbd59741e1875d0cbc6dd3de3036c808892fe6d93aced5b280fb8e295655ca8c866ed781266c10252ab280e17bae4c0988ac2047d08502d131f2833e6e643b3ef16f74edba60fdf34fbbfe6b3cfc5293b2809bed025d71e87b088792388f8643440b173b42a82eafe98e',
    mac: 'b112d6f888d9b117c3b7cedf50bfc9140a6dd41570d6183571eba48ccf36ff66',
    kdf: 'PBKDF2',
    kdfparams: {
      parallelism: 4,
      iterations: 1,
      memorySize: 4,
      salt: 'cb104bc3f055d55772333b9ff4ddff2c',
    },
    cipher: 'aes-256-gcm',
    cipherparams: { iv: 'cacff46a699235f39fe0e8ed', tag: '9cc0fdc01f0be5624c82fc4c49b5c4ef' },
    version: '1',
  },
  metadata: {
    name: 'lisker',
    pubkey: '5697f5cd50f1f2f3e2f0fa33b88d9b4d21a8d171a14027ccbf92e16ee75f9dcd',
    path: "m/44'/134'/0'",
    address: 'lsk37td3znsfg7q6tbjanfcbedhtamgzkmc7ayxsr',
    creationTime: '2023-01-08T18:40:41.876Z',
  },
  version: 1,
};
