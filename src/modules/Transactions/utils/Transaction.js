/* eslint-disable max-lines */
/* eslint-disable no-undef */
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

  _schema = null;

  _priorityFee = null;

  _extraCommandFee = null;

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
   * @param {object} params - Transaction initialization parameters
   */
  init({
    pubkey,
    networkStatus,
    auth,
    priorityFee,
    extraCommandFee,
    commandParametersSchemas,
    module = null,
    command = null,
    encodedTransaction = null,
    params = {},
    schema,
  }) {
    this._schema = schema;
    this.isLoading = false;
    this._networkStatus = networkStatus;
    this._auth = auth;
    this._paramsSchemas = commandParametersSchemas;
    this._priorityFee = priorityFee;
    this._extraCommandFee = BigInt(extraCommandFee || 0);
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
      this._paramsSchemas
    );

    if (encodedTransaction) {
      this.transaction.params = Lisk.codec.codec.decode(this._paramsSchema, baseTx.params);
    }

    this.computeFee();
  }

  /**
   * Update transaction object
   * @param {object} params - Transaction parameters
   * @returns void
   */
  update({
    module = this.transaction.module,
    command = this.transaction.command,
    params = {},
    nonce = null,
    ...others
  }) {
    this._computeParamsSchema(module, command);

    const updatedTransaction = {
      ...this.transaction,
      ...others,
      params: {
        ...this.transaction.params,
        ...Lisk.codec.codec.fromJSON(this._paramsSchema, removeUndefinedObjectKeys(params)),
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
   * @param {number} extraFee - Extra fee to consider in the calculation (optional).
   */
  computeFee(extraFee = BigInt(0)) {
    this._validateTransaction();

    const allocateEmptySignaturesWithEmptyBuffer = (signatureCount) =>
      new Array(signatureCount).fill(Buffer.alloc(64));

    const numberOfSignatures = this._auth.numberOfSignatures || 1;

    const options = {
      numberOfSignatures,
      additionalFee: this._extraCommandFee + extraFee,
    };

    const minFee = Lisk.transactions.computeMinFee(
      {
        ...this.transaction,
        params: {
          ...this.transaction.params,
          ...(!this.transaction.params.signatures?.length && {
            signatures: allocateEmptySignaturesWithEmptyBuffer(numberOfSignatures),
          }),
        },
      },
      this._paramsSchema,
      options
    );

    const priorityFee = this._getPriorityFee();

    const fee = minFee + priorityFee;

    this.transaction = { ...this.transaction, fee };
  }

  /**
   * Breakdowns the transaction fee into priorityFee, byteFee and extraCommandFee.
   * @returns {Object} priorityFee, byteFee and extraCommandFee.
   */
  getFeeBreakdown() {
    const totalFee = this.transaction.fee;
    const priorityFee = this._getPriorityFee();
    const extraCommandFee = this._extraCommandFee;
    const byteFee = totalFee - priorityFee - extraCommandFee;

    return { totalFee, priorityFee, byteFee, extraCommandFee };
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

    Lisk.validator.validator.validate(this._schema, {
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
    const transactionSize = Lisk.transactions.getBytes(this.transaction, this._paramsSchema).length;

    const basePriorityFee = this.transaction.priority
      ? this._priorityFee[this.transaction.priority]
      : 0;

    return BigInt(basePriorityFee * transactionSize);
  }
}
