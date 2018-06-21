export default {
  address: /^\d{1,21}[L]$/,
  transactionId: /^[0-9]+$/,
  amount: /^\d+(\.\d{1,8})?$/,
  publicKey: /^[a-f0-9]{64}$/i,
  delegateName: /^[a-z0-9!@$&_.]*$/i,
};
