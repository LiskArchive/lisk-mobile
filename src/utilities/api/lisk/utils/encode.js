/* eslint-disable no-restricted-syntax */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint-disable no-bitwise */
const BigInt = require('big-integer');

const msg = 0x80;
const rest = 0x7f;

const writeUInt32 = value => {
  const result = [];
  let index = 0;
  while (value > rest) {
    result[index] = msg | ((value & rest) >>> 0);
    value = (value >>> 7) >>> 0;
    index += 1;
  }

  result[index] = value;

  return Buffer.from(result);
};

const writeBytes = bytes =>
  Buffer.concat([writeUInt32(bytes.length), bytes]);

const writeString = value => {
  const stringBuffer = Buffer.from(value, 'utf8');
  return writeBytes(stringBuffer);
};

const writeUInt64 = value => {
  const result = [];
  let index = 0;
  while (value > BigInt(rest)) {
    result[index] = BigInt(msg).or(value.and(BigInt(rest))).toJSNumber();
    value = value.shiftRight(7);
    index += 1;
  }

  result[Number(index)] = value.toJSNumber();

  return Buffer.from(result);
};

const generateKey = (type, fieldNumber) => {
  let wireType;
  switch (type) {
    case 'bytes':
    case 'string':
    case 'object':
    case 'array':
      wireType = 2;
      break;
    default:
      wireType = 0;
      break;
  }

  const keyAsVarInt = writeUInt32((fieldNumber << 3) | wireType);

  return keyAsVarInt;
};

const encodeTransferAsset = asset => {
  const result = [];
  if (asset.amount === undefined || asset.amount === null) {
    throw new Error('amount must be defined');
  }
  result.push(generateKey('uint64', 1));
  result.push(writeUInt64(BigInt(asset.amount)));

  if (!Buffer.isBuffer(asset.recipientAddress)) {
    throw new Error('recipientAddress must be Buffer');
  }
  result.push(generateKey('bytes', 2));
  result.push(writeBytes(asset.recipientAddress));

  if (typeof asset.data !== 'string') {
    throw new Error('data must be defined');
  }
  result.push(generateKey('string', 3));
  result.push(writeString(asset.data));

  return Buffer.concat(result);
};

const encodeTransaction = tx => {
  const result = [];

  if (tx.moduleID === undefined || tx.moduleID === null) {
    throw new Error('moduleID must be defined');
  }
  result.push(generateKey('uint32', 1));
  result.push(writeUInt32(tx.moduleID));

  if (tx.assetID === undefined || tx.assetID === null) {
    throw new Error('commandID must be defined');
  }
  result.push(generateKey('uint32', 2));
  result.push(writeUInt32(tx.assetID));

  if (tx.nonce === undefined || tx.nonce === null) {
    throw new Error('nonce must be defined');
  }
  result.push(generateKey('uint64', 3));
  result.push(writeUInt64(BigInt(tx.nonce)));

  if (tx.fee === undefined || tx.fee === null) {
    throw new Error('fee must be defined');
  }
  result.push(generateKey('uint64', 4));
  result.push(writeUInt64(BigInt(tx.fee)));

  if (!Buffer.isBuffer(tx.senderPublicKey)) {
    throw new Error('senderPublicKey must be Buffer');
  }
  result.push(generateKey('bytes', 5));
  result.push(writeBytes(tx.senderPublicKey));

  if (!Buffer.isBuffer(tx.asset)) {
    throw new Error('asset must be Buffer');
  }
  result.push(generateKey('bytes', 6));
  result.push(writeBytes(tx.asset));

  if (!tx.signatures || !tx.signatures.length) {
    return Buffer.concat(result);
  }
  for (const signature of tx.signatures) {
    result.push(generateKey('array', 7));
    result.push(writeBytes(signature));
  }

  return Buffer.concat(result);
};

module.exports = {
  encodeTransferAsset,
  encodeTransaction,
};
