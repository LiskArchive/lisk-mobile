/* eslint-disable max-lines */
/* eslint-disable max-statements */
import * as Lisk from '@liskhq/lisk-client';

import { removeUndefinedObjectKeys } from 'utilities/helpers';

import {
  getCommandParamsSchema,
  decodeTransaction,
  decodeBaseTransaction,
  encodeTransaction,
  toTransactionJSON,
  fromTransactionJSON,
} from './helpers';

export class Transaction {
  _paramsSchema = null;

  _paramsSchemas = null;

  _networkStatus = null;

  _auth = null;

  _baseSchema = null;

  minFee = BigInt(0);

  extraCommandFee = BigInt(0);

  feeTokenID = null;

  dynamicFeeEstimates = null;

  transaction = {
    module: null,
    command: null,
    priority: null,
    nonce: BigInt(0),
    fee: BigInt(0),
    senderPublicKey: null,
    params: {},
    signatures: [],
  };

  /**
   * Initialize transaction with required network and account information
   * @param {object} params - Transaction initialization parameters
   */
  init({
    pubkey,
    networkStatus,
    auth,
    commandParametersSchemas,
    module = null,
    command = null,
    encodedTransaction = null,
    params = {},
    baseSchema,
  }) {
    this._baseSchema = baseSchema;
    this._networkStatus = networkStatus;
    this._auth = auth;
    this._paramsSchemas = commandParametersSchemas;
    this.transaction.senderPublicKey = Buffer.isBuffer(pubkey)
      ? pubkey
      : Buffer.from(pubkey, 'hex');
    this.transaction.module = module;
    this.transaction.command = command;
    this.transaction.params = params;
    this.transaction.signatures = [];
    this.transaction.nonce = BigInt(auth.nonce || 0);

    let baseTx = null;

    if (encodedTransaction) {
      baseTx = decodeBaseTransaction(Buffer.from(encodedTransaction, 'hex'), this._baseSchema);

      this.transaction.module = baseTx.module;
      this.transaction.command = baseTx.command;
    } else if (!(this.transaction.module && this.transaction.command)) {
      throw new Error('Failed to initialize transaction');
    }

    this._paramsSchema = getCommandParamsSchema(
      this.transaction.module,
      this.transaction.command,
      commandParametersSchemas
    );

    if (encodedTransaction) {
      this.transaction.params = Lisk.codec.codec.decode(this._paramsSchema, baseTx.params);
    }
  }

  /**
   * Update transaction object
   * @param {object} params - Transaction parameters
   * @returns {object} The updated transaction.
   */
  update({
    module = this.transaction.module,
    command = this.transaction.command,
    params = {},
    nonce = null,
    minFee,
    extraCommandFee,
    dynamicFeeEstimates,
    feeTokenID = this.feeTokenID,
    ...others
  }) {
    if (this.module || !command || !this._paramsSchema) {
      return this.transaction;
    }

    this._computeFee({
      minFee,
      extraCommandFee,
      dynamicFeeEstimates,
    });

    this.feeTokenID = feeTokenID;

    this._computeParamsSchema(module, command);

    const updatedTransaction = {
      ...this.transaction,
      ...others,
      module,
      command,
      params: {
        ...this.transaction.params,
        ...Lisk.codec.codec.fromJSON(this._paramsSchema, removeUndefinedObjectKeys(params)),
      },
      nonce: nonce ? BigInt(nonce) : this.transaction.nonce,
    };

    this.transaction = { ...this.transaction, ...updatedTransaction };

    return this.transaction;
  }

  /**
   * Deletes the specified parameters from the transaction object and returns the updated object.
   * @param {string[]} params - An array of parameter keys to remove from the object.
   * @returns {Object} The updated transaction with the specified parameters removed.
   */
  deleteParams(params) {
    params.forEach((param) => {
      delete this.transaction.params[param];
    });

    return this.transaction;
  }

