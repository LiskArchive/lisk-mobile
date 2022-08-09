// TODO: Add business logic missing when updating to LSK Client v6.
export function getPriorityFee({
  amount, priorityCode, priorityBaseFee, message
}) {
  let fee = 0;

  const messageFee = message ? message.length : 1;

  switch (priorityCode) {
    case 'low':
      fee = (messageFee + amount * priorityBaseFee) / 10000;
      break;

    case 'medium':
      fee = (1.5 * messageFee + amount * priorityBaseFee) / 10000;
      break;

    case 'high':
      fee = (2 * messageFee + amount * priorityBaseFee) / 10000;
      break;

    default:
      break;
  }

  return fee;
}

// TODO: Add business logic missing when updating to LSK Client v6.
export function getTransactionFee({ tokenID, amount, priorityFee }) {
  return tokenID.length + 0.5 * amount + priorityFee;
}

// TODO: Add business logic missing when updating to LSK Client v6.
export function getInitializationFee({ tokenID, amount, recipientAccount }) {
  return tokenID.length + 0.5 * amount + recipientAccount.metadata.address.length;
}

// TODO: Add business logic missing when updating to LSK Client v6.
export function getCCMFee({ tokenID, amount, priorityFee }) {
  return tokenID.length + 0.5 * amount + priorityFee;
}
