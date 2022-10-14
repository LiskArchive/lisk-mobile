/* eslint-disable no-undef */
/* eslint-disable max-statements */
import * as Lisk from '@liskhq/lisk-client';
import { BASE_TRANSACTION_SCHEMA } from './constants';

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

  _networkStatus = null;

  _auth = null;

  _feeEstimatePerByte = null;

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

  isLoading = true;

  /**
   * Initialize transaction with required network and account information
   * @param {object} param transaction initialization parameters
   */
  init({
    pubkey,
    networkStatus,
    auth,
    feeEstimatePerByte,
    commandParametersSchemas,
    module = null,
    command = null,
    encodedTransaction = null,
    params = {},
  }) {
    this.isLoading = false;
    this._networkStatus = networkStatus;
    this._auth = auth;
    this._feeEstimatePerByte = feeEstimatePerByte;
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
      baseTx = decodeBaseTransaction(Buffer.from(encodedTransaction, 'hex'));

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

    this.computeFee();
  }

  /**
   * Update transaction object
   * @param {object} params transaction parameters
   * @returns void
   */
  update({ params = {}, nonce = null, ...others }) {
    const updatedTransaction = {
      ...this.transaction,
      ...others,
      params: {
        ...this.transaction.params,
        ...Lisk.codec.codec.fromJSON(this._paramsSchema, params),
      },
      nonce: nonce ? BigInt(nonce) : this.transaction.nonce,
    };

    this.transaction = { ...this.transaction, ...updatedTransaction };

    this.computeFee();
  }

  /**
   * Sign transaction for a given privateKey and its options
   * @param {string} privateKey key to sign the transaction
   * @param {object} options transaction signing options {includeSenderSignature}
   * @returns void
   */
  async sign(privateKey, options = { includeSenderSignature: false }) {
    // TODO: Update networkIdentifier to chainID once service endpoint is updated
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
   * Compute transaction fee
   */
  computeFee(extraFee = BigInt(0)) {
    this._validateTransaction();

    const transactionSize = Lisk.transactions.getBytes(this.transaction, this._paramsSchema).length;

    const baseFee = Lisk.transactions.computeMinFee(this.transaction, this._paramsSchema, {
      numberOfSignatures: this._auth.numberOfSignatures || 1,
      numberOfEmptySignatures: 0,
    });

    const priorityFee = this.transaction.priority
      ? this._feeEstimatePerByte[this.transaction.priority]
      : 0;

    const fee = baseFee + BigInt(priorityFee * transactionSize) + extraFee;

    this.transaction = { ...this.transaction, fee };
  }

  /**
   * Decode encoded transaction
   * @param {buffer} encodedTransaction encoded transaction buffer
   * @returns transaction object
   */
  decode(encodedTransaction) {
    const transactionBuffer = Buffer.isBuffer(encodedTransaction)
      ? this.transaction
      : this.encode(this.transaction);

    return decodeTransaction(transactionBuffer, this._paramsSchema);
  }

  /**
   * Encode transaction object
   * @returns encoded transaction hex string
   */
  encode(transaction) {
    this._validateTransaction(transaction);

    return encodeTransaction(transaction, this._paramsSchema);
  }

  /**
   * Convert transaction object to JSON
   * @returns transaction in JSON format
   */
  toJSON() {
    this._validateTransaction(this.transaction);

    return toTransactionJSON(this.transaction, this._paramsSchema);
  }

  /**
   * Convert transaction JSON to object
   * @returns transaction in Object format
   */
  fromJSON() {
    return fromTransactionJSON(this.transaction, this._paramsSchema);
  }

  /**
   * Validate transaction to be compatible with lisk protocol
   */
  _validateTransaction() {
    if (typeof this.transaction !== 'object' || this.transaction === null) {
      throw new Error('Transaction must be an object.');
    }

    const { params, ...rest } = this.transaction;

    Lisk.validator.validator.validate(BASE_TRANSACTION_SCHEMA, {
      ...rest,
      params: Buffer.alloc(0),
    });

    if (Buffer.isBuffer(params)) {
      throw new Error('Transaction parameter is not decoded.');
    }
  }
}