  /**
   * Sign transaction for a given privateKey and its options
   * @param {string} privateKey key to sign the transaction
   * @param {object} options transaction signing options {includeSenderSignature}
   * @returns void
   */
  async sign(privateKey, options = { includeSenderSignature: false }) {
    const chainID = Buffer.from(this._networkStatus.chainID, 'hex');

    const { optionalKeys, mandatoryKeys } = this.transaction.params;

    const isMultiSignature = this._auth.numberOfSignatures > 0;

    const isMultiSignatureRegistration =
      (optionalKeys?.length || mandatoryKeys?.length) && options.includeSenderSignature;

    this._validateTransaction();

    let signedTx;

    if (isMultiSignature || isMultiSignatureRegistration) {
      signedTx = Lisk.transactions.signMultiSignatureTransaction(
        this.transaction,
        chainID,
        privateKey,
        {
          mandatoryKeys: this._auth.mandatoryKeys.map((k) => Buffer.from(k, 'hex')),
          optionalKeys: this._auth.optionalKeys.map((k) => Buffer.from(k, 'hex')),
        },
        this._paramsSchema,
        options.includeSenderSignature
      );
    } else {
      signedTx = Lisk.transactions.signTransaction(
        this.transaction,
        Buffer.from(this._networkStatus.chainID, 'hex'),
        Buffer.from(privateKey, 'hex'),
        this._paramsSchema
      );
    }

    this.transaction = { ...signedTx, params: this.transaction.params };

    return signedTx;
  }

  /**
   * Compute transaction fee.
   * @param {BigInt | undefined} minFee - Calculated minimum fee of the transaction.
   * @param {BigInt | undefined} extraCommandFee - Extra command fee of the transaction.
   * @param {Object | undefined} dynamicFeeEstimates - Dynamic fees estimation of the transaction.
   * @returns {BigInt} Calculated fee.
   */
  _computeFee({
    minFee = this.minFee,
    extraCommandFee = this.extraCommandFee,
    dynamicFeeEstimates = this.dynamicFeeEstimates,
  }) {
    this._validateTransaction();

    this.minFee = BigInt(minFee);
    this.extraCommandFee = BigInt(extraCommandFee);
    this.dynamicFeeEstimates = dynamicFeeEstimates;

    const priorityFee = this._getPriorityFee();
    const fee = priorityFee > this.minFee ? priorityFee : this.minFee;

    this.transaction = { ...this.transaction, fee };

    return fee;
  }

  /**
   * Breakdowns the transaction fee into totalFee, priorityFee, minFee and extraCommandFee.
   * @returns {Object} totalFee, priorityFee, minFee and extraCommandFee.
   */
  getFeesBreakdown() {
    const totalFee = this.transaction.fee;
    const minFee = this.minFee;
    const priorityFee = this._getPriorityFee();
    const extraCommandFee = this.extraCommandFee;

    return { totalFee, minFee, priorityFee, extraCommandFee };
  }

  /**
   * Decode encoded transaction
   * @param {buffer} encodedTransaction - Encoded transaction buffer
   * @returns Transaction object
   */
  decode(encodedTransaction) {
    const transactionBuffer = Buffer.isBuffer(encodedTransaction)
      ? this.transaction
      : this.encode(this.transaction);

    return decodeTransaction(transactionBuffer, this._paramsSchema);
  }

  /**
   * Encode transaction object
   * @returns Encoded transaction hex string
   */
  encode(transaction) {
    this._validateTransaction(transaction);

    return encodeTransaction(transaction, this._paramsSchema, this._baseSchema);
  }

  /**
   * Convert transaction object to JSON
   * @returns transaction in JSON format
   */
  toJSON() {
    this._validateTransaction(this.transaction);

    return toTransactionJSON(this.transaction, this._paramsSchema, this._baseSchema);
  }

  /**
   * Convert transaction JSON to object
   * @returns transaction in Object format
   */
  fromJSON() {
    return fromTransactionJSON(this.transaction, this._paramsSchema, this._baseSchema);
  }

  _computeParamsSchema(module, command) {
    this._paramsSchema = getCommandParamsSchema(module, command, this._paramsSchemas);

    return this._paramsSchema;
  }

  /**
   * Validate transaction to be compatible with Lisk protocol
   */
  _validateTransaction() {
    if (typeof this.transaction !== 'object' || this.transaction === null) {
      throw new Error('Transaction must be an object.');
    }

    const { params, ...rest } = this.transaction;

    Lisk.validator.validator.validate(this._baseSchema, {
      ...rest,
      params: Buffer.alloc(0),
    });

    if (Buffer.isBuffer(params)) {
      throw new Error('Transaction parameter is not decoded.');
    }
  }

  /**
   * Calculates the priority fee based on the base priority fee from the network and the transaction size.
   * @returns {BigInt} Calculated priority fee.
   */
  _getPriorityFee() {
    const priorityFee =
      this.transaction.priority && this.dynamicFeeEstimates
        ? this.dynamicFeeEstimates[this.transaction.priority]
        : 0;

    return BigInt(priorityFee);
  }
}
