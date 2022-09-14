import { getBytes } from 'utilities/api/lisk/utils';

const DEFAULT_MIN_FEE_PER_BYTE = 1000;
const DEFAULT_NUMBER_OF_SIGNATURES = 1;
const DEFAULT_BASE_FEE = '0';
const DEFAULT_SIGNATURE_BYTE_SIZE = 64;

const computeTransactionMinFee = (trx, options) => {
  const mockSignatures = new Array(
    options?.numberOfSignatures ?? DEFAULT_NUMBER_OF_SIGNATURES
  ).fill(Buffer.alloc(DEFAULT_SIGNATURE_BYTE_SIZE));
  if (options?.numberOfEmptySignatures) {
    mockSignatures.push(...new Array(options.numberOfEmptySignatures).fill(Buffer.alloc(0)));
  }
  const size = getBytes({
    ...trx,
    signatures: mockSignatures,
  }).length;
  const baseFee =
    options?.baseFees?.find((bf) => bf.moduleID === trx.moduleID && bf.commandID === trx.assetID)
      ?.baseFee ?? DEFAULT_BASE_FEE;
  // eslint-disable-next-line no-undef
  return BigInt(size * (options?.minFeePerByte ?? DEFAULT_MIN_FEE_PER_BYTE)) + BigInt(baseFee);
};

const computeMinFee = (trx, options) => {
  // eslint-disable-next-line no-undef
  trx.fee = BigInt(0);
  let minFee = computeTransactionMinFee(trx, options);

  // eslint-disable-next-line no-undef
  while (minFee > BigInt(trx.fee)) {
    // eslint-disable-next-line no-param-reassign
    trx.fee = minFee;
    minFee = computeTransactionMinFee(trx, options);
  }
  return minFee;
};

export default computeMinFee;
