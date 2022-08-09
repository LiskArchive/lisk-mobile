export function getPriorityFee({
  amount, priorityCode, priorityBaseFee, message
}) {
  let fee = 0;

  const messageFee = message ? message.length : 1;

  switch (priorityCode) {
    case 'low':
      fee = (messageFee + amount * priorityBaseFee) / 1000;
      break;

    case 'medium':
      fee = (2 * messageFee + amount * priorityBaseFee) / 1000;
      break;

    case 'high':
      fee = (3 * messageFee + amount * priorityBaseFee) / 1000;
      break;

    default:
      break;
  }

  return fee;
}

export async function getTransactionFee() {
  return 10;
}
